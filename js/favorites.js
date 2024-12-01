document.addEventListener("DOMContentLoaded", () => {
    const appDiv = document.getElementById("favorites-app");

    function mostrarFavoritos() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        appDiv.innerHTML = "";

        favoritos.forEach(async (nombre) => {
            try {
                const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
                const detalles = await respuesta.json();

                const tarjetaPokemon = document.createElement("div");
                tarjetaPokemon.classList.add("pokemon-card");
                tarjetaPokemon.innerHTML = `
                    <img src="${detalles.sprites.front_default}" alt="${detalles.name}">
                    <p>${detalles.name}</p>
                `;
                appDiv.appendChild(tarjetaPokemon);
            } catch (error) {
                console.error(`Error al cargar el Pokémon ${nombre}:`, error);
            }
        });
    }

    mostrarFavoritos();
});
