
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
    var p = document.createElement('p');
    var select = CreateSelectList(NutritionsList);
    p.appendChild(select);
    div.appendChild(p);
    parent.appendChild(div);

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
    console.log("---------");
    let selectlist = document.createElement("select");
    selectlist.setAttribute("id","NutritionsList");
    list.forEach(item =>{
        console.log(item);
        let option = document.createElement("option");
        option.value = item;
        option.text = item;
        selectlist.appendChild(option);
    })
    return selectlist;
}