const formulario = document.getElementById('fromEliminarPerfil')

formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const formData = new FormData(formulario)

    // para validar los datos
    //const [email, password] = [...datos.values()]

    try {

        const res = await fetch('/api/v1/eliminar', {
            method: 'delete',
            body: formData
        })
      
        const data = await res.json()
        
        if(!res.ok){
            return console.log(data.msg)
        }


        
        window.location.href = "/Admin"

    }catch(error){
        console.log(error)
    }

})