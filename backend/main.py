# -*- coding: utf-8 -*-

"""
Author: Safal BK
Date: 2023-07-22
Email: safal.bk@bolgatty.nl

Description:  The Front End App
"""

import logging
import sys
import requests
import secrets
import json
import string
from database_controller import *
import socket
from flask import Flask, jsonify, request, redirect, session, url_for, render_template
from flask_cors import CORS  # Import the CORS extension
from dotenv import load_dotenv


load_dotenv()
print(os.getenv('SERVER_IP'))

myHostName = socket.gethostname()

myIP = socket.gethostbyname(myHostName)

print("IP address of the localhost is {}".format(myIP))

# myIP="127.0.0.1"
server_ip = os.getenv('SERVER_IP')
production = False
if production:
	myIP = server_ip
	uc_server = '20.204.25.49'
	web_socket_ip = server_ip
else:
	myIP = '127.0.0.1'
	uc_server = '127.0.0.1'
	web_socket_ip = '127.0.0.1'



sso_server = f"http://{os.getenv('SS0_SERVER_PORT')}"
sso_login = sso_server+"/oauth/authorize/"
sso_callback = "auth/callback"


def generate_random_string(length):
	alphabet = string.ascii_letters + string.digits
	return "".join(secrets.choice(alphabet) for _ in range(length))


# Creates a log format
FORMAT = "[ %(levelname)s] %(asctime)s %(filename)s::%(funcName)s() Line:%(lineno)s -> %(message)s"
formatter = logging.Formatter(FORMAT)

# For Console
stdouthandler = logging.StreamHandler(sys.stdout)
stdouthandler.setFormatter(formatter)

logger = logging.getLogger()
logger.addHandler(stdouthandler)
logger.setLevel(logging.INFO)

db_manager = DatabaseManager()


app = Flask(__name__)

app.secret_key = "your_secret_key"

CORS(app)  # Apply CORS to the app
# CORS(app, origins=['http://127.0.0.1:8000'])


@app.route("/")
def index():

	if 'access_token' in session:
		headers = {
		"Authorization": f"Bearer {session.get('access_token')}",
		"Content-Type": "application/json",
		}
		response = requests.get(sso_server+"/api/user", headers=headers)
		if response.status_code == 200:
			return redirect("/home")
		else:
			return redirect("/login")
	else:
		return redirect("/login")


# @app.route("/test2")
# def test2():
# 	if 'access_token' in session:
# 		print("==============================================================",
# 			  session.get('access_token'))
# 	return render_template("test.html" )


@app.route("/logout")
def logout():
	access_token = session["access_token"]
	headers = {
		"Authorization": f"Bearer {access_token}",
		"Content-Type": "application/json",
	}
	response = requests.get(sso_server+"/api/logmeout", headers)
	session["access_token"] = ""
	return redirect("/login?prompt=login")


@app.route("/login")
def login():
	protocol_and_host = request.url_root

	random_string = generate_random_string(40)
	print("*****************************")
	print(random_string)
	# Replace with your state generation logic
	session["state"] = random_string
	prompt_value = request.args.get("prompt") or ""
	print("*********************************")
	print(prompt_value)
	params = {
		"client_id": "9a136645-4b68-4ee8-bff6-5e150f5f71e4",
		"redirect_uri": protocol_and_host + sso_callback,
		"response_type": "code",
		"scope": "",
		"state": session["state"],
		"prompt": prompt_value,
	}

	redirect_url = sso_login + "?" + \
		"&".join([f"{k}={v}" for k, v in params.items()])
	# exit()
	return redirect(redirect_url)


@app.route("/auth/callback")
def callback():
	protocol_and_host = request.url_root
	state = session.pop("state", None)
	received_state = request.args.get("state")

	if state != received_state:
		return "Invalid state. Possible CSRF attack."

	code = request.args.get("code")
	response = requests.post(
		sso_server+"/oauth/token",
		data={
			"grant_type": "authorization_code",
			"client_id": "9a136645-4b68-4ee8-bff6-5e150f5f71e4",
			"client_secret": "IxfoyAp2Xflhdg2klsa1STUPfmw3SbTz9dzFi82u",
			"redirect_uri": protocol_and_host + sso_callback,
			"code": code,
		},
	)
	session.update(response.json())  # Update session with received tokens/data

	return redirect("/connect")


