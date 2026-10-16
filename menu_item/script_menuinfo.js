let livros = JSON.parse(localStorage.getItem("livros"));
let conta = localStorage.getItem("conta");
let livro = JSON.parse(localStorage.getItem('livro'));
let vaiterexemplo = livro.exemplosim
let conta_atual = localStorage.getItem("conta_atual");
let identificador = localStorage.getItem("identificador")
let autor = livro.autor;
let titulo = livro.titulo;
let texto = livro.texto;
let exemplo = livro.exemplo;
let data = livro.data;
const cabeca = document.querySelector('div.cabeca');
const corpo = document.querySelector('div.corpo');

const textotitulo = document.querySelector('h1.nome');
const textocomando = document.querySelector('p.comando');
const textoexplicacao = document.querySelector('p.texto');
const textoexemplo = document.querySelector("p.exemplo");
const campoexemplo = document.querySelector("#exemplo");
const voltar = document.querySelector(".img")

const botao_tres_pontos = document.querySelector(".botao_3p");
const img_tres_pontos = document.querySelector(".tres_pontos");
const menu_3p = document.querySelector(".menu");
const sair_menu = document.querySelector(".sair_menu");
const button_deletar = document.querySelector(".deletar_doc");
const button_editar = document.querySelector(".editar_doc");
console.log(livro);
function init(){
    cabeca.removeChild(menu_3p);
    if(livro.cor_cabeca){
        cabeca.style.background = livro.cor_cabeca;
    }if(livro.cor_texto){
        corpo.style.background = livro.cor_texto
    }if(livro.cor_exemplo){
        document.querySelector("#exemplo").style.background = livro.cor_exemplo
    }
    let cor = converterParaRGB(livro.cor_texto).match(/\d+/g);
    let brilho = (cor[0] * 299 + cor[1] * 587 + cor[2] * 114) / 1000;

    if (brilho > 128) {
        textoexplicacao.style.color = 'black';
    } else {
        textoexplicacao.style.color = 'white';
    }
    cor = converterParaRGB(livro.cor_cabeca).match(/\d+/g);
    brilho = (cor[0] * 299 + cor[1] * 587 + cor[2] * 114) / 1000;

    if (brilho > 128) {
        cabeca.style.color = 'black';
    } else {
        textocomando.style.color = 'white';
        textotitulo.style.color = 'white';
        voltar.style.background = '#ffffff59'
        img_tres_pontos.style.background = '#ffffff59'
    }

    cor = converterParaRGB(livro.cor_exemplo).match(/\d+/g);
    brilho = (cor[0] * 299 + cor[1] * 587 + cor[2] * 114) / 1000;
    if (brilho > 128) {
        textoexemplo.style.color = 'rgb(0,0,0)';
    } else{
        textoexemplo.style.color = '#ffffff';
    }
    
    textotitulo.innerHTML = titulo
    textocomando.innerHTML = 'Autor: ' + autor + ' | ' + data
    textoexplicacao.innerHTML = texto
    if(vaiterexemplo == true){textoexemplo.innerHTML = exemplo + '<br><br>'}
    else{
        campoexemplo.remove();
    }if(!conta_atual == conta || !conta){
        cabeca.removeChild(botao_tres_pontos);
    }else{
        botao_tres_pontos.addEventListener("click", menu);
        sair_menu.addEventListener("click", () => {
            cabeca.removeChild(menu_3p);
        })
        button_deletar.addEventListener("click", deletar);
        button_editar.addEventListener("click", editar);

    }

    
}

function menu(){
    cabeca.appendChild(menu_3p);
}

function deletar(){
    let deletar = confirm("Voce tem certeza que quer deletar seu arquivo permanentemente?");
    if (deletar){
        delete livros[identificador];
        localStorage.setItem("livros", JSON.stringify(livros));
        location.href = '../menu_principal/menu.html'
    }
}

function converterParaRGB(cor) {
    let div = document.createElement("div");
    div.style.color = cor;
    document.body.appendChild(div);
    let corRGB = window.getComputedStyle(div).color;
    
    // Remove o elemento temporário
    document.body.removeChild(div);
    
    return corRGB;
}

function editar(){
    let aviso = true
    localStorage.setItem("aviso", Boolean(aviso))
    location.href ='../publicar_documento/publicar.html'
}
init()