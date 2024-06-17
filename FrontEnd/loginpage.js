const email = document.getElementById("email");
const password = document.getElementById("password");
const loginForm = document.querySelector(".loginform");
const emailError = document.querySelector(".emailerror");
const error = document.querySelector(".passworderror");
const url = "http://localhost:5678/";


function validateForm(){
    let emailValue = email.value;
    let passwordValue = password.value;
    let check = false;
    let check2 = false;

    if(emailValue === ""){
        emailError.innerText = "E-mail manquant !"
        check = false;
    } else{
       check = true;
    }

   if(passwordValue === ""){
        error.innerText = "Mot de passe manquant !"
        check2 = false;
    } else{
        check2 = true;
    }

    if (check && check2){
        
        let data = {
            "email": emailValue,
            "password": passwordValue
        };
        
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
                error.innerText = "E-mail ou mot de pass incorrect !"
            }
        })
        .catch(error=>console.error(error))
    }
}

loginForm.addEventListener("submit", e =>{
    e.preventDefault();
    validateForm(); 
})
