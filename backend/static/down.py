import os
import requests

print(os.getcwd())
os.chdir("frontend/static")
print(os.getcwd())

while True:
    url = input("Enter URL (or type 'exit' to stop): ")
    
    if url.lower() == 'exit':
        break

    # Fetch the content from the URL
    response = requests.get(url)

    if response.status_code == 200:
        # Extract the filename from the URL
        filename = url.split("/")[-1]

        # Ask the user for the directory to save the file
        save_directory = input("Enter the directory to save the file (press Enter for current script directory): ").strip()

        if not save_directory:
            # If the user presses Enter, use the script's directory
            save_directory = os.getcwd()

        # Ensure that the specified directory exists; if not, create it
        if not os.path.exists(save_directory):
            os.makedirs(save_directory)

        # Save the content to a file in the specified directory
        file_path = os.path.join(save_directory, filename)
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(response.text)
        print("\n\n\n")
        # Print HTML link tag
        if filename.endswith(".css"):
            file_path=file_path.replace("\\", "/")
            inside_href = "{"+f"{{url_for('static', filename='{file_path}')}}"+"}"
            print(f'<link href="{inside_href}" rel="stylesheet" type="text/css" />')
        if filename.endswith(".js"):
            file_path=file_path.replace("\\", "/")
            inside_href = "{"+f"{{url_for('static', filename='{file_path}')}}"+"}"
            print(f'<script src="{inside_href}" ></script>')
        print("\n\n\n")
        # print(f"File '{filename}' has been saved in the specified directory.")
    else:
        print(f"Failed to fetch content. Status code: {response.status_code}")
