import dataset from "./model/dataset.js";
import bovinos from "./model/bovinos.js";

function calcularIdadeBovino(dataNascimento) {
  const data = new Date(dataNascimento);
  const hoje = new Date();
  const diferencaEmMilissegundos = hoje.getTime() - data.getTime();
  const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);
  const idadeEmMeses = Math.floor(diferencaEmDias / 30.44);
  return idadeEmMeses;
}


function loadBovino() {
	if (localStorage.getItem("bovinos-app:loaded") !== "ok") {
		bovinos.load(dataset);
		localStorage.setItem("bovinos-app:loaded", "ok");
	}
	for (const bovino of bovinos.readAll()) {
		createBovinoView(bovino);
	}
}

function createBovinoView(bovino) {
	const bovinosView = `<div class="row row-cols-1 row-cols-md-3 g-4" id="bovino-${bovino.id}">
 						<div class="col">
			 				<div class="card">
								<img src="${bovino.image}" alt="${bovino.raca}" class="card-img-top">
								<div class="card-body">
									<h5 class="card-Title">${bovino.raca}</h5>
				 					<p class="card-text"> <b>Id: </b>${bovino.id}<br><b>Peso: </b>${bovino.peso} Kg<br><b>Data Nascimento: </b>${bovino.datanasc}<br><b>Idade: </b>${calcularIdadeBovino(bovino.datanasc)}
								</div>
							</div>
			 			</div>
          </div>
      `;

	const bovinosDeck = document.querySelector(".card-deck");

	bovinosDeck.insertAdjacentHTML("beforeend", bovinosView);
}

function loadFormValues(title, bovinoRaca, bovinoImage) {
	const formLabel = document.querySelector("#formBovinoLabel");
	const bovinoRacaInput = document.querySelector("#raca-bovino");
	const bovinoImageInput = document.querySelector("#bovino-imagem");

	formLabel.innerHTML = title;
	bovinoRacaInput.value = bovinoRaca;
	bovinoImageInput.value = bovinoImage;
}

function loadFormCreateBovino() {
	const formBovino = document.querySelector("#formBovino");

	loadFormValues("Novo Bovino", "", "");

	formBovino.onsubmit = (e) => {
		e.preventDefault();

		let bovino = Object.fromEntries(new FormData(formBovino));

		const newBovino = bovinos.create(bovino);

		createBovinoView(newBovino);

		document.querySelector("#newBtnBovino").blur();
	};
}

window.loadFormCreateBovino = loadFormCreateBovino;

loadBovino();

