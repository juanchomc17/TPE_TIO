document.addEventListener("DOMContentLoaded", function () {

	let formulario = document.getElementById('formulario');

	formulario.addEventListener('submit', function (e) {
		e.preventDefault();


		let datos = new URLSearchParams(new FormData(this));
		let parrafo = document.getElementById('js-resultado');

		fetch('calculadora.php', {
			"method":'post',
			body: datos
		})

			.then(function (response) {
				if(response.ok) {
					return response.json();
				} else {
					console.log("Error en el fetch");
				}
			})

			.then(function(data) {
				parrafo.innerHTML = data;
			})

	});
})