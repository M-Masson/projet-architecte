let projets;
let gallerie=document.getElementById("gallery");
const url = "http://localhost:5678/";
function getprojet(){
    console.log(localStorage.getItem("token"));
    fetch(url+"api/works")
    .then(reponse => reponse.json())
    .then(works => {
        projets=works;
        insertprojet(projets);
    })
    .catch(error=>console.error(error))
}
function insertprojet(works){
    gallerie.innerHTML="";
    for (let i=0; i<works.length;i++){
        let figure=document.createElement("figure");
        figure.setAttribute("categorie", works[i].categoryId)
        let img = document.createElement("img");
        img.src=works[i].imageUrl;
        img.alt=works[i].title;
        let figcaption=document.createElement("figcaption");
        figcaption.innerText=works[i].title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallerie.appendChild(figure)
    }
}

function getcategories(){
    fetch(url+"api/categories")
    .then(reponse => reponse.json())
    .then(categories => {
        projets=categories;
        insertcategory(projets);
    })
    .catch(error=>console.error(error))
}

function insertcategory(categories){
   let categorymenu = document.getElementById("categorymenu");
    let btntous = document.createElement("btntous");
    btntous.innerText = "Tous";
    categorymenu.appendChild(btntous);
    btntous.classList.add("btntousdefault");

    for (let i=0; i<categories.length;i++){
        let btn=document.createElement("button");
        btn.innerText = categories[i].name;
        btn.setAttribute("categorie", categories[i].id);
        categorymenu.appendChild(btn);
        
    }
    const btnobjets = document.querySelector('button[categorie="1"]');
    const btnappartements = document.querySelector('button[categorie="2"]');
    const btnhotel = document.querySelector('button[categorie="3"]');

    console.log(btnobjets);

    

    
    if(btnobjets){
        btnobjets.addEventListener("click", function (){
            const objetsfiltre = worksfilter(1);
            insertprojet(objetsfiltre);
            btnobjets.style.backgroundColor="#1D6154";
            btnobjets.style.color="white";
            btnappartements.style.backgroundColor="";
            btnappartements.style.color="";
            btnhotel.style.backgroundColor="";
            btnhotel.style.color="";
            btntous.classList.remove("btntousdefault")
        
        })
    }
    if (btnappartements){
        btnappartements.addEventListener("click", function (){
            const appartementsfiltre = worksfilter(2);
            insertprojet(appartementsfiltre);
            btnobjets.style.backgroundColor="";
            btnobjets.style.color="";
            btnappartements.style.backgroundColor="#1D6154";
            btnappartements.style.color="white";
            btnhotel.style.backgroundColor="";
            btnhotel.style.color="";
            btntous.classList.remove("btntousdefault")
        })
    }
    if(btnhotel){
        btnhotel.addEventListener("click", function (){
            const hotelfiltre = worksfilter(3);
            insertprojet(hotelfiltre);
            btnobjets.style.backgroundColor="";
            btnobjets.style.color="";
            btnappartements.style.backgroundColor="";
            btnappartements.style.color="";
            btnhotel.style.backgroundColor="#1D6154";
            btnhotel.style.color="white";
            btntous.classList.remove("btntousdefault")
        })
    }
    btntous.addEventListener("click", function (){
        insertprojet(projets);
        btnobjets.style.backgroundColor="";
        btnobjets.style.color="";
        btnappartements.style.backgroundColor="";
        btnappartements.style.color="";
        btnhotel.style.backgroundColor="";
        btnhotel.style.color="";
        btntous.classList.add("btntousdefault")
    })
}


function worksfilter(categoryId){
    return projets.filter((works) => works.categoryId === categoryId);
}










getcategories()
getprojet()