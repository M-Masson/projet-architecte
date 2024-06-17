let projets;
let gallerie=document.getElementById("gallery");
const url = "http://localhost:5678/";
let token = localStorage.getItem("token");
let login = document.getElementById("login");
let modal1 = document.createElement("aside");

const getProjet = ()=>{
    fetch(url+"api/works")
    .then(reponse => reponse.json())
    .then(works => {
        projets=works;
        insertProjet(projets);
    })
    .catch(error=>console.error(error))
}
const insertProjet = (works)=>{
    gallerie.innerHTML="";
    for (let i=0; i<works.length;i++){
        let figure=document.createElement("figure");
        figure.setAttribute("categorie", works[i].categoryId)
        let img = document.createElement("img");
        img.src=works[i].imageUrl;
        img.alt=works[i].title;
        let figCaption=document.createElement("figCaption");
        figCaption.innerText=works[i].title;
        figure.appendChild(img);
        figure.appendChild(figCaption);
        gallerie.appendChild(figure)
    }
}
const getCategories = ()=>{
    fetch(url+"api/categories")
    .then(reponse => reponse.json())
    .then(categories => {
        projets=categories;
        insertCategory(projets);
    })
    .catch(error=>console.error(error))
}

 const insertCategory = (categories) =>{
    let categoryMenu = document.getElementById("categorymenu");
    let btnTous = document.createElement("btnTous");
    btnTous.innerText = "Tous";
    categoryMenu.appendChild(btnTous);
    btnTous.classList.add("btn-tous-default");

    for (let i=0; i<categories.length;i++){
        let btn=document.createElement("button");
        btn.innerText = categories[i].name;
        btn.setAttribute("categorie", categories[i].id);
        categoryMenu.appendChild(btn);
        
    }
    const btnObjets = document.querySelector('button[categorie="1"]');
    const btnAppartements = document.querySelector('button[categorie="2"]');
    const btnHotel = document.querySelector('button[categorie="3"]');

    if(btnObjets){
        btnObjets.addEventListener("click", ()=>{
            const objetsFiltre = worksFilter(1);
            insertProjet(objetsFiltre);
            btnObjets.style.backgroundColor="#1D6154";
            btnObjets.style.color="white";
            btnAppartements.style.backgroundColor="";
            btnAppartements.style.color="";
            btnHotel.style.backgroundColor="";
            btnHotel.style.color="";
            btnTous.classList.remove("btntousdefault")
        
        })
    }
    if (btnAppartements){
        btnAppartements.addEventListener("click",  ()=>{
            const appartementsfiltre = worksFilter(2);
            insertProjet(appartementsfiltre);
            btnObjets.style.backgroundColor="";
            btnObjets.style.color="";
            btnAppartements.style.backgroundColor="#1D6154";
            btnAppartements.style.color="white";
            btnHotel.style.backgroundColor="";
            btnHotel.style.color="";
            btnTous.classList.remove("btntousdefault")
        })
    }
    if(btnHotel){
        btnHotel.addEventListener("click", ()=>{
            const hotelfiltre = worksFilter(3);
            insertProjet(hotelfiltre);
            btnObjets.style.backgroundColor="";
            btnObjets.style.color="";
            btnAppartements.style.backgroundColor="";
            btnAppartements.style.color="";
            btnHotel.style.backgroundColor="#1D6154";
            btnHotel.style.color="white";
            btnTous.classList.remove("btntousdefault")
        })
    }
    btnTous.addEventListener("click", ()=>{
        insertProjet(projets);
        btnObjets.style.backgroundColor="";
        btnObjets.style.color="";
        btnAppartements.style.backgroundColor="";
        btnAppartements.style.color="";
        btnHotel.style.backgroundColor="";
        btnHotel.style.color="";
        btnTous.classList.add("btntousdefault")
    })
    login.addEventListener("click", ()=> {
        window.location.href = "login.html";
    })
}

const worksFilter = (categoryId) =>{
    return projets.filter((works) => works.categoryId === categoryId);
}

const setEditMode = () =>{
    let editMode = document.getElementById("editmode");
    editMode.classList.add("editmode");

    let header = document.querySelector("header");
    header.style.margin = "100px 0"
    
    let editModeTxt = document.createElement("p");
    editModeTxt.innerText = "Mode édition";
    editModeTxt.classList.add("editmodetxt");
    let bandeauElement = document.createElement("div");
    bandeauElement.classList.add("bandeau-element");

    
    let editModeIcon = document.createElement("div");
    editModeIcon.classList.add("editmodeicon");

    login.innerText = "logout";
    login.addEventListener("click", ()=> {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    })
    
    let editModeSvg =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15.58" height="15.58">
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
    editModeIcon.innerHTML = editModeSvg;
    
    editMode.appendChild(bandeauElement);
    bandeauElement.appendChild(editModeTxt);
    bandeauElement.appendChild(editModeIcon);
    
    
    
    let portfolio = document.getElementById("portfolio");
    let mesProjets = document.getElementById("mesprojets");
    let editProjets = document.querySelector(".editprojets");
    
    
    let edit = document.createElement("a");
    let editIcon = document.createElement("div");
    let editTxt = document.createElement("p");
    
    
    portfolio.appendChild(editProjets);
    editProjets.appendChild(mesProjets);
    editProjets.appendChild(edit);
    edit.appendChild(editIcon);
    edit.appendChild(editTxt);
    edit.classList.add("edit");
    
    editIcon.classList.add("editicon");
    
    let editSvg =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15.58" height="15.58">
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
    editIcon.innerHTML = editSvg;
    
    editTxt.innerText = "modifier";

    edit.addEventListener("click", () =>{
        openModal();
    });
}

