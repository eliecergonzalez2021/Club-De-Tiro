

window.document.addEventListener("DOMContentLoaded", async () => {
	const token = document.cookie.split('=')[1]
	console.log("🚀 ~ file: perfilSocio.js ~ line 3 ~ window.document.addEventListener ~ token", token)
	try {
		const res = await fetch('/api/v1/perfilUsuario', {
			method: 'post',
		})
        console.log("🚀 ~ file: perfilusuario.js ~ line 10 ~ window.document.addEventListener ~ res", res)
        
        const data = await res.json()

        console.log(data)
		const rut = document.getElementById('rut')
		const nombreT = document.getElementById('nombreTitulo')
		const email = document.getElementById('email')
		const curso = document.getElementById('curso')
		const fecha = document.getElementById('fecha')

		rut.innerHTML =(`<p class="PerfilSubtitulo">${data.socio.rut}</p>`)	
		nombreT.innerHTML =(`<h2 class="PerfilNombre">${data.socio.nombre}</h2>`)
		email.innerHTML =(`<p class="PerfilSubtitulo">${data.socio.email}</p>`)	
		curso.innerHTML =(`<p class="PerfilSubtitulo">${data.socio.curso_fk}</p>`)	
		fecha.innerHTML =(`<p class="PerfilSubtitulo">${data.socio.fecha}</p>`)		
	} catch (error) {
		console.log(error)
	}
});

 // borrar cookie con cerrar sesion
const formulario = document.getElementById("logout");

formulario.addEventListener("click", async (e) => {
    
    e.preventDefault();
    console.log("click");
    window.localStorage.removeItem("token");

    window.location.href =`/api/v1/logout`

});