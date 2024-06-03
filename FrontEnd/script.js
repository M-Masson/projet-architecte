let projets;
let gallerie=document.getElementById("gallery");
const url = "http://localhost:5678/";
let token = localStorage.getItem("token");
let login = document.getElementById("login");
let modal1 = document.createElement("aside");

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
    login.addEventListener("click", function () {
        window.location.href = "login.html";
    })
}

function worksfilter(categoryId){
    return projets.filter((works) => works.categoryId === categoryId);
}

function seteditmode(){
    let editmode = document.getElementById("editmode");
    editmode.classList.add("editmode");

    let header = document.querySelector("header");
    header.style.margin = "100px 0"
    
    let editmodetxt = document.createElement("p");
    editmodetxt.innerText = "Mode édition";
    editmodetxt.classList.add("editmodetxt");
    let bandeauElement = document.createElement("div");
    bandeauElement.classList.add("bandeau-element");

    
    let editmodeicon = document.createElement("div");
    editmodeicon.classList.add("editmodeicon");

    login.innerText = "logout";
    login.addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    })
    
    let editmodesvg =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15.58" height="15.58">
                        <path fill="#ffffff" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 
                            33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 
                            256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 
                            16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 
                            8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 
                            6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 
                            0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 
                            152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 
                            10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 
                            40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                        />
                        </svg>`;
    editmodeicon.innerHTML = editmodesvg;
    
    editmode.appendChild(bandeauElement);
    bandeauElement.appendChild(editmodetxt);
    bandeauElement.appendChild(editmodeicon);
    
    
    
    let portfolio = document.getElementById("portfolio");
    let mesprojets = document.getElementById("mesprojets");
    let editprojets = document.querySelector(".editprojets");
    
    
    let edit = document.createElement("a");
    let editicon = document.createElement("div");
    let edittxt = document.createElement("p");
    
    
    portfolio.appendChild(editprojets);
    editprojets.appendChild(mesprojets);
    editprojets.appendChild(edit);
    edit.appendChild(editicon);
    edit.appendChild(edittxt);
    edit.classList.add("edit");
    
    editicon.classList.add("editicon");
    
    let editsvg =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15.58" height="15.58">
                        <path fill="#000000" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 
                            33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 
                            256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 
                            16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 
                            8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 
                            6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 
                            0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 
                            152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 
                            10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 
                            40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                        />
                    </svg>`;
    editicon.innerHTML = editsvg;
    
    edittxt.innerText = "modifier";

    edit.addEventListener("click", () =>{
        openmodal();
    });
}

if(token){
    seteditmode()

}else{
   getcategories()
}

