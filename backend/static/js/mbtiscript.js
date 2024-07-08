let flag = false;
document.getElementById("list").style.display="none";
function showhide(){
  if (flag){
    document.getElementById("list").style.display="none";
    document.getElementById("buttonshow").innerText="Show All Personality Types";
    
    flag = false;
  }
  else{
    document.getElementById("list").style.display="block";
    document.getElementById("buttonshow").innerText="Hide";
    flag = true;
  }
}