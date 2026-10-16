var button = document.querySelector('input.button');
var inputnome = document.querySelector('input.nome');
var inputsenha = document.querySelector('input.senha');
var aviso_nome = document.querySelector('p.alerta_nome');
var aviso_senha = document.querySelector('p.alerta_senha');
button.addEventListener('click', logar);
var conta = '';
var usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

if (!usuario.Admin) {
    usuario.Admin = { nome: "Luiz", senha: "0509" };
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

function letraMaiuscula() {
    if (inputnome.value.length == 1) {
        let texto = inputnome.value;
        inputnome.value = texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }
}

function logar() {
    var nome = inputnome.value.trim();
    var senha = inputsenha.value.trim();

    if (!nome || !senha) {
        alert('prencha os campos abaixo!');
        return;
    }

    var encontrar = false;
    for (var chave in usuario) {
        var dados = usuario[chave];
        if (!dados) continue;

        if (dados.nome && dados.senha && dados.nome.toLowerCase() === nome.toLowerCase() && dados.senha === senha) {
            conta = chave;
            localStorage.setItem("conta", conta);
            encontrar = true;
            window.location.href = '../../menu_principal/menu.html';
            return;
        }
    }

    if (!encontrar) {
        alert("Usuário ou senha incorretos.");
    }
}