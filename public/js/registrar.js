const formulario = document.getElementById('formularioRegistrar')

formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const formData = new FormData(formulario)

    try {

        const res = await fetch('/api/v1/registrar', {
            method: 'post',
            body: formData
        })

        const data = await res.json()
    

        window.location.href = "/iniciarsesion"

    }catch(error){
        console.log(error)
    }

})