const formulario = document.getElementById('formularioPerfilUsuario')

formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const formData = new FormData(formulario)

    try {

        const res = await fetch('/api/v1/perfilusuario', {
            method: 'post',
            body: formData
        })

        const data = await res.json()
    

        window.location.href = "/perfilusuario"

    }catch(error){
        console.log(error)
    }

})