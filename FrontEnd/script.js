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
    console.log(worksfilter(1));
    const objetsfiltre = worksfilter(1);
    insertprojet(objetsfiltre);
   
})
btnappartements.addEventListener("click", function (){
    console.log(worksfilter(2));
    const appartementsfiltre = worksfilter(2);
    insertprojet(appartementsfiltre);
})
btnhotel.addEventListener("click", function (){
    console.log(worksfilter(3));
    const hotelfiltre = worksfilter(3);
    insertprojet(hotelfiltre);
})
btntous.addEventListener("click", function (){
    insertprojet(projets);
})


getprojet()
