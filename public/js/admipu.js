const formulario = document.getElementById("formularioAdminEditar");

formulario.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(formulario);

 

	try {
		const res = await fetch("/api/v1/editarAdmin", {
			method: "put",
			body: formData,
		});

		const data = await res.json();

		window.location.href = "/Admin";
	} catch (error) {
		console.log(error);
	}
});
