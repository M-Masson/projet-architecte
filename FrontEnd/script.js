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


getprojet()
