const formulario = document.getElementById('formularioRegister')


formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const formData = new FormData(formulario)

    try {

        const res = await fetch('/api/v1/iniciarsesion', {
            method: 'post',
            body: formData
        })

        const data = await res.json()
    

        window.location.href = "/"

    }catch(error){
        console.log(error)
    }

})