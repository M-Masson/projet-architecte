const email = document.getElementById("email");
const password = document.getElementById("password");
const loginform = document.querySelector(".loginform");
const emailerror = document.querySelector(".emailerror");
const error = document.querySelector(".passworderror");
const url = "http://localhost:5678/";


function validateform(){
    let emailvalue = email.value;
    let passwordvalue = password.value;
    let check = false;
    let check2 = false;

    if(emailvalue === ""){
        emailerror.innerText = "E-mail manquant !"
        check = false;
    } else{
       error.innerText = "Mot de passe ou E-mail incorrect !"
       check = true;
    }

   if(passwordvalue === ""){
        error.innerText = "Mot de passe manquant !"
        check2 = false;
    } else{
        error.innerText = "Mot de pass ou E-mail incorrect !"
        check2 = true;
    }

    if (check && check2){
        
        let data = {
            "email": emailvalue,
            "password": passwordvalue
        };
        console.log(data)
        fetch(url +"api/users/login" , {
            method: "POST", 
            headers: { "Content-Type": "application/json", }, 
            body: JSON.stringify(data)
        })
        .then(reponse => reponse.json())
        .then(reponse => {
            if(reponse.token){
                localStorage.setItem("token",reponse.token)
                window.location.href = "index.html";
            }else{
                passworderror.innerText = "Mot de pass incorrect !"
            }
        })
        .catch(error=>console.error(error))
    }
}

loginform.addEventListener("submit", e =>{
    e.preventDefault();
    validateform(); 
})
