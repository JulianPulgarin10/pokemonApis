document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('pokemonName');
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            fetchPokemon();
        }
    });
});

function fetchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.trim();

    if (!pokemonName) {
        alert('Por favor, ingresa el nombre o número del Pokémon.');
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            console.error('Error al obtener el Pokémon:', error);
            document.getElementById('pokemonCard').innerHTML = `
                <div class="error-message">
                    <p>Pokémon no encontrado. Verifica el nombre o número e intenta nuevamente.</p>
                </div>
            `;
        });
}


function displayPokemon(pokemon) {
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const stats = pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('');

    const pokemonCard = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p><strong>Habilidades:</strong> ${abilities}</p>
        <ul class="stats"><strong>Estadísticas:</strong> ${stats}</ul>
    `;

    document.getElementById('pokemonCard').innerHTML = pokemonCard;
}

function fetchAllPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const allPokemonPromises = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
            return Promise.all(allPokemonPromises);
        })
        .then(allPokemons => {
            const allCards = allPokemons.map(pokemon => {
                const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
                const stats = pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('');

                return `
                    <div class="card">
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        <h2>${pokemon.name}</h2>
                        <p><strong>Habilidades:</strong> ${abilities}</p>
                        <ul class="stats"><strong>Estadísticas:</strong> ${stats}</ul>
                    </div>
                `;
            }).join('');

            document.getElementById('pokemonCard').innerHTML = allCards;
        })
        .catch(error => {
            console.error('Error al obtener los Pokémon:', error);
            document.getElementById('pokemonCard').innerHTML = `<p>Error al cargar todos los Pokémon.</p>`;
        });
}






//Flechuita

document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Mostrar el botón cuando se desplace hacia abajo
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight / 2) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Volver al inicio al hacer clic en el botón
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