@app.route("/connect", methods=["GET", "POST"])
def connect():
	if request.method == "POST":
		data = request.get_json()
		session["access_token"] = data["access_token"]
	access_token = session.get("access_token")
	print("==================================================================")
	print(access_token)
	session["access_token"] = access_token
	if not access_token:
		return "Authentication failed"

	headers = {
		"Authorization": f"Bearer {access_token}",
		"Content-Type": "application/json",
	}
	response = requests.get(sso_server+"/api/user", headers=headers)
	user_data = response.json()

	if response.status_code == 200:
		session["access_token"] = access_token
		session["current_user"] = user_data["username"]

		return redirect(url_for("choose_assessment_type"))
	else:
		return redirect("/login")


@app.route("/home")
def choose_assessment_type():
	if 'access_token' in session:
		current_user = session.get("current_user")
		try:
			current_sessions = db_manager.get_all_registered_sessions()
			if current_sessions==None:
				current_sessions=[]
		except:
			pass

		return render_template(
			"index.html", current_user=current_user, current_sessions=current_sessions, myip=myIP
		)
	else:
		return redirect("/login")


@app.route("/allproblems")
def allproblems():

	if session["access_token"] != "":
		current_user = session.get("current_user")
		try:
			problems = db_manager.get_all_problemstatement()

		except:
			pass

		return render_template(
			"problems_list.html", current_user=current_user, problems=problems, myip=myIP
		)
	else:
		return redirect("/login")


@app.route("/create-problem-statement", methods=["GET", "POST"])
def create_problem_statement():

	if session["access_token"] != "":
		current_user = session.get("current_user")
		if request.method == "POST":
			problem = request.form.get("problemStatement")
			print("==================================", problem)
			try:
				db_manager.create_problemstatement(problem)

			except:
				pass
			return redirect("/allproblems")

		return render_template(
			"create_problem_statement.html", current_user=current_user, myip=myIP
		)
	else:
		return redirect("/login")


@app.route("/view-problem-statement/<string:id>", methods=["GET", "POST"])
def view_problem_statement(id):

	if session["access_token"] != "":
		current_user = session.get("current_user")
		try:
			problem = db_manager.get_problemstatement_by_id(id)

		except:
			pass

		return render_template(
			"view_problem_statement.html", current_user=current_user, problem=problem, myip=myIP
		)
	else:
		return redirect("/login")


@app.route("/update-problem-statement/<string:id>", methods=["GET", "POST"])
def update_problem_statement(id):

	if session["access_token"] != "":
		try:
			problem = db_manager.get_problemstatement_by_id(id)

		except:
			pass
		current_user = session.get("current_user")
		return render_template(
			"update_problem_statement.html", current_user=current_user, problem=problem, id=id, myip=myIP
		)

	else:
		return redirect("/login")


@app.route("/save-problem-statement/<string:id>", methods=["GET", "POST"])
def save_problem_statement(id):
	if session["access_token"] != "":
		if request.method == "POST":
			problem = request.form.get("problemStatement")
			print("==================================", problem)
			db_manager.update_problemstatement(id, problem)
			return redirect("/allproblems")

	else:
		return redirect("/login")


@app.route("/delete-problem/<string:session_id>")
def delete_problem(session_id):

	if session["access_token"] != "":
		try:
			db_manager.delete_problemstatement(session_id)

		except:
			pass

		return redirect("/allproblems")
	else:
		return redirect("/login")


@app.route("/new-session")
def new_session():

	id = generate_random_string(10)
	try:
		db_manager.create_session(id, "", "")

	except:
		pass
	session[id]="false"

	return redirect("/skilleditor/" + id)

@app.route("/skilleditor/<string:session_id>")
def skilleditor(session_id):
	current_user = session.get("current_user")
	code = ""
	note = ""
	readonly=""
	try:
		if db_manager.get_session_by_id(session_id)==None:
			return render_template("not_valid.html",  myip=myIP)

		code = db_manager.get_session_by_id(session_id)[1]
		print(code)
		notes = db_manager.get_session_by_id(session_id)[2]
		token = db_manager.get_session_by_id(session_id)[9]
		if token!="":
			session[session_id]="false"
			readonly ="false"
			db_manager.remove_token(session_id)
		else:
			session[session_id]="true"
			readonly ="true"

	except:
		pass

	return render_template("code_editor.html", session_id=session_id, uc_ip=uc_server, 
						web_socket_ip=web_socket_ip, code=code, notes=notes,readonly=readonly ,myip=myIP)


