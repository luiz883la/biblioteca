var button = document.querySelector('input.button')
var inputnome = document.querySelector('input.nome')
var inputsenha = document.querySelector('input.senha')
button.addEventListener('click', cadastrar)
var usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
var Numero_Usuario = Number(localStorage.getItem("quantusuario") || 0)
var aviso_nome = document.querySelector('p.alerta_nome')
var aviso_senha = document.querySelector('p.alerta_senha')

if (!usuario.Admin) {
    usuario.Admin = { nome: "Luiz", senha: "0509" }
    localStorage.setItem('usuario', JSON.stringify(usuario))
}

function letraMaiuscula(){
    if(inputnome.value.length == 2){
        let texto = inputnome.value;
        inputnome.value = texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }
}
function cadastrar(){
    var nome = inputnome.value.trim()
    var senha = inputsenha.value.trim()

    if(nome !== '' && senha !== ''){
        for (var chave in usuario) {
            var user = usuario[chave]
            if (user && user.nome && user.nome.toLowerCase() === nome.toLowerCase()) {
                aviso_nome.innerHTML = "Este nome já está em uso.";
                return;
            }
            if (user && user.senha === senha) {
                aviso_senha.innerHTML = "Esta conta já existe.";
                return;
            }
        }

        var chave = "user" + Numero_Usuario
        usuario[chave] = {
            nome: nome,
            senha: senha
        }
        Numero_Usuario++
        localStorage.setItem("usuario", JSON.stringify(usuario))
        localStorage.setItem("quantusuario", String(Numero_Usuario))
        window.location.href = '../login/logar.html'
    }else{
        alert("preencha os campos abaixos")
    }
}