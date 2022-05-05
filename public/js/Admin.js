const formulario = document.getElementById("logout");

formulario.addEventListener("click", async (e) => {
	
	e.preventDefault();
	console.log("click");
	window.localStorage.removeItem("token");

    window.location.href =`/api/v1/logout`


});
