document.addEventListener("DOMContentLoaded",responsive);

function responsive() {
	document.querySelector(".btn_menu").addEventListener("click",toggleMenu);

	function toggleMenu() {
	  document.querySelector(".navegador_mobil").classList.toggle("show");
	}
}
