init();


const $ = require("jquery");


let ddbb = null
$.getJSON("A-HTML.json", function (JSON) {
    ddbb = JSON;
});
function aclaradoTabla() {
//    (document.getElementById('table')).nodeValue = "";
//    $("#table_of_items tr").remove();
//    $("table id tr").remove()
//var table = document.getElementById("table"); Table.innerHTML = ""; 
//const table=document.createElement("table")
//        document.getElementById("table").innerHTML = ""; 
}

function init() {
    document.getElementById("borrar").addEventListener("click", () => {
        Borrar();
    });

    introValor();
}

function introValor() {

    document.getElementById("searchTerm").addEventListener("keypress", (e) => {
        $("#table").remove();
//        document.getElementById("table").innerHTML = "";
        (document.getElementById('resulDescripcion')).innerHTML = "";
        if (e.key !== "Enter") {
            let searchTerm = (<HTMLInputElement>document.getElementById('searchTerm')).value + e.key;
            searchTerm=searchTerm.toLocaleLowerCase() 
            //            console.log(ddbb);
            var encontrado = ddbb.filter(function(element) {

                return element.articulo.toLocaleLowerCase().includes(searchTerm) ||
                       element.codigo2.toLocaleLowerCase().includes(searchTerm) ||
                       element.codprov.toLocaleLowerCase().includes(searchTerm) ||
                       element.descripcion.toLocaleLowerCase().includes(searchTerm);
            })
            const table=document.createElement("table")
                 
            console.log(encontrado)
            encontrado.forEach(element=>{
                const node=document.createElement("tr");
                node.addEventListener("click", () => {
                    console.log(element.descripcion);
                });
                const td1=document.createElement("td");
                    td1.innerHTML=element.articulo;
                    node.appendChild(td1);
                const td2=document.createElement("td");
                    td2.innerHTML=element.descripcion;
                    node.appendChild(td2);
                const td3=document.createElement("td");
                    td3.innerHTML=element.precio;
                    node.appendChild(td3);
                    table.appendChild(node);
                const td4=document.createElement("td");
                  td4.setAttribute('style','color: green');
                  td4.innerHTML=element.stock;
                    node.appendChild(td4);
                    table.appendChild(node);
            })                
            document.getElementById('resulDescripcion').appendChild(table);                   
         }
    })

}
function Borrar() {
    
    (<HTMLInputElement>document.getElementById('searchTerm')).value = "";
    document.getElementById('searchTerm').focus();
    //@ts-ignore
    (document.getElementById('resulDescripcion')).innerHTML = "";
}

//FILTRO
//function doSearch() {
//   const searchTerm = (<HTMLInputElement>document.getElementById('searchTerm')).value ;
//    var encontrado = ddbb.find(function(element)  {
//        console.log(element);
//        return element.articulo == (searchTerm) ||
//               element.codigo2  == (searchTerm) ||
//               element.codprov  == (searchTerm) ;
//    }) 
//    console.log(searchTerm) ;    
//}



// el erray de los nombres seleccionados
//let seleccionados = [];
// cada vez que el valor del elemento input cambia
//const searchTerm = document.getElementById(searchTerm.addEventListener("searchTerm", () => {

 //   )
//}
//MAP
//	arrayMap = arr.map( (elem) => elem.toString());
//	console.log(arrayMap);

	//FOREACH
//	arr.forEach( (elem) => console.log(elem));
//	