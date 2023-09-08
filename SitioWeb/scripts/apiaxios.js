axios.get("https://pokeapi.co/api/v2/pokemon")
    .then((response)=>{
        console.log(response.data.results);
    })
    .cath((error)=>{
        console.error(error.message);
    });
    
