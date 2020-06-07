window.onload = init;

var headers = {};

function init() {
    if (sessionStorage.getItem("token")) {
        headers = {
            'Authorization': "Bearer " + sessionStorage.getItem("token")
        };
        document.getElementById('consulta').addEventListener('click', mostrarBusqueda);
        document.getElementById('alta').addEventListener('click', mostrarAlta);
        document.getElementById('salir').addEventListener('click', salir);
        document.getElementById('btn-crear').addEventListener('click', altaUsuarios);
        document.getElementById('btn-buscarUsr').addEventListener('click', buscarUsuario);
        document.getElementById('btn-editar').addEventListener('click', modificarUsuarios);
        document.getElementById('btn-eliminar').addEventListener('click', eliminarUsuarios);
        document.getElementById('btn-limpiar').addEventListener('click', limpiarDespuesDe);
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
    var nombre = document.getElementById('search-name').value;
    axios({
        method: 'get',
        url: url + '/users/obtenerUsuarios/' + nombre,
        headers: headers
    }).then((res) => {
        if (res.data.code === 200) {
            const {
                id_us,
                nombre,
                apellidos,
                telefono,
                direccion
            } = res.data.message[0];

            asignarValores(id_us, nombre, apellidos, telefono, direccion);
            deshabilitarCampos();

        } else {
            alert(res.data.message);
        }
    }).catch((error) => {
        console.log(error);
    });
}

function altaUsuarios() {
    var nombre = document.getElementById('input-nombre').value;
    var apellidos = document.getElementById('input-apellidos').value;
    var telefono = document.getElementById('input-tel').value;
    var correo = document.getElementById('input-correo').value;
    var direccion = document.getElementById('input-dir').value;
    var contrasena = document.getElementById('input-pass').value;
    //console.log(headers);
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
            limpiarDespuesDeAlta();
        } else {
            alert(res.data.message);
        }
    }).catch((error) => {
        console.log(error);
    });
}

function modificarUsuarios() {
    var id = document.getElementById('edit-id').value;
    var nombre = document.getElementById('edit-nombre').value;
    var apellido = document.getElementById('edit-apellido').value;
    var telefono = document.getElementById('edit-tel').value;
    var direccion = document.getElementById('edit-direccion').value;
    if (id) {
        axios({
            method: 'patch',
            url: url + '/users/modificarUsuario/' + id,
            headers: headers,
            data: {
                nombre: nombre,
                apellidos: apellido,
                telefono: telefono,
                direccion: direccion,
            }
        }).then((res) => {
            if (res.data.code === 200) {
                limpiarDespuesDe();
            } else {
                alert(res.data.message);
            }

        }).catch((error) => {
            console.log(error);
        });
    }
}

function eliminarUsuarios() {
    var id = document.getElementById('edit-id').value;
    if (id) {
        axios({
            method: 'delete',
            url: url + '/users/eliminarUsuario/' + id,
            headers: headers
        }).then((res) => {
            if (res.data.code === 200) {
                limpiarDespuesDe();
            } else {
                alert(res.data.message);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}

function limpiarDespuesDe() {
    document.getElementById('search-name').value = '';

    document.getElementById('edit-nombre').disabled = true;
    document.getElementById('edit-apellido').disabled = true;
    document.getElementById('edit-tel').disabled = true;
    document.getElementById('edit-direccion').disabled = true;

    document.getElementById('edit-id').value = '';
    document.getElementById('edit-nombre').value = '';
    document.getElementById('edit-apellido').value = '';
    document.getElementById('edit-tel').value = '';
    document.getElementById('edit-direccion').value = '';
}

function limpiarDespuesDeAlta() {
    document.getElementById('input-nombre').value = '';
    document.getElementById('input-apellidos').value = '';
    document.getElementById('input-tel').value = '';
    document.getElementById('input-correo').value = '';
    document.getElementById('input-dir').value = '';
    document.getElementById('input-pass').value = '';
}

function deshabilitarCampos() {
    document.getElementById('edit-nombre').disabled = false;
    document.getElementById('edit-apellido').disabled = false;
    document.getElementById('edit-tel').disabled = false;
    document.getElementById('edit-direccion').disabled = false;
}

function asignarValores(id_us, nombre, apellidos, telefono, direccion) {
    document.getElementById('edit-id').value = id_us;
    document.getElementById('edit-nombre').value = nombre;
    document.getElementById('edit-apellido').value = apellidos;
    document.getElementById('edit-tel').value = telefono;
    document.getElementById('edit-direccion').value = direccion;
}