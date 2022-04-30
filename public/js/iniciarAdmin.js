const formulario = document.getElementById('inciarSesionAdmin')


formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const formData = new FormData(formulario)

    try {

        const res = await fetch('/api/v1/inciarAdmin', {
            method: 'post',
            body: formData
        })

        const data = await res.json()

        window.localStorage.setItem("token", data.token)

        window.location.href = `/Admin`


    }catch(error){
        console.log(error)
    }

})