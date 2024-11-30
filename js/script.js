
const urlApi = "https://pokeapi.co/api/v2/pokemon";
let paginaActual = 1; 
const limite = 10; 

// TODAS LAS CONSTANTES POSIBLES
const appDiv = document.getElementById("app");
const entradaBusqueda = document.getElementById("searchInput");
const botonBuscar = document.getElementById("searchBtn");
const botonAnterior = document.getElementById("prevBtn");
const botonSiguiente = document.getElementById("nextBtn");
const botonReiniciar = document.getElementById("resetBtn");

// AQUÍ INTENTAMOS CONSEGUIR EL POKEMON
async function obtenerPokemones(pagina = 1) {
    const inicio = (pagina - 1) * limite; 
    const url = `${urlApi}?limit=${limite}&offset=${inicio}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        mostrarPokemones(datos.results);
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
        appDiv.innerHTML = `<p>Error al cargar los Pokémon. Inténtalo más tarde.</p>`;
    }
}

// AQUÍ INTENTAMOS QUE NOS LO ENSEÑE
async function mostrarPokemones(pokemones) {
    appDiv.innerHTML = ""; 

    for (const pokemon of pokemones) {
        try {
            const respuesta = await fetch(pokemon.url);
            const detalles = await respuesta.json();

            
            const tarjetaPokemon = document.createElement("div");
            tarjetaPokemon.classList.add("tarjeta-pokemon");
            tarjetaPokemon.innerHTML = `
                <img src="${detalles.sprites.front_default}" alt="${detalles.name}">
                <p>${detalles.name}</p>
            `;
            appDiv.appendChild(tarjetaPokemon);
        } catch (error) {
            console.error(`Error al cargar el Pokémon ${pokemon.name}:`, error);
        }
    }
}
// AQUÍ INTENTAMOS QUE LO BUSQUE
async function buscarPokemon() {
    const terminoBusqueda = entradaBusqueda.value.toLowerCase();
    if (!terminoBusqueda) return;

    try {
        const respuesta = await fetch(`${urlApi}/${terminoBusqueda}`);
        const detalles = await respuesta.json();

        appDiv.innerHTML = `
            <div class="tarjeta-pokemon">
                <img src="${detalles.sprites.front_default}" alt="${detalles.name}">
                <p>${detalles.name}</p>
            </div>
        `;
    } catch (error) {
        appDiv.innerHTML = `<p>Pokémon no encontrado</p>`;
    }
}

botonBuscar.addEventListener("click", buscarPokemon);

botonAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        obtenerPokemones(paginaActual);
    }
});

botonSiguiente.addEventListener("click", () => {
    paginaActual++;
    obtenerPokemones(paginaActual);
});

botonReiniciar.addEventListener("click", () => {
    paginaActual = 1;
    obtenerPokemones(paginaActual);
    entradaBusqueda.value = ""; 
});

document.addEventListener("DOMContentLoaded", () => {
    obtenerPokemones();
});