@app.route("/delete-session/<string:session_id>")
def delete_session(session_id):

	if session["access_token"] != "":
		try:
			db_manager.delete_sessions(session_id)

		except:
			pass

		return redirect("/home")
	else:
		return redirect("/login")






@app.route("/create", methods=["GET", "POST"])
def create():
	if request.method == "POST":
		data = request.get_json()
		notes = data['notes']
		code = data['code']
		session = data['session']
		try:
			code = db_manager.create_session(session, code, notes)

		except:
			pass

		return jsonify({
			"message": "done",
		})
	else:
		return jsonify({
			"message": "failesd",
		})


@app.route("/create_new_editor", methods=["GET", "POST"])
def new_editor():
	if request.method == "POST":
		response = []
		data = request.get_json()
		candidates = data['candidates']
		for can in candidates:

			name = can['name']
			email = can['email']
			title = can['title']
			session_id = generate_random_string(10)
			token = generate_random_string(8)
			jd_id = can['jd_id']
			try:
				code = db_manager.create_session_with_title(
					session_id, title, name, email, jd_id, "", "",token)
			except:
				pass
			response.append({
				"name": name,
				"email": email,
				"title": title,
				"jd_id": jd_id,
							"url": f"http://{myIP}:8070/skilleditor/"+session_id,
							"message": "done",
							})
		return jsonify({"data": response})
	else:
		return jsonify({
			"message": "failed",
		})


@app.route("/session_form")
def session_form():

	current_user = session.get("current_user")

	# return render_template("code_editor.html", session_id=session_id, uc_ip=uc_server, web_socket_ip=web_socket_ip,code=code,notes=notes,myip=myIP)

	return render_template("new_session_form.html", myip=myIP, current_user=current_user)


@app.route('/api/aa', methods=['POST'])
def create_color_test():
	data = request.get_json()
	notes = data['notes']
	code = data['code']
	session = data['session']
	print(code, session, notes)
	try:
		code = db_manager.update_session(str(session), str(code), str(notes))
		pass
	except:
		pass

	return jsonify({
		"users": "results",
		"code": code
	})


# ======================================================== API STARTED =============================================================





@app.route('/api/allsession', methods=['POST'])
def apigetallsession():
	data = request.get_json()
	notes = data['user']
	response=[]
	try:
		sessions = db_manager.get_all_registered_sessions()
		for session in sessions:
			response.append({
				"id":session[0],
				"content":session[1],
				"problemStatement":session[2],
				"title":session[3],
				"name":session[4],
				"email":session[5],
				"jd_id":session[6],
				"user":session[7],
				"marktimestamp":session[8],
				"token":session[9]
			})
			
		return jsonify({
		"suceess":True,
		"message": "data  fetched",
		"data": response
	})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})


@app.route('/api/instantsession', methods=['POST'])
def apiinstantsession():
	data = request.get_json()
	notes = data['user']
	id = generate_random_string(10)

	try:
		db_manager.create_session(id, "", "")
		return jsonify({
		"suceess":True,
		"id":id,
		"message": "session  created"
	})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})

@app.route('/api/newsession', methods=['POST'])
def apinewsession():
	response = []
	data = request.get_json()
	candidates = data['candidates']
	for can in candidates:

		name = can['name']
		email = can['email']
		title = can['title']
		session_id = generate_random_string(10)
		token = generate_random_string(8)
		jd_id = can['jd_id']
		try:
			code = db_manager.create_session_with_title(
				session_id, title, name, email, jd_id, "", "",token)
			response.append({
			"name": name,
			"email": email,
			"title": title,
			"jd_id": jd_id,
						"url": f"http://{myIP}:8070/codeeditor/"+session_id,
						"message": "done",
						"suceess":True,

						})
		except:
			response.append({
			"name": name,
			"email": email,
			"title": title,
			"jd_id": jd_id,
			"url": "",
			"message": "failed",
			"suceess":False,

			})
		
	return jsonify({
			"data":response
	
	})

