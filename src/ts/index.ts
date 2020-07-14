import { Elemento } from './class.element';
const $ = require("jquery");

//@ts-ignore
import html2canvas from 'html2canvas';

let ddbb: Array<Elemento> = [];

var f = new Date();
var dd = String(f.getDate()).padStart(2, '0');
var mm = String(f.getMonth() + 1).padStart(2, '0'); //January is 0!
document.getElementById('fecha').innerHTML = dd + "-" + mm + "-" + f.getFullYear();

document.body.style.background = "black";
document.body.style.backgroundImage = "url('https://shiverazul.github.io/citaprevia/dist/assets/fondo-luna-Carlos1.jpg')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundSize = "75%";




$(document).ready(function () {
    document.getElementById("table3").innerHTML = "<tr><th></th><th>Descripció</th><th>Preu</th><th>Cant</th><th>Desc</th><th>TOTAL</th></tr>";

    $.getJSON("A-HTML.json", function (data) {
        ddbb = data.map(element => new Elemento(element.articulo, element.codigo2, element.codprov, element.descripcion, element.precio, element.stock));
        //        console.log(Elemento);
        init();
    });
});


function init() {
    document.getElementById("borrar").addEventListener("click", () => {


        Borrar();
    });

    introValor();
}

//function fechabase() {
//    var encontradobase = ddbb.filter(function (element) {
    // fecha de la base
//        if (element.descripcion.toLocaleLowerCase().includes("?date")) { // fecha de la base
//        (document.getElementById('verBase')).innerHTML = element.descripcion.substring(0, 8);
//    };
//}    


function introValor() {
    $("#searchTerm").on("input", function () {
        //        alert("hola");
        $("#table").remove();
        (document.getElementById('resulDescripcion')).innerHTML = "";
        let idx = 1;
        let searchTerm = ($(this).val());
        searchTerm = searchTerm.toLocaleLowerCase();
 
        var encontrado = ddbb.filter(function (element) {
            // fecha de la base
            //if (element.descripcion.toLocaleLowerCase().includes("?date")) { // fecha de la base
            //    (document.getElementById('verBase')).innerHTML = element.descripcion.substring(0, 8);
            //};

            if (isNaN(searchTerm)) {  //si es numero o no 
                return element.descripcion.toLocaleLowerCase().includes(searchTerm);
            }
            else {
                if (searchTerm.length == 6  || searchTerm.length ==  13) { 
                return element.articulo.toLocaleLowerCase().includes(searchTerm) ||
                    element.codigo2.toLocaleLowerCase().includes(searchTerm) ||
                    element.codprov.toLocaleLowerCase().includes(searchTerm);
                }
            }
            });


        const table = document.createElement("table")
        encontrado.forEach(element => {
            const node = document.createElement("tr");
            node.addEventListener("click", () => {
                tabla2(element);
            });

            if (idx <= 50) {

                const td2 = document.createElement("td");
                td2.innerHTML = element.descripcion;
                node.appendChild(td2);
                table.appendChild(node);
                const td3 = document.createElement("td");
                td3.setAttribute('style', 'color: lightgreen');
                td3.innerHTML = element.precio + "";
                node.appendChild(td3);
                table.appendChild(node);
                const td4 = document.createElement("td");
                td4.setAttribute('style', 'color: green');
                td4.innerHTML = element.stock + "";
                node.appendChild(td4);
                table.appendChild(node);
                document.getElementById('resulDescripcion').appendChild(table);
                ++idx;

            }
        })
    })
}

function Borrar() {

    (<HTMLInputElement>document.getElementById('searchTerm')).value = "";
    //    document.getElementById('searchTerm').focus();
    //@ts-ignore
    (document.getElementById('resulDescripcion')).innerHTML = ""
}

function tabla2(element) {
    //Creacion de TH

    const table2 = document.getElementById("table3");
    const node = document.createElement("tr");
    const td1 = document.createElement("td");
    node.appendChild(td1);
    table2.appendChild(node);
    td1.addEventListener("click", () => {
        table2.removeChild(node)
        getTotal();
    });

    const td2 = document.createElement("td");
    td2.innerHTML = element.descripcion;
    node.appendChild(td2);
    table2.appendChild(node);
    const td3 = document.createElement("td");
    td3.innerHTML = element.precio;
    node.appendChild(td3);
    table2.appendChild(node);
    const td4 = document.createElement("td");
    const newcantidad = document.createElement("input");
    newcantidad.className = "noinput";
    $(newcantidad).attr("type", "tel").val(1);
    td4.appendChild(newcantidad); //introduzco input dentro de td4
    node.appendChild(td4);
    table2.appendChild(node);


    const td5 = document.createElement("td");

    const newdescuento = document.createElement("input");
    newdescuento.className = "noinput";
    $(newdescuento).attr("type", "tel").val();
    td5.appendChild(newdescuento); //introduzco input dentro de td4
    node.appendChild(td5);
    table2.appendChild(node);

    const td6 = document.createElement("td");
    const newtotal = document.createElement("input");
    newtotal.value = element.precio;

    newtotal.className = "noinput total";
    td6.appendChild(newtotal); //introduzco input dentro de td6

    node.appendChild(td6);
    table2.appendChild(node);

    getTotal()
    $(newcantidad).on("input", function () {

        anadirPreciodeElemento(element.precio, +newcantidad.value, +newdescuento.value, newtotal);
        getTotal();
    });
    $(newdescuento).on("input", function () {
        anadirPreciodeElemento(element.precio, +newcantidad.value, +newdescuento.value, newtotal);
        getTotal();
    });
    Borrar();

}

function anadirPreciodeElemento(precio: number, cantidad: number, newdescuento: number, totalElemento: HTMLElement): void {
    //console.log(totalElemento, precio, cantidad);
    const desc: number = precio * (newdescuento / 100);
    //console.log(newdescuento)
    const total: number = (precio - desc) * cantidad;
    (<HTMLInputElement>totalElemento).value = total.toFixed(2);
}

function getTotal() {
    const elements = $("#table3").find(".total");
    let total: number = 0;
    for (let i = 0; i < elements.length; i++) {
        //        console.log(elements[i].value)
        total += +elements[i].value;
        document.getElementById('resulTotalisimo').innerHTML = total.toFixed(2)
    }
}

$("#download").click(() => {
    html2canvas(document.body).then(canvas => {
        var link = (<HTMLAnchorElement>document.getElementById('download'));
        var a = $("<a>")
            .attr("href", canvas.toDataURL("image/png"))
            .attr("download", "img.png")
            .appendTo("body");
        a[0].click();
        a.remove();
    });
})

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