const corpoOP = document.querySelector('.menuOP');
const BarraPesquisa = document.querySelector('input.pesquisa');
const trespontos = document.querySelector('img.theere_lines');
const corpo = document.querySelector('.corpo');
const login = document.querySelector('.conta');
const BarraMenu = document.querySelector('.menu');
const sair_menu = document.querySelector(".sair_menu");
const foto = document.querySelector('img.foto');
const opt_comeco = document.querySelector(".start");

let conta_atual = localStorage.getItem("conta") || "";
let usuario = JSON.parse(localStorage.getItem("usuario"));
let livros = JSON.parse(localStorage.getItem('livros'));

//letiavel solta
let ident;
let check = true;
//comando de interaco
BarraPesquisa.addEventListener("input", () => {
  const termo = BarraPesquisa.value.toLowerCase().trim();
  pesquisar(termo);
});
opt_comeco.addEventListener("click", () => {
    location.href = "../publicar_documento/publicar.html"
    }
)
sair_menu.addEventListener('click', abrirMenu);
trespontos.addEventListener('click', abrirMenu);
if(conta_atual) {
    login.innerText = ""
    if(!usuario[conta_atual].img) {
        foto.src = '../midia/foto_login.png'
    }else{
        foto.src = '../perfil/mudarfotoperfil/'+usuario[conta_atual].img
    }login.appendChild(foto)
    if (usuario[conta_atual].nome.length > 4){
        for(let c = 0;c <= 4;c++){
            login.innerHTML += `${usuario[conta_atual].nome[c]}`
        }login.innerHTML += `...`
    }else{
    login.innerHTML += `${usuario[conta_atual].nome}`
    }login.addEventListener('click', perfil);
}else {
    login.addEventListener('click', cadastrar);
}
function init(){
    if(Object.keys(livros).length > 0){
        corpoOP.removeChild(opt_comeco);
    }
    
    for (let c = 0;livros[c] ;c++) {
        let opcao = document.createElement('div');
        let textotitulo = document.createElement("p");
        let textocomando = document.createElement("p");
        let textodica = document.createElement("p");
        let acessaropcao = document.createElement('img')
        textotitulo.innerText = livros[c].titulo;
        textocomando.innerText = livros[c].comando;
        textodica.innerText = 'Clique aqui para acessar!';

        textotitulo.className = 'tituloOP';
        textocomando.className = 'comando';
        textodica.className = 'dica';
        opcao.className = 'opt';
        acessaropcao.className = 'acessar';
        
        opcao.style.gap = "20px";
        opcao.id = `${c}`;
        opcao.addEventListener('click', () => entrar(opcao.id));
        acessaropcao.src = '../midia/acessar.png';
        opcao.appendChild(textotitulo);
        opcao.appendChild(textodica);
        opcao.appendChild(acessaropcao)
        corpoOP.appendChild(opcao);
    }
    
}
function entrar(x){
        ident = x;
        localStorage.removeItem('titulo');
        localStorage.removeItem('autor');
        localStorage.removeItem('explicacao');
        localStorage.removeItem('exemplo');
        localStorage.setItem('livro', JSON.stringify(livros[ident]));
        localStorage.setItem("identificador", ident)
        //localStorage.setItem('exemplosim', livros[ident].exemplosim);
        //localStorage.setItem('autor', livros[ident].autor);
        //localStorage.setItem('texto', livros[ident].texto);
        //localStorage.setItem('exemplo', livros[ident].exemplo);
        //localStorage.setItem('data', livros[ident].data);
        //localStorage.setItem("conta_atual", livros[ident].conta);
        window.location.href = '../menu_item/pag_suporte.html';
}
function pesquisar(termo){
    corpoOP.innerHTML = ""
    let chavefiltrada = Object.keys(livros).filter((chave) => {
        let textoitem = livros[chave].titulo.toLowerCase();
        console.log(textoitem)
        return textoitem.includes(termo);
    })
    chavefiltrada.forEach((c) => {
        let opcao = document.createElement('div');
        let textotitulo = document.createElement("p");
        let textocomando = document.createElement("p");
        let textodica = document.createElement("p");
        let acessaropcao = document.createElement('img')
        textotitulo.innerText = livros[c].titulo;
        textocomando.innerText = livros[c].comando;
        textodica.innerText = 'Clique aqui para acessar!';

        textotitulo.className = 'tituloOP';
        textocomando.className = 'comando';
        textodica.className = 'dica';
        opcao.className = 'opt';
        acessaropcao.className = 'acessar';
        
        opcao.style.gap = "20px";
        opcao.id = `${c}`;
        opcao.addEventListener('click', () => entrar(opcao.id));
        acessaropcao.src = '../midia/acessar.png';
        opcao.appendChild(textotitulo);
        opcao.appendChild(textodica);
        opcao.appendChild(acessaropcao)
        corpoOP.appendChild(opcao);
    })
}
function abrirMenu(){
    if(check){
        BarraMenu.style.display = "block"
        check = false
    }
    else{BarraMenu.style.display = "none"
        check = true
    }
}
function cadastrar(){
    window.location.href = "../cadastro/login/logar.html";
}
function perfil(){
    location.href = '../perfil/perfil.html'
}
console.log(livros)
init();
