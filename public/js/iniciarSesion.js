const formulario = document.getElementById('formularioLogin')


formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const formData = new FormData(formulario)

    try {

        const res = await fetch('/api/v1/iniciarsesion', {
            method: 'post',
            body: formData,
            credentials: 'same-origin'
        })

        const data = await res.json()

        window.localStorage.setItem("token", data.token)

        window.location.href = `/usuario`

    }catch(error){
        console.log(error)
    }

})