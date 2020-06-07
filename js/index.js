window.onload = init;
function init(){
    document.getElementById('btn-login').addEventListener('click',login);
}
function login(){
    var mail = document.getElementById('correo').value;
    var password = document.getElementById('pass').value;

    axios({
        method:'post',
        url:url+'/login/',
        data:{
            correo: mail,
            contrasena:password
        }
    }).then((res)=>{
        if (res.data.code === 200) {
            alert("Inicio exitoso");
            sessionStorage.setItem("token",res.data.message);
            window.location.href = "./app/main.html";
        }else{
            alert("Datos incorrectos");
        }
    }).catch((error)=>{
        console.log(error);
    });
}