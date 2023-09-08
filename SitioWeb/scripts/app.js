'use strict';
const buscando = document.getElementById('buscando');
const inputBuscar = document.getElementById('input_buscar');
const listado = document.getElementById('listPrice');
const fragment = new DocumentFragment();
const tem = document.getElementById('template').content;

buscando.addEventListener('click', () => {
    if (inputBuscar.classList.contains('buscarOculto')) {
        inputBuscar.classList.remove('buscarOculto');
        inputBuscar.classList.add('buscarVisible');
    }
    else if (inputBuscar.classList.contains('buscarVisible')) {
        inputBuscar.classList.remove('buscarVisible');
        inputBuscar.classList.add('buscarOculto');
    }
});

async function obtenerLista() {
    const resp = await axios.get("https://pokeapi.co/api/v2/pokemon")
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
const comprobar = "content" in document.createElement ("template");
if (comprobar){
    console.log(tem);
    data.forEach(element =>{
        tem.querySelector("#code").innerHTML = `Código: ${element}`;
        tem.querySelector("a").innerHTML = `${element.url}`;
        const miElemento = tem.cloneNode(true);
        fragment.appendChild(miElemento);
    });
}
listado.appendChild(fragment);
