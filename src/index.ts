
const $ = require("jquery");

let ddbb = null;

$.getJSON("A-HTML.json", function (JSON) {
    ddbb = JSON;
});

document.getElementById("table3").innerHTML= "<tr><td>Descricion</td><td>Precio</td><td>Cant</td><td>Desc</td><td>TOTAL</td></tr>";



init();

function init() {
    document.getElementById("borrar").addEventListener("click", () => {
        Borrar();
    });

    introValor();
}

function introValor() {

    $(document).ready(function () {

        $("#searchTerm").on("input", function () {

            $("#table").remove();
            (document.getElementById('resulDescripcion')).innerHTML = "";
            let idx = 1;
            let searchTerm = ($(this).val());

            searchTerm = searchTerm.toLocaleLowerCase();

            var encontrado = ddbb.filter(function (element) {
                if (isNaN(searchTerm)) {  //si es numero o no 
                    return element.descripcion.toLocaleLowerCase().includes(searchTerm);
                }
                else {
                    return element.articulo.toLocaleLowerCase().includes(searchTerm) ||
                        element.codigo2.toLocaleLowerCase().includes(searchTerm) ||
                        element.codprov.toLocaleLowerCase().includes(searchTerm) ;
                } 
            })

            const table = document.createElement("table")
            encontrado.forEach(element => {
                const node = document.createElement("tr");
                node.addEventListener("click", () => {

                    tabla2(element);
                });

                if (idx <= 80) {

                    const td2 = document.createElement("td");
                    td2.innerHTML = element.descripcion;
                    node.appendChild(td2);
                    table.appendChild(node);
                    const td3 = document.createElement("td");
                    td3.innerHTML = element.precio;
                    node.appendChild(td3);
                    table.appendChild(node);
                    const td4 = document.createElement("td");
                    td4.setAttribute('style', 'color: green');
                    td4.innerHTML = element.stock;
                    node.appendChild(td4);
                    table.appendChild(node);
                    document.getElementById('resulDescripcion').appendChild(table);
                    ++idx;

                }
            })
        })
    })
}

function Borrar() {

    (<HTMLInputElement>document.getElementById('searchTerm')).value = "";
    document.getElementById('searchTerm').focus();
    //@ts-ignore
    (document.getElementById('resulDescripcion')).innerHTML = ""
}

function tabla2(element) {
    const table2 = document.getElementById("table3");
        const node = document.createElement("tr");

        const td1 = document.createElement("td");
            td1.innerHTML = element.descripcion;
            node.appendChild(td1);
            table2.appendChild(node);
        const td2 = document.createElement("td");
            td2.innerHTML = element.precio;
            node.appendChild(td2);
            table2.appendChild(node);
        const td3 = document.createElement("td");
            td3.innerHTML = "1";
            node.appendChild(td3);
            table2.appendChild(node);
        const td4 = document.createElement("td");
            td4.innerHTML = "";
            node.appendChild(td4);
            table2.appendChild(node);
        const td5 = document.createElement("td");
            td5.innerHTML = element.precio;
            node.appendChild(td5);
            table2.appendChild(node);
//          console.log(table2) ;       
        //document.getElementById('resulDescripcion2').appendChild(table2);
//tabla3
//        document.getElementById('table3').appendChild(table2);



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

