const nomeConta = document.querySelector(".nomeconta");
const nomeConta2 = document.querySelector(".conta2");
const sair = document.querySelector("input.buttonsair");
const deletar = document.querySelector("input.buttondeletar");
const publicar = document.querySelector("input.buttonpublic");
const menufoto = document.querySelector('div.visualizarfotoperfil');
const foto = document.querySelector('img.foto');
const perfil = document.querySelector('img.fotoconta');
const voltar = document.querySelector('img.voltarperfil');
perfil.addEventListener("click", abrirmenufotos);
voltar.addEventListener("click", abrirmenufotos);
sair.addEventListener("click", sairconta);
deletar.addEventListener("click", deletarconta);
publicar.addEventListener("click", () => {location.href = "../publicar_documento/publicar.html"});
let abriumenufoto = true
let conta = localStorage.getItem("conta")
let usuario = JSON.parse(localStorage.getItem("usuario") || "{}")
let usuarioAtual = conta && usuario[conta] ? usuario[conta] : null

if (nomeConta) {
    nomeConta.innerHTML = conta ? `conta: ${conta}` : 'conta: (nenhuma)'
}
if (nomeConta2) {
    nomeConta2.innerHTML = usuarioAtual && usuarioAtual.nome ? `Usuario: ${usuarioAtual.nome}` : 'Usuario: visitante'
}

function sairconta() {
    let conta = ''
    localStorage.setItem("conta", conta)
    location.href = '../menu_principal/menu.html'
}
function init() {
    if (menufoto && menufoto.parentNode) {
        document.body.removeChild(menufoto)
    }

    if (usuarioAtual && usuarioAtual.img) {
        foto.src = 'mudarfotoperfil/' + usuarioAtual.img
        perfil.src = 'mudarfotoperfil/' + usuarioAtual.img
    } else {
        foto.src = '../midia/foto_login.png'
        perfil.src = '../midia/foto_login.png'
    }
}
function deletarconta() {
    let Numero_Usuario = localStorage.getItem("quantusuario")
    let conta = localStorage.getItem("conta")
    let usuario = JSON.parse(localStorage.getItem("usuario") || "{}")

    if (conta == 'Admin') {
        alert('Voce nao pode deletar uma conta admin')
        return
    }

    let verificacao = prompt("Voce tem certeza que quer deletar sua conta? (Responda com 'Sim' ou 'Nao')")
    if (verificacao == 'sim') {
        delete usuario[conta]
        Numero_Usuario--

        let conta = ''
        localStorage.setItem('quantusuario', Numero_Usuario)
        localStorage.setItem('conta', conta)
        localStorage.setItem('usuario', JSON.stringify(usuario))
        location.href = '../menu_principal/menu.html'
    } else {
        return
    }
}
function abrirmenufotos() {
    if (abriumenufoto) {
        document.body.appendChild(menufoto)
        abriumenufoto = false
    } else {
        document.body.removeChild(menufoto)
        abriumenufoto = true
    }
}
init()