let projets;
let gallerie=document.getElementById("gallery");
const url = "http://localhost:5678/";
function getprojet(){
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
let categorymenu = document.getElementById("categorymenu");
let btntous = document.createElement("btntous");
btntous.innerText = "Tous";
let btnobjets = document.createElement("btnobjets");
btnobjets.innerText = "Objets";
let btnappartements = document.createElement("btnappartements");
btnappartements.innerText = "appartements";
let btnhotel = document.createElement("btnhotel");
btnhotel.innerText = "Hotels & restaurants";
categorymenu.appendChild(btntous);
categorymenu.appendChild(btnobjets);
categorymenu.appendChild(btnappartements);
categorymenu.appendChild(btnhotel);


function worksfilter(categoryId){
    return projets.filter((works) => works.categoryId === categoryId);
}


btnobjets.addEventListener("click", function (){
    const objetsfiltre = worksfilter(1);
    insertprojet(objetsfiltre);
    btnobjets.style.backgroundColor="#1D6154";
    btnobjets.style.color="white";
    btnappartements.style.backgroundColor="";
    btnappartements.style.color="";
    btnhotel.style.backgroundColor="";
    btnhotel.style.color="";
    btntous.style.backgroundColor="";
    btntous.style.color="";
    
   
})
btnappartements.addEventListener("click", function (){
    const appartementsfiltre = worksfilter(2);
    insertprojet(appartementsfiltre);
    btnobjets.style.backgroundColor="";
    btnobjets.style.color="";
    btnappartements.style.backgroundColor="#1D6154";
    btnappartements.style.color="white";
    btnhotel.style.backgroundColor="";
    btnhotel.style.color="";
    btntous.style.backgroundColor="";
    btntous.style.color="";
})
btnhotel.addEventListener("click", function (){
    const hotelfiltre = worksfilter(3);
    insertprojet(hotelfiltre);
    btnobjets.style.backgroundColor="";
    btnobjets.style.color="";
    btnappartements.style.backgroundColor="";
    btnappartements.style.color="";
    btnhotel.style.backgroundColor="#1D6154";
    btnhotel.style.color="white";
    btntous.style.backgroundColor="";
    btntous.style.color="";
})
btntous.addEventListener("click", function (){
    insertprojet(projets);
    btnobjets.style.backgroundColor="";
    btnobjets.style.color="";
    btnappartements.style.backgroundColor="";
    btnappartements.style.color="";
    btnhotel.style.backgroundColor="";
    btnhotel.style.color="";
    btntous.style.backgroundColor="#1D6154";
    btntous.style.color="white";
})


getprojet()
