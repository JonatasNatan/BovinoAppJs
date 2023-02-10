import dataset from "./model/dataset.js";
import bovinos from "./model/bovinos.js";

function calcularIdadeEmMeses(datanasc) {
	var anoAtual = new Date().getUTCFullYear()
	var anoNasc = Number(datanasc.split('-')[0])
	var idadeEmAno = anoAtual - anoNasc
	var mesAtual = new Date().getUTCMonth()
	var mesNasc = Number(datanasc.split('-')[1])
	var idadeMes = (idadeEmAno * 12) - mesNasc + mesAtual

	return idadeMes
	
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
	const bovinosView = `
 						<div class="col">
			 				<div class="card">
								<img src="${bovino.image}" alt="${bovino.raca}" class="card-img-top">
								<div class="card-body">
									<h5 class="card-Title">${bovino.raca}</h5>
				 				<p class="card-text"> <b>Id: </b>${bovino.id}<br><b>Peso: </b>${bovino.peso} Kg<br><b>Data Nascimento: </b>${bovino.datanasc}<br>
				 <b>Idade: </b>${calcularIdadeEmMeses(bovino.datanasc)} Meses
							</div>
						</div>
			 		</div>
      `;

	const bovinosDeck = document.querySelector(".card-deck");

	bovinosDeck.insertAdjacentHTML("beforeend", bovinosView);
}

function loadFormValues(title, bovinoRaca, bovinoImage, bovinoDate) {
	const formLabel = document.querySelector("#formBovinoLabel");
	const bovinoRacaInput = document.querySelector("#raca-bovino");
	const bovinoImageInput = document.querySelector("#bovino-imagem");
	const bovinoDateInput = document.querySelector("#data-nasc")

	formLabel.innerHTML = title;
	bovinoRacaInput.value = bovinoRaca;
	bovinoImageInput.value = bovinoImage;
	bovinoDateInput.value = bovinoDate;

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

