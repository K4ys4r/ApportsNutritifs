
let NutritionsList = ["Banane","Abricot","Poulet","Dinde","Vin"];


var btnInfos = document.querySelector('#btnInfos');
btnInfos.addEventListener('click',()=>{
    let infos = document.querySelector("#InfosDiv");
    let calculs = document.querySelector("#CalculsDiv");
    if (calculs) {
        RemoveDiv(calculs);  
    } 

    if (!infos) {
        var parent = document.querySelector('#parent');
        var div = document.createElement('div');
        div.setAttribute("id","InfosDiv")
        var p = document.createElement('p');
        var s = document.createTextNode("Salut Tous le monde");
        p.appendChild(s);
        div.appendChild(p)
        parent.appendChild(div);
        infosCreated = true;        
    }else{
        ShowDiv(infos);
    }
}
)

var btnNutritions = document.querySelector('#btnNutritions');
btnNutritions.addEventListener('click',()=>{
    let infos = document.querySelector("#InfosDiv");
    if(infos){
        HideDiv(infos);
    }
    let claculs = document.querySelector("#CalculsDiv")
    if(claculs){
        RemoveDiv(claculs);
    }
    var parent = document.querySelector('#parent');
    var div = document.createElement('div');
    div.setAttribute("id","CalculsDiv");
    div.setAttribute('class','row m-2 text-center justify-content-center')
    
    let selectDiv = document.createElement("div");
    selectDiv.setAttribute('class','col ');
    var select = CreateSelectList(NutritionsList);
    selectDiv.appendChild(select);
    select.setAttribute('class',"form-control form-control-lg")
    
    let btnDiv = document.createElement("div");
    btnDiv.setAttribute("class","col");
    var btnValider = document.createElement('button');
    btnValider.setAttribute("id","btnValider");
    btnValider.textContent = "Valider";
    btnValider.setAttribute("class","btn btn-success btn-lg btn-block");
    btnDiv.appendChild(btnValider);
    
    div.appendChild(selectDiv);
    div.appendChild(btnDiv);
    parent.appendChild(div); 
    let calculBtn = document.querySelector('#btnValider');
    calculBtn.addEventListener('click',()=>{
        var e = document.querySelector("#NutritionsList");
        var strUser = e.options[e.selectedIndex].value;
        console.log(strUser);
    })
}
)




function RemoveDiv(div) {
    div.remove();
}
function HideDiv(div) {
    div.setAttribute("style","display:none");
}
function ShowDiv(div) {
    div.setAttribute("style","display:block");
}

function CreateSelectList(list) {
    let selectlist = document.createElement("select");
    selectlist.setAttribute("id","NutritionsList");
    list.forEach(item =>{
        let option = document.createElement("option");
        option.value = item;
        option.text = item;
        option.style.fontSize = "30pt";
        selectlist.appendChild(option);
    })
    return selectlist;
}
