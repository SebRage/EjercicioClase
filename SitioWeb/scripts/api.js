/**get: Traer datos
 * post: Enviar datos al backend
 * delete: eliminar datos*/
/**[] arreglo de objetos */

/* Metodo fetch */
fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response)=>response.json())
    .then((json)=>{
        for(let e of json) {
            console.log(e);
        }
    })
    /*Capturar errores de ejecucion */
    .cath((err)=>console.error(err))
    .finally(console.info("Finalización de Petición"));





