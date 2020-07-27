var btnInfos = document.querySelector('#btnInfos');
btnInfos.addEventListener('click',()=>{
    let calculs = document.querySelector("#CalculsDiv");
    if (calculs) {
        RemoveDiv(calculs);  
    } 
    let apportsdiv =  document.querySelector('#apportsNutritifs')
    if (apportsdiv) {
        RemoveDiv(apportsdiv);
    }
    let infos = document.querySelector("#InfosDiv");
    if (!infos) {
        var parent = document.querySelector('#parent');
        var div = document.createElement('div');
        div.setAttribute("id","InfosDiv")
        var p = document.createElement('p');
        var s = document.createTextNode("Salut Tous le monde");
        p.appendChild(s);
        div.appendChild(p)
        parent.appendChild(div);
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
    let apportsdiv =  document.querySelector('#apportsNutritifs')
    if (apportsdiv) {
        RemoveDiv(apportsdiv);
    }
    var parent = document.querySelector('#parent');
    var div = document.createElement('div');
    div.setAttribute("id","CalculsDiv");
    div.setAttribute('class','row m-2 text-center justify-content-center')
    
    let selectDiv = document.createElement("div");
    selectDiv.setAttribute('class','col ');
    var select = CreateSelectList(NutrimentsList.map(item => item.nom));
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
        var nutriment = e.options[e.selectedIndex].value;
        GetApportsNutritifs(nutriment);
        e.value = "---Choisissez un nutriment---";
    })

    let apportsDiv = document.createElement('div');
    apportsDiv.setAttribute("id","apportsNutritifs");
    apportsDiv.setAttribute("class","col  mt-4");
    let tab = document.createElement('table');
    tab.setAttribute('class','table table-striped table-responsive')
    tab.setAttribute('id','apportsTab');
    let tabHeadItems = ['Nutriment','Calories','Protides','Glucides','Lipides','Magnésium','Fer','Calcium','Potassium','Sodium','Phosphore'];
    let tabHead = document.createElement('thead');
    tabHeadItems.forEach(item =>{
        let th = document.createElement('th')
        th.appendChild(document.createTextNode(item));
        tabHead.appendChild(th);
    })
    tab.appendChild(tabHead);
    let bodyTab = document.createElement('tbody');
    tab.appendChild(bodyTab);
    let footTab = document.createElement('tfoot');
    footTab.setAttribute('class','footer bg-warning')
    tab.appendChild(footTab);
    apportsDiv.appendChild(tab);
    parent.appendChild(apportsDiv);
})


function GetApportsNutritifs(nutriment) {
    var tableRef = document.getElementById('apportsTab');
    var bodyTab = tableRef.getElementsByTagName('tbody')[0];

    if (bodyTab && NutrimentsList.map(item => item.nom).includes(nutriment)) {
        var newNutriment = bodyTab.insertRow();
        // newNutriment.innerHTML = "<td>Nom</td> <td>1</td> <td>2</td> <td>3</td> <td>5</td> <td>6</td> <td>7</td> <td>8</td> <td>9</td> <td>10</td> <td>11</td>";
        newNutriment.innerHTML = NutrimentsList.filter(item => item.nom === nutriment).toString();
        let btnD = newNutriment.insertCell();
        btnD.innerHTML = "<button class='close' onclick='getRowIndex(this)'>&times</button>";       
        
        var nutrimentsSum = getNutrimentsSum(bodyTab);
        setFooterTab(nutrimentsSum);
        
    }
}


function setFooterTab(nutrimentsSum) {
    var tableRef = document.getElementById('apportsTab');
    var footTab = tableRef.getElementsByTagName('tfoot')[0];
    if (nutrimentsSum==0) {
        footTab.innerHTML = "";        
    }else{
        nutrimentsSum.unshift("Total");
        footTab.innerHTML = new Nutriment(...nutrimentsSum).toString().replaceAll('td','th'); 
    }
}

function getNutrimentsSum(bodyTab) {
    if(bodyTab.rows.length==0){
        return 0;
    }
    let nutrimentsSum = []
    for (let i = 1; i< bodyTab.rows[0].cells.length; i++) {
        let sum = 0;
        for (let j = 0; j < bodyTab.rows.length; j++) {
            let info = bodyTab.rows[j].cells[i].innerHTML;
            sum+= parseFloat(info)>=0 ?parseFloat(info):0; 
        }
        nutrimentsSum.push(RemoveZeroFixed(sum.toFixed(2)));
    }
    return nutrimentsSum
}

function getRowIndex(element) {
    let tab = document.querySelector('#apportsTab');
    tab.deleteRow(element.parentNode.parentNode.rowIndex);
    var bodyTab = tab.getElementsByTagName('tbody')[0];
    var nutrimentsSum = getNutrimentsSum(bodyTab);
    setFooterTab(nutrimentsSum);
}

function RemoveZeroFixed(n) {
    return (n*100/100)==parseInt(n)?parseInt(n):n; 
}

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
    list.unshift("---Choisissez un nutriment---");
    let selectlist = document.createElement("select");
    selectlist.setAttribute("id","NutritionsList");
    list.forEach(item =>{
        let option = document.createElement("option");
        option.value = item;
        option.text = item;
        selectlist.appendChild(option);
    })
    return selectlist;
}

function Nutriment(nom,cal,prt,glu,lip,mg,fe,ca,k,na,ph) {
    this.nom = nom;
    this.calories = cal;
    this.magnesium = mg;
    this.calcium = ca;
    this.sodium = na,
    this.potassium = k,
    this.phosphore = ph,
    this.fer = fe;
    this.protides = prt;
    this.glucides = glu;
    this.lipides = lip; 
    this.toString = function () {
        return "<th>"+this.nom+"</th>" +
               "<td>"+this.calories+"</td>" +
               "<td>"+this.protides+"</td>" +
               "<td>"+this.glucides+"</td>" +
               "<td>"+this.lipides+"</td>" +
               "<td>"+this.magnesium+"</td>" +
               "<td>"+this.fer+"</td>" +
               "<td>"+this.calcium+"</td>" +
               "<td>"+this.potassium+"</td>" +
               "<td>"+this.sodium+"</td>" +
               "<td>"+this.phosphore+"</td>";
    }
}


//Lire le fichier qui contient toutes les information sur les nutriments.
function httpGet(url,callback) {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, false );
    xmlhttp.send();    
}

// Appel la fonction pour lire le fichier et creer la liste des nutriments.
var NutrimentsList = [];
httpGet("https://dl.dropboxusercontent.com/s/7hufre0y07murfx/Nutriments.data?dl=0",function(params) {
    array = params.split('\n');
    array.forEach(item => {
        let info = item.split(' ');
        if (info.length === 11) {
            let nutriment = new Nutriment(info[0],info[1],info[2],
                                          info[3],info[4],info[5],
                                          info[6],info[7],info[8],
                                          info[9],info[10]);
            NutrimentsList.push(nutriment);
        }
    })
});