@app.route('/api/getsession', methods=['POST'])
def getsession():
	data = request.get_json()
	id = data['id']
	code = ""
	note = ""
	readonly=""
	try:
		if db_manager.get_session_by_id((id))==None:
			return jsonify({
			"suceess":False,
			"message": "not valid"
			})
		code = db_manager.get_session_by_id(id)[1]
		notes = db_manager.get_session_by_id(id)[2]
		token = db_manager.get_session_by_id(id)[9]
		return jsonify({
			"suceess":True,
			"code":code,
			"notes":notes,
			"token":token,
			})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})
@app.route("/api/savesession", methods=["GET", "POST"])
def savesession():

	if request.method == "POST":
		data = request.get_json()
		notes = data['notes']
		code = data['code']
		language = data['language']

		print(json.dumps({
			"code":code,
			"language":language
		}))

		id = data['id']
		try:
			db_manager.update_session(id, json.dumps({
			"code":code,
			"language":language
		}), notes)

		except:
			return jsonify({
			"suceess":False,
			"message": "database updation failed"

		})

		return jsonify({
			"suceess":True,
			"users": "results",
			"code": code
		})
	else:
		return jsonify({
			"suceess":False,
			"message": "database updation failed"

		})
@app.route('/api/deletesession', methods=['POST'])
def apideletesession():
	data = request.get_json()
	notes = data['user']
	id = data['id']
	try:
		db_manager.delete_sessions(id)

		return jsonify({
		"suceess":True,
		"message": "session  deleted"
	})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})


@app.route('/api/allproblems', methods=['POST'])
def apiallproblems():
	data = request.get_json()
	notes = data['user']
	payload=[]
	try:
		problems = db_manager.get_all_problemstatement()
		
		for problem in problems:
			payload.append({
				"id":problem[0],
				"content":problem[1],
			})
			
			
		return jsonify({
		"users": "results",
		"data": payload
	})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})

@app.route('/api/newproblem', methods=['POST'])
def apinewproblem():
	data = request.get_json()
	notes = data['user']
	problem = data['problem']

	try:
		db_manager.create_problemstatement(problem)
		return jsonify({
		"suceess":True,
		"message": "data updated"
	})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})
@app.route('/api/viewproblem', methods=['POST'])
def apiviewproblem():
	data = request.get_json()
	notes = data['user']
	id = data['id']

	try:
		problem = db_manager.get_problemstatement_by_id(id)
		print(problem[0])
		return jsonify({
				"id":problem[0],
				"content":problem[1],
			})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})
@app.route('/api/updateproblem', methods=['POST'])
def apiupdateproblem():
	data = request.get_json()
	notes = data['user']
	id = data['id']
	problem = data['problem']
	try:
		db_manager.update_problemstatement(id, problem)
		return jsonify({
		"suceess":True,
		"message": "data updated"
	})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})

@app.route('/api/delproblem', methods=['POST'])
def apidelproblem():
	data = request.get_json()
	notes = data['user']
	id = data['id']
	try:
		db_manager.delete_problemstatement(id)
		return jsonify({
		"suceess":True,
		"message": "problem  deleted"
	})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})



@app.route('/api/istokenexpired', methods=['POST'])
def istokenexpired():
	data = request.get_json()
	id = data['id']
	try:
		if db_manager.get_session_by_id((id))==None:
			return jsonify({
			"suceess":False,
			"message": "not valid"
			})
	
		token = db_manager.get_session_by_id(id)[9]
		if(token=='' or token==  None):
			return jsonify({
				"suceess":True,
				"isexpired":True,
				"token":token,
				})
		else:
			return jsonify({
				"suceess":True,
				"isexpired":False,
				"token":token,
				})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})

@app.route('/api/deletetoken', methods=['POST'])
def deletetoken():
	data = request.get_json()
	id = data['id']
	code = ""
	note = ""
	readonly=""
	try:
		if db_manager.get_session_by_id(id)==None:
			return jsonify({
			"suceess":False,
			"message": "not valid"
			})
	
		db_manager.remove_token(id)
		return jsonify({
				"suceess":True,
				})
	except:
		return jsonify({
		"suceess":False,
		"message": "database fetching failed"
	})
@app.errorhandler(404)
def page_not_found(error):
	return redirect('/home')


if __name__ == "__main__":
	app.run(host="0.0.0.0", port=8070, debug=True)
