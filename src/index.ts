
const $ = require("jquery");

let ddbb = null;

$.getJSON("A-HTML.json", function (JSON) {
    ddbb = JSON;
});


//document.body.requestFullscreen();

function pantallaCompleta(elem) {
    //Si el navegador es Mozilla Firefox
    if(elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
      alert("mozilla pantallaCompleta");

    }
    //Si el navegador es Google Chrome
    else if(elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
      alert("chrome pantallaCompleta");
    }
    //Si el navegador es otro
    else if(elem.requestFullScreen) { 
      elem.requestFullScreen(); 
      alert("otro pantallaCompleta");
    }
  }


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

                return element.articulo.toLocaleLowerCase().includes(searchTerm) ||
                    element.codigo2.toLocaleLowerCase().includes(searchTerm) ||
                    element.codprov.toLocaleLowerCase().includes(searchTerm) ||
                    element.descripcion.toLocaleLowerCase().includes(searchTerm);
            })

            const table = document.createElement("table")
            encontrado.forEach(element => {
                const node = document.createElement("tr");
                node.addEventListener("click", () => {
                    alert(element.descripcion)
                });

                if (idx <= 80) {
//                    console.log(idx);

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