if(token){
    setEditMode()

}else{
   getCategories()
}

const openModal = () =>{
    
    if (!document.body.contains(modal1)){
        
        modal1.classList.add("modal");
        document.body.appendChild(modal1);
    }
        modal1.innerHTML = "";

        let modalPage = document.createElement("div");
        modalPage.classList.add("modalpage");

        let modalExit = document.createElement("div");
        modalExit.classList.add("modalexit");
        let exitSvg =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
                        <path fill="#000000" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
                        0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 
                        361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 
                        32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`
        modalExit.innerHTML = exitSvg;
        

        let modalTitle = document.createElement("h3");
        modalTitle.innerText = "Galerie photo";
        modalTitle.classList.add("modaltitle");

        let modalGalery = document.createElement("div");
        modalGalery.classList.add("modalgalery");

        let modalAdd = document.createElement("div");
        modalAdd.classList.add("modaladd");
        

        let addBtn = document.createElement("button");
        addBtn.innerText="Ajouter une photo"
        addBtn.classList.add("addbtn");

        modalAdd.appendChild(addBtn);
        modalPage.appendChild(modalExit);
        modalPage.appendChild(modalTitle);
        modalPage.appendChild(modalGalery);
        modalPage.appendChild(modalAdd);
        modal1.appendChild(modalPage);

        modalExit.addEventListener("click", () =>{
            closeModal();
        })
        document.addEventListener("click",outsideClick);

        addBtn.addEventListener("click", (event) =>{
            event.stopPropagation();
            ajouterPhoto();
        })  
        getModalProjet();
        modal1.style.display = null;
        modal1.removeAttribute("aria-hidden");
        modal1.setAttribute("aria-modal","true");   
}
const ajouterPhoto = () =>{
    let modalPage = modal1.querySelector(".modalpage");
    let modalGalery = modal1.querySelector(".modalgalery");
    modalGalery.setAttribute("id","modalgalery");
    let modalAdd = modal1.querySelector(".modaladd");
    let modalTitle = modal1.querySelector(".modaltitle");
            

    modalGalery.innerHTML = "";
    modalAdd.innerHTML = "";
    modalTitle.innerText= "Ajout photo";

    let addPhoto = document.createElement("div");
    modalGalery.appendChild(addPhoto);
    addPhoto.classList.add("addphoto");

    let photoImg = document.createElement("div");
    addPhoto.appendChild(photoImg);
    photoImg.classList.add("photoimg");

    let photoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="68.14" height="59.62">
                    <path fill="#b9c5cc" d="M448 80c8.8 0 16 7.2 16 
                    16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 
                    3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 
                    3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 
                    32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 
                    64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                    </svg>`;
    photoImg.innerHTML = photoSvg;

    let photoBtn = document.createElement("input");
    photoBtn.setAttribute("id", "photo-btn");
    photoBtn.setAttribute("type", "file");
    photoBtn.setAttribute("accept", "image/png, image/jpg")

    let labelPhotoBtn = document.createElement("label");
    labelPhotoBtn.setAttribute("for","photo-btn")
    labelPhotoBtn.innerText = "+ Ajouter photo";
    addPhoto.appendChild(labelPhotoBtn);
    addPhoto.appendChild(photoBtn);
    labelPhotoBtn.classList.add("photobtn");

    photoBtn.onchange = () => {
        let chosenImage = document.createElement("img");
        let reader = new FileReader();
        reader.readAsDataURL(photoBtn.files[0]);
                    
        reader.onload = () =>{
            addPhoto.innerHTML="";
            chosenImage.setAttribute("src", reader.result);
            addPhoto.appendChild(photoImg);
            photoImg.innerHTML="";
            photoImg.classList.remove("photoimg");
            photoImg.classList.add("chosen-image");
            photoImg.appendChild(chosenImage);
        }
    }

    let photoSubtitle = document.createElement("p")
    photoSubtitle.innerText = "jpg, png : 4mo max"
    addPhoto.appendChild(photoSubtitle);
    photoSubtitle.classList.add("photosubtitle");

    let modalAction = document.createElement("div");
    let modalExit = document.querySelector(".modalexit");
    modalAction.appendChild(modalExit);
    modalAction.classList.add("modalaction");
    modalPage.appendChild(modalAction);

    let modalPrevious = document.createElement("div");
    modalAction.appendChild(modalPrevious);
                
    modalPrevious.classList.add("modalprevious");

    let previousSvg =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="21" height="18.01">
                        <path fill="#000000" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 
                        160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 
                        0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 
                        0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                        </svg>`;
    modalPrevious.innerHTML = previousSvg;

    modalPrevious.addEventListener("click", (event)=>{
        event.stopPropagation();
        openModal();
    })
                
    let photoForm = document.createElement("form");

    let photoTitle = document.createElement("label");
    photoTitle.setAttribute("for", "title");
    photoTitle.innerText = "Titre";

    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("id", "title");

    modalGalery.appendChild(photoForm);
    photoForm.appendChild(photoTitle);
    photoForm.appendChild(titleInput);

    let categorySelect = document.createElement("div");
    modalGalery.appendChild(categorySelect);
    categorySelect.classList.add("categoryselect")

    let titleSelect = document.createElement("label");
    titleSelect.setAttribute("for", "category-select");
    titleSelect.innerText = "Catégorie";
    categorySelect.appendChild(titleSelect);

    let photoSelect = document.createElement("select");
    photoSelect.classList.add("select")
    categorySelect.appendChild(photoSelect);

    let option = document.createElement("option");
    photoSelect.appendChild(option);
    option.setAttribute("value",""),

    photoSelect.setAttribute("name", "category");
    photoSelect.setAttribute("id", "category-select");

    let validateBtn = document.createElement("button");
    modalAdd.appendChild(validateBtn);
    validateBtn.innerText="Valider";
    validateBtn.classList.add("validatebtn");

    const getOption = ()=>{
        fetch(url+"api/categories")
        .then(reponse => reponse.json())
        .then(categories => {
            projets=categories;
            insertOption(projets);
        })
        .catch(error=>console.error(error))
    }

    getOption();

    let validCheck1 = false;
    let validCheck2 = false;
    let validCheck3 = false;
    let inputImage = document.getElementById("photo-btn")
    let validation = false;
                

    inputImage.addEventListener("change", ()=>{
        validCheck3 = true;
        formValidation();
                    
    })
    titleInput.addEventListener("keyup", ()=>{
                    
        if(titleInput.value==""){
            validCheck1 = false;
        }else{
            validCheck1 = true;
        }
        formValidation();
    })
    photoSelect.addEventListener("change", ()=>{
        let selectElement = document.querySelector("select");
        if(selectElement.value ==""){
            validCheck2 = false;
                        
        }else{
            validCheck2 = true;
        } 
        formValidation();
    })
    const formValidation = ()=>{
        if(validCheck1 && validCheck2 && validCheck3){
            
            validateBtn.classList.remove("validatebtn");
            validateBtn.classList.add("validatebtn-valid");
            validation = true;
        }else{
            validation = false;
            validateBtn.classList.add("validatebtn");
            validateBtn.classList.remove("validatebtn-valid");
        }
    }
    validateBtn.addEventListener("click",(event)=>{
        event.preventDefault();
        if(validation){
            let imageFile = photoBtn.files[0];
            let title = titleInput.value;
            let category = photoSelect.value;

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
                    getProjet()
                }
                openModal();
            })
            .catch((error)=>{
                console.error("error", error);
            })
        }
    })
    const insertOption = (categories)=>{
        for (let i=0; i<categories.length;i++){               
            let categoryOption =document.createElement("option");
            categoryOption.innerText = categories[i].name;
            categoryOption.setAttribute("value", categories[i].id);
            photoSelect.appendChild(categoryOption);
        }
    }
            

}
const getModalProjet = () =>{
    fetch(url+"api/works")
    .then(reponse => reponse.json())
    .then(works => {
        projets=works;
        modalInsertProjects(projets);
    })
    .catch(error=>console.error(error))
} 
const modalInsertProjects = (works) =>{
    let modalGalery = modal1.querySelector(".modalgalery");
    modalGalery.innerHTML="";
    works.forEach(work =>{
        let modalElement = document.createElement("div");
        modalElement.classList.add("modalelement");

        let img = document.createElement("img");
        img.src = work.imageUrl;
        img.setAttribute("id", work.id);
            
            
        modalElement.appendChild(img);

        let deletElement = document.createElement("div");
        deletElement.classList.add("deletelement");
                
        let deletSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="9" height="10.29">
                            <path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 
                            0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 
                            32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 
                            128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 
                            0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 
                            0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0
                            c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                        </svg>`;
        deletElement.innerHTML = deletSvg;
        modalElement.appendChild(deletElement);
        modalGalery.appendChild(modalElement);

        deletElement.addEventListener("click", (event)=>{
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
                    getProjet()

                }
                openModal();
            })
            .catch(error=>{
                    console.error(error);
            })
        })
    })   
}
 const closeModal = () =>{
    modal1.style.display = "none";
    modal1.setAttribute("aria-hidden","true");
    modal1.removeAttribute("aria-modal");
    document.removeEventListener("click", outsideClick);
    
}
const outsideClick = (event) =>{
    if(!event.target.closest(".edit") && !event.target.closest(".modalpage")){
        closeModal();
    }
}
getProjet()
