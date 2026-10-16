var foto_padrao = document.querySelector('.fotos_padroes')

var usuario = JSON.parse(localStorage.getItem('usuario'))
var conta = localStorage.getItem('conta')

function init(){
    for(let c = 0;c < 10;c++){
        var foto = document.createElement('img')
        foto.src = 'fotoperfil/img' + c + '.png'
        foto.className = 'fotopadrao'
        foto.addEventListener('click', () => salvar(c))
        foto_padrao.appendChild(foto)
    }
}
function salvar(x){
    var imagem = 'fotoperfil/img' + x + '.png'
    if(conta && usuario && usuario[conta]){
        usuario[conta].img = imagem
    }
    localStorage.setItem('usuario', JSON.stringify(usuario))
    location.href = '../perfil.html'
}
init()
console.log(conta)