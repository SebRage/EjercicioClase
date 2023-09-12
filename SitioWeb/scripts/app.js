"use strict";
const buscando = document.getElementById("buscando");
const inputBuscar = document.getElementById("input_buscar");
const listado = document.getElementById("listPrice");
const fragment = new DocumentFragment();
const tem = document.getElementById("template").content;
const form = document.getElementById("form");
const enviar = document.getElementById("btnSend");

//Objeto de validacion. Objeto literal de JS
const formValid = {
    nombres: false,
    appellidos: true, //PONER ESTO EN FALSE
    mail: false,
    politica: true, //PONER ESTO EN FALSE
    celPhone: true, //PONER ESTO EN FALSE
};

//Envio del formulario
enviar.addEventListener("click", function (e) {
    e.preventDefault(); //No hace el envio del formulario por lo tanto no se refresca
    console.log(Object.values(formValid));
    if (formValidValues(formValid) === -1) {
        alert("Enviando Formulario");
    } else {
        alert("Campos Inválidos");
    }
});
const formValidValues = (objeto) => {
    const valores = Object.values(objeto);
    let response = valores.findIndex((e) => e === false);
    return response;
};

//Validacion a traves del cambio de los elementos del formulario
form.addEventListener("change", (e) => {
    const inputId = e.target.id;
    console.log(inputId);
    const myValue = e.target.value;
    console.log(myValue);
    const myClass = e.target.classList;
    console.log(myClass);
    //Funciones que agrega o quita estilos validos e invalidos
    const validClass = () => {
        myClass.add("is-valid ");
        myClass.remove("is-invalid");
    };
    const inValidClass = () => {
        myClass.remove("is-valid");
        myClass.add("is-invalid");
    };
    switch (inputId) {
        case "names":
            const nombresRx =
                /^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,25})([\s]?)([a-zA-ZÀ-ÖØ-öø-ÿ]{0,25})$/g;
            formValid.nombres = myValue.match(nombresRx) ? true : false;
            formValid.nombres ? validClass() : inValidClass();
            console.log(Object.values(formValid));
            break;
        case "lastNames":
            //TAREA VALIDACION DE LASTNAMES
            break;
        case "mail":
            const mailRx =
                /^([\w.]+[^#$%&\/()='"!?¡]\w*-*)([@])(\w)+(\.[a-z]{2,3})$/g;
            formValid.mail = myValue.match(mailRx) ? true : false;
            formValid.mail ? validClass() : inValidClass();
            console.log(Object.values(formValid));
            break;
        case "celPhone":
            //TAREA VALIDACION DE CELPHONE

            break;
        case "checkPolitica":
            //TAREA VALIDACION DE CHECKPOLITICA

            break;

        default:
            break;
    }
});

buscando.addEventListener("click", () => {
    if (inputBuscar.classList.contains("buscarOculto")) {
        inputBuscar.classList.remove("buscarOculto");
        inputBuscar.classList.add("buscarVisible");
    } else if (inputBuscar.classList.contains("buscarVisible")) {
        inputBuscar.classList.remove("buscarVisible");
        inputBuscar.classList.add("buscarOculto");
    }
});

async function obtenerLista() {
    const resp = await axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((response) => {
            const resultados = response.data.results;
            let poke = [];
            for (const i in resultados) {
                poke.push(resultados[i]);
            }
            console.log(poke);
            return poke;
        })
        .catch((error) => {
            console.error(error);
            return 0;
        });
    return resp;
}
const data = await obtenerLista();
console.log(data);
const comprobar = "content" in document.createElement("template");
if (comprobar) {
    console.log(tem);
    data.forEach((element) => {
        tem.querySelector("#code").innerHTML = `Código: ${element}`;
        tem.querySelector("a").innerHTML = `${element.url}`;
        const miElemento = tem.cloneNode(true);
        fragment.appendChild(miElemento);
    });
}
listado.appendChild(fragment);
