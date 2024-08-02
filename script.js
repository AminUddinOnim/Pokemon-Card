
const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed338",
    fairy: "#ff0069",
    fire: "#f0932b",
    fighting: "#30336b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#efb549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190ff"
};

let btn = document.getElementById("btn");
let card = document.getElementById("card");

let getPokeData = () => {
  let id = Math.floor(Math.random() * 150) + 1;
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
      generateCard(data);
    });
}

function generateCard(data) {
  let pokeName = data.name.slice(0,1).toUpperCase() + data.name.slice(1);
  let hp = data.stats[0].base_stat;
  let imgSrc = data.sprites.other.dream_world.front_default;
  let statAttack = data.stats[1].base_stat;
  let statDefense = data.stats[2].base_stat;
  let statSpeed = data.stats[5].base_stat;
  let themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
  <p class="hp">
          <span>HP</span>${hp}
        </p>
        <img src="${imgSrc}" alt="">
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
        </div>
        <div class="status">
          <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
  `;

  appendTypes(data.types);
  styleCard(themeColor);
}

function appendTypes(types) {
  types.forEach(item => {
    let span = document.createElement("span");
    span.textContent = (item.type.name).slice(0,1).toUpperCase() + (item.type.name).slice(1);
    card.querySelector(".types").appendChild(span);
  });
}

// style card background color
function styleCard(color) {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 45%, #fff 36%)`;
  card.querySelectorAll(".types span").forEach(span => {
    span.style.backgroundColor = color;
  });
}

btn.addEventListener("click", getPokeData);

