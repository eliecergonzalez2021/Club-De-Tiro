window.document.addEventListener("DOMContentLoaded", async () => {
	if (!localStorage.getItem("token")) {
		window.location.href = "/api/v1/iniciarsesion";
	}
});

const formulario = document.getElementById("formularioUsuario");

formulario.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(formulario);

 

	try {
		const res = await fetch("/api/v1/usuario", {
			method: "put",
			body: formData,
		});

		const data = await res.json();

		window.location.href = "/agendadoConExito";
	} catch (error) {
		console.log(error);
	}
});
