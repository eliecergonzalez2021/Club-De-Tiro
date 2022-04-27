const formulario = document.getElementById('formularioLogin')


formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const formData = new FormData(formulario)

    try {

        const res = await fetch('/api/v1/iniciarsesion', {
            method: 'post',
            body: formData
        })

        const data = await res.json()
    

        window.location.href = "/usuario"

    }catch(error){
        console.log(error)
    }

})