function openmodal(){
    
    if (!document.body.contains(modal1)){
        
        modal1.classList.add("modal");
        document.body.appendChild(modal1);
    }
        modal1.innerHTML = "";

        let modalpage = document.createElement("div");
        modalpage.classList.add("modalpage");

        let modalexit = document.createElement("div");
        modalexit.classList.add("modalexit");
        let exitsvg =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
                        <path fill="#000000" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
                        0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 
                        361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 
                        32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`
        modalexit.innerHTML = exitsvg;
        modalexit.classList.add("modalexit");

        let modaltitle = document.createElement("h3");
        modaltitle.innerText = "Galerie photo";
        modaltitle.classList.add("modaltitle");

        let modalgalery = document.createElement("div");
        modalgalery.classList.add("modalgalery");

        let modaladd = document.createElement("div");
        modaladd.classList.add("modaladd");
        

        let addbtn = document.createElement("button");
        addbtn.innerText="Ajouter une photo"
        addbtn.classList.add("addbtn");

        modaladd.appendChild(addbtn);
        modalpage.appendChild(modalexit);
        modalpage.appendChild(modaltitle);
        modalpage.appendChild(modalgalery);
        modalpage.appendChild(modaladd);
        modal1.appendChild(modalpage);

        modalexit.addEventListener("click", () =>{
            closemodal();
        })
        document.addEventListener("click",outsideClick);

        addbtn.addEventListener("click", (event) =>{
            event.stopPropagation();
            ajouterphoto();
        })  
        getmodalprojet();
        modal1.style.display = null;
        modal1.removeAttribute("aria-hidden");
        modal1.setAttribute("aria-modal","true");   
}
function ajouterphoto(){
    let modalpage = modal1.querySelector(".modalpage");
    let modalgalery = modal1.querySelector(".modalgalery");
    modalgalery.setAttribute("id","modalgalery");
    let modaladd = modal1.querySelector(".modaladd");
    let modaltitle = modal1.querySelector(".modaltitle");
            

    modalgalery.innerHTML = "";
    modaladd.innerHTML = "";
    modaltitle.innerText= "Ajout photo";

    let addphoto = document.createElement("div");
    modalgalery.appendChild(addphoto);
    addphoto.classList.add("addphoto");

    let photoimg = document.createElement("div");
    addphoto.appendChild(photoimg);
    photoimg.classList.add("photoimg");

    let photosvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="68.14" height="59.62">
                    <path fill="#b9c5cc" d="M448 80c8.8 0 16 7.2 16 
                    16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 
                    3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 
                    3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 
                    32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 
                    64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                    </svg>`;
    photoimg.innerHTML = photosvg;

    let photobtn = document.createElement("input");
    photobtn.setAttribute("id", "photo-btn");
    photobtn.setAttribute("type", "file");
    photobtn.setAttribute("accept", "image/png, image/jpg")

    let labelPhotoBtn = document.createElement("label");
    labelPhotoBtn.setAttribute("for","photo-btn")
    labelPhotoBtn.innerText = "+ Ajouter photo";
    addphoto.appendChild(labelPhotoBtn);
    addphoto.appendChild(photobtn);
    labelPhotoBtn.classList.add("photobtn");

    photobtn.onchange = () => {
        let chosenImage = document.createElement("img");
        let reader = new FileReader();
        reader.readAsDataURL(photobtn.files[0]);
                    
        reader.onload = () =>{
            addphoto.innerHTML="";
            chosenImage.setAttribute("src", reader.result);
            addphoto.appendChild(photoimg);
            photoimg.innerHTML="";
            photoimg.classList.remove("photoimg");
            photoimg.classList.add("chosen-image");
            photoimg.appendChild(chosenImage);
        }
    }

    let photosubtitle = document.createElement("p")
    photosubtitle.innerText = "jpg, png : 4mo max"
    addphoto.appendChild(photosubtitle);
    photosubtitle.classList.add("photosubtitle");

    let modalaction = document.createElement("div");
    let modalexit = document.querySelector(".modalexit");
    modalaction.appendChild(modalexit);
    modalaction.classList.add("modalaction");
    modalpage.appendChild(modalaction);

    let modalprevious = document.createElement("div");
    modalaction.appendChild(modalprevious);
                
    modalprevious.classList.add("modalprevious");

    let previoussvg =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="21" height="18.01">
                        <path fill="#000000" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 
                        160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 
                        0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 
                        0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                        </svg>`;
    modalprevious.innerHTML = previoussvg;

    modalprevious.addEventListener("click", (event)=>{
        event.stopPropagation();
        openmodal();
    })
                
    let photoform = document.createElement("form");

    let phototitle = document.createElement("label");
    phototitle.setAttribute("for", "title");
    phototitle.innerText = "Titre";

    let titleinput = document.createElement("input");
    titleinput.setAttribute("type", "text");
    titleinput.setAttribute("name", "title");
    titleinput.setAttribute("id", "title");

    modalgalery.appendChild(photoform);
    photoform.appendChild(phototitle);
    photoform.appendChild(titleinput);

    let categoryselect = document.createElement("div");
    modalgalery.appendChild(categoryselect);
    categoryselect.classList.add("categoryselect")

    let titleselect = document.createElement("label");
    titleselect.setAttribute("for", "category-select");
    titleselect.innerText = "Catégorie";
    categoryselect.appendChild(titleselect);

    let photoselect = document.createElement("select");
    photoselect.classList.add("select")
    categoryselect.appendChild(photoselect);

    let option = document.createElement("option");
    photoselect.appendChild(option);
    option.setAttribute("value",""),

    photoselect.setAttribute("name", "category");
    photoselect.setAttribute("id", "category-select");

    let validatebtn = document.createElement("button");
    modaladd.appendChild(validatebtn);
    validatebtn.innerText="Valider";
    validatebtn.classList.add("validatebtn");
    getoption();

    let validCheck1 = false;
    let validCheck2 = false;
    let validCheck3 = false;
    let inputImage = document.getElementById("photo-btn")
    let validation = false;
                

    inputImage.addEventListener("change", ()=>{
        validCheck3 = true;
        formValidation();
                    
    })
    titleinput.addEventListener("keyup", ()=>{
                    
        if(titleinput.value==""){
            validCheck1 = false;
        }else{
            validCheck1 = true;
        }
        formValidation();
    })
    photoselect.addEventListener("change", ()=>{
        let selectElement = document.querySelector("select");
        if(selectElement.value ==""){
            validCheck2 = false;
                        
        }else{
            validCheck2 = true;
        } 
        formValidation();
    })
    function formValidation(){
        if(validCheck1 && validCheck2 && validCheck3){
            
            validatebtn.classList.remove("validatebtn");
            validatebtn.classList.add("validatebtn-valid");
            validation = true;
        }else{
            validation = false;
            validatebtn.classList.add("validatebtn");
            validatebtn.classList.remove("validatebtn-valid");
        }
    }
    validatebtn.addEventListener("click",(event)=>{
        event.preventDefault();
        if(validation){
            let imageFile = photobtn.files[0];
            let title = titleinput.value;
            let category = photoselect.value;

            let formData = new FormData();
            formData.append("image", imageFile);
            formData.append("title", title);
            formData.append("category", category);

            fetch(url+"api/works", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    
                },
                body: formData,
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data.error){
                    console.error("error in response:", data.error);
                }else{
                    getprojet()
                }
                openmodal();
            })
            .catch((error)=>{
                console.error("error", error);
            })
        }
        
    })
                

                
            
            
    function getoption(){
            fetch(url+"api/categories")
            .then(reponse => reponse.json())
            .then(categories => {
                projets=categories;
                insertoption(projets);
            })
            .catch(error=>console.error(error))
        }

        function insertoption(categories){
            for (let i=0; i<categories.length;i++){
                            
                let categoryoption =document.createElement("option");
                categoryoption.innerText = categories[i].name;
                categoryoption.setAttribute("value", categories[i].id);
                photoselect.appendChild(categoryoption);
            }
        }
            

}
 function getmodalprojet(){
        fetch(url+"api/works")
        .then(reponse => reponse.json())
        .then(works => {
            projets=works;
            modalinsertprojects(projets);
        })
        .catch(error=>console.error(error))
} 
function modalinsertprojects(works){
        let modalgalery = modal1.querySelector(".modalgalery");
        modalgalery.innerHTML="";
        works.forEach(work =>{
            let modalelement = document.createElement("div");
            modalelement.classList.add("modalelement");

            let img = document.createElement("img");
            img.src = work.imageUrl;
            img.setAttribute("id", work.id);
            
            
            modalelement.appendChild(img);

            let deletelement = document.createElement("div");
            deletelement.classList.add("deletelement");
                
            let deletsvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="9" height="10.29">
                            <path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 
                            0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 
                            32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 
                            128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 
                            0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 
                            0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0
                            c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                            </svg>`;
            deletelement.innerHTML = deletsvg;
            modalelement.appendChild(deletelement);
            modalgalery.appendChild(modalelement);

            deletelement.addEventListener("click", (event)=>{
                event.preventDefault();
                fetch(url+"api/works/"+img.id, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }).then(reponse =>{
                    if (!reponse.ok){
                        throw new Error("erreur"+reponse.statusText)
                    }else{
                        getprojet()

                    }
                    openmodal();
                })
                .catch(error=>{
                    console.error(error);
                })
            })
        })
       
}
 function closemodal(){
    modal1.style.display = "none";
    modal1.setAttribute("aria-hidden","true");
    modal1.removeAttribute("aria-modal");
    document.removeEventListener("click", outsideClick);
    
}
function outsideClick(event){
    if(!event.target.closest(".edit") && !event.target.closest(".modalpage")){
        closemodal();
    }
}

getprojet()
