window.onload = init;

var headers = {};

function init() {
    if (sessionStorage.getItem("token")) {
        headers = {
            'Authorization': "bearer" + sessionStorage.getItem("token")
        };
        document.getElementById('consulta').addEventListener('click', mostrarBusqueda);
        document.getElementById('alta').addEventListener('click', mostrarAlta);
        document.getElementById('salir').addEventListener('click', salir);
        document.getElementById('btn-crear').addEventListener('click', altaUsuarios);
        //document.getElementById('btn-crear').addEventListener('click',);
    } else {
        window.location.replace("../index.html");
    }
}

function mostrarBusqueda() {
    document.getElementById('consulta-form').classList.toggle('hidden');
    document.getElementById('alta-form').classList.toggle('hidden');
    document.getElementById('consulta-li').classList.toggle('active');
    document.getElementById('alta-li').classList.toggle('active');
}

function mostrarAlta() {
    document.getElementById('consulta-form').classList.toggle('hidden');
    document.getElementById('alta-form').classList.toggle('hidden');
    document.getElementById('consulta-li').classList.toggle('active');
    document.getElementById('alta-li').classList.toggle('active');
}

function salir() {
    sessionStorage.removeItem("token");
    window.location.replace("../index.html");
}

function buscarUsuario() {
    var nombre = document.getElementById('btn-buscarUsr').value;
    axios.get(url + '/users/obtenerUsuarios/' + nombre, headers).then((res) => {
        const {
            id_us,
            nombre,
            apellidos,
            telefono,
            correo,
            direccion
        } = res.data.message[0];
        
    }).catch((error) => {

    });
}

function altaUsuarios() {
    var nombre = document.getElementById('input-nombre').value;
    var apellidos = document.getElementById('input-apellidos').value;
    var telefono = document.getElementById('input-tel').value;
    var correo = document.getElementById('input-correo').value;
    var direccion = document.getElementById('input-dir').value;
    var contrasena = document.getElementById('input-pass').value;
    axios({
        method: 'post',
        url: url + '/users/altaUsuario',
        headers: headers,
        data: {
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            correo: correo,
            direccion: direccion,
            contrasena: contrasena
        }
    }).then((res) => {
        if (res.data.code === 200) {
            alert(res.data.message);
            document.getElementById('input-nombre').value = '';
            document.getElementById('input-apellidos').value = '';
            document.getElementById('input-tel').value = '';
            document.getElementById('input-correo').value = '';
            document.getElementById('input-dir').value = '';
            document.getElementById('input-pass').value = '';
        } else {
            alert(res.data.message);
        }
    }).catch((error) => {
        console.log(error);
    });
}

function modificarUsuarios() {
    axios.patch(url + 'users/modificarUsuario/' + idusuario, headers).then((res) => {

    }).catch((error) => {

    });
}

function eliminarUsuarios() {
    axios.delete(url + '/users/obtenerUsuarios/' + idusuario, headers).then((res) => {

    }).catch((error) => {

    });
}