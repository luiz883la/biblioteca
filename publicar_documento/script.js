const menu_inc = document.querySelector(".pagina");
const menu_tutorial = document.querySelector(".tutorial");
const menu_edicao = document.querySelector(".modoedicao");
const tres_pontos = document.querySelector(".menubar");
const sidebar = document.querySelector(".Barra_lateral");
//page texto
const button_texto = document.querySelector(".button_texto");
const button_negrito = document.querySelector(".negrito");
const button_salvar = document.querySelector(".salvar");
const menu_text = document.querySelector(".page_text");
const texto_area = document.querySelector(".texto");
const cores = document.querySelector(".cores");
// page cre
const button_create = document.querySelector(".button_criacao");
const menu_cre = document.querySelector(".page_cre");
const checkpri = document.querySelector("#pri");
const checkpub = document.querySelector("#pub");
const input_titulo = document.querySelector("#titulo");
const input_autor = document.querySelector("#autor");
const aviso = document.querySelector(".aviso");
const button_cont = document.querySelector(".concluir");
const permitir_exemplos = document.querySelector("#vaiterexemplo");
//page cor
const menu_cor = document.querySelector(".page_cor");
const button_cor = document.querySelector(".button_cor");
const button_aplicar = document.querySelector(".aplicar");
const ilustracao = document.querySelector(".ilustration");

const cabeca = document.querySelector(".cabeca");
const colorcabeca = document.querySelector(".colorcabeca");

const colortext = document.querySelector(".colortexto");
const texto = document.querySelector(".corpo");

const exemplo_ilu = document.querySelector("#exemplo");
const colorexemplo = document.querySelector(".colorexemplo");
const textoexemplo = document.querySelector(".textoexemplo_emcima");
//page exemplos
const button_exemplo = document.querySelector(".button_exemplo");
const menu_exemplo = document.querySelector(".page_exemplo");

const exemplo_negrito = document.querySelector(".negrito_exem");
const salvar_exemplo = document.querySelector(".salvar_exem");
const cores_exem = document.querySelector(".cores_exem");
const campoTexto = document.querySelector(".exemplo");

let livro = JSON.parse(localStorage.getItem("livro")) || {};
let verificacao = localStorage.getItem("aviso") || false;

let passos = 0;
let data;
let status_exem = false;
let status_doc = "privado";
let documento = JSON.parse(localStorage.getItem("livros"));
let ident = localStorage.getItem("identificador");
let conta = localStorage.getItem("conta");
let usuario = JSON.parse(localStorage.getItem("usuario"));
//page cre
button_create.addEventListener("click", page_cre);
input_autor.addEventListener("keydown", letraMaiuscula);
input_titulo.addEventListener("keydown", letraMaiuscula);
checkpri.addEventListener("click", selecionou);
checkpub.addEventListener("click", selecionou);
button_cont.addEventListener("click", concluir_criacao);
tres_pontos.addEventListener("click", menu);
//page cor
colorcabeca.addEventListener("change", mudarButton);
colorexemplo.addEventListener("change", mudarButton);
colortext.addEventListener("change", mudarButton);
button_aplicar.addEventListener("click", aplicarCor);
button_cor.addEventListener("click", page_cor);
//page text
button_negrito.addEventListener("click", negrito);
button_salvar.addEventListener("click", salvar_texto);
button_texto.addEventListener("click", page_texto);
//page exemplos
button_exemplo.addEventListener("click", page_Exem);
salvar_exemplo.addEventListener("click", salvar_exem);
cores_exem.addEventListener("input", (event) => {
  const corSelecionada = event.target.value;
  document.execCommand("foreColor", false, corSelecionada);
});
cores.addEventListener("input", (event) => {
  const corSelecionada = event.target.value;
  document.execCommand("foreColor", false, corSelecionada);
});

menu_inc.removeChild(menu_cor);
menu_inc.removeChild(menu_cre);
menu_inc.removeChild(menu_text);
menu_inc.removeChild(menu_exemplo);
menu_inc.removeChild(menu_edicao);
if (verificacao == "false" || verificacao == false) {
  for (let c = 0; documento[c]; c++) {
    passos = c + 1;
  }
  documento[passos] = {};
  documento[passos].concluido = [];
  data = new Date();
  data = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
  documento[passos].data = data;
} else {
  documento[ident].concluido = [];
}

let p = 0;
function menu() {
  if (p == 0) {
    Object.assign(sidebar.style, {
      display: "block",
    });
    p = 1;
  } else {
    Object.assign(sidebar.style, {
      display: "none",
    });
    p = 0;
  }
}
function init() {
  if (verificacao == true) {
    menu_inc.removeChild(menu_tutorial);
    menu_inc.appendChild(menu_edicao);
    //page cre
    input_autor.value = livro.autor;
    input_titulo.value = livro.titulo;
    if (livro.exemplosim) {
      permitir_exemplos.checked = true;
      status_exem = true;
    }
    if (!status_doc == "privado") {
      checkpub.checked = true;
    }
    if (livro.texto) {
      texto_area.innerHTML = livro.texto;
    }
  }
}

function page_Exem() {
  if (window.innerWidth < 768) {
  sidebar.style.display = "none";
  }
  menu_inc.innerHTML = "";
  if (verificacao == "false" || verificacao == false) {
    if (status_exem == true) {
      menu_inc.appendChild(menu_exemplo);
    } else {
      menu_inc.innerHTML =
        "Os exemplos estao desativado, se quiser por exemplos crique em Criacao na barra lateral!";
    }
  } else {
    menu_inc.appendChild(menu_exemplo);
    campoTexto.innerHTML = livro.exemplo;
  }
}

function page_cre() {
  if (window.innerWidth < 768) {
    sidebar.style.display = "none";
  }
  menu_inc.innerHTML = "";
  menu_inc.appendChild(menu_cre);
}

function page_cor() {
  if (window.innerWidth < 768) {
    sidebar.style.display = "none";
  }
  menu_inc.innerHTML = "";
  menu_inc.appendChild(menu_cor);
  if (verificacao == "false" || verificacao == false) {
    if (
      documento[passos].exemplosim == false ||
      !documento[passos].exemplosim
    ) {
      exemplo_ilu.remove();
      colorexemplo.remove();
      textoexemplo.remove();
    } else {
      ilustracao.appendChild(exemplo_ilu);
      menu_cor.appendChild(textoexemplo);
      menu_cor.appendChild(colorexemplo);
    }
  } else {
    console.log(livro.cor_cabeca);
    colorexemplo.value = livro.cor_exemplo;
    colortext.value = livro.cor_texto;
    colorcabeca.value = livro.cor_cabeca;

    cabeca.style.background = colorcabeca.value;
    texto.style.background = colortext.value;
    exemplo_ilu.style.background = colorexemplo.value;
  }
}

function page_texto() {
  if (window.innerWidth < 768) {
  sidebar.style.display = "none";
  }
  menu_inc.innerHTML = "";
  menu_inc.appendChild(menu_text);
  texto_area.focus();
}
function selecionou(evento) {
  if (evento.target === checkpri) {
    checkpub.checked = false;
    aviso.innerHTML = "";
    status_doc = "privado";
  } else {
    checkpri.checked = false;
    aviso.innerHTML =
      "Atencao: a opcao publica nao esta funcionando, estamos resolvendo o mais rapido possivel!";
    status_doc = "publico";
    aviso.scrollIntoView({ behavior: "smooth" });
  }
}

function concluir_criacao() {
  if (permitir_exemplos.checked) {
    status_exem = true;
  } else {
    status_exem = false;
  }
  if (verificacao == "false" || verificacao == false) {
    if (documento[passos].concluido.length == 4) {
      salvar_doc();
    }
    if (input_autor.value.trim() == "" || input_titulo.value.trim() == "") {
      aviso.innerHTML =
        '<b style="color: red;">Preencha Corretamento os campos!</b>';
      aviso.scrollIntoView({ behavior: "smooth" });
      return;
    }
    documento[passos].titulo = input_titulo.value;
    documento[passos].autor = input_autor.value;
    documento[passos].exemplosim = status_exem;
    documento[passos].status_doc = status_doc;
    documento[passos].concluido.push("criacao");
  } else {
    documento[ident].titulo = input_titulo.value;
    documento[ident].autor = input_autor.value;
    documento[ident].exemplosim = status_exem;
    documento[ident].status_doc = status_doc;
    documento[ident].concluido.push("criacao");
    if (documento[ident].concluido.length == 4) {
      salvar_doc();
    }
  }
  page_texto();
}

function letraMaiuscula() {
  if (this.value.length == 1) {
    let autor = this.value;
    this.value = autor.charAt(0).toUpperCase() + autor.slice(1).toLowerCase();
  }
}



function aplicarCor() {
  if (verificacao == "false" || verificacao == false) {
    if (button_aplicar.value == "Continuar") {
      documento[passos].cor_cabeca = colorcabeca.value;
      documento[passos].cor_texto = colortext.value;
      documento[passos].cor_exemplo = colorexemplo.value;
      documento[passos].concluido.push("cor");
      page_Exem();
    }
    if (status_exem == true) {
      if (documento[passos].concluido.length == 4) {
        salvar_doc();
      }
    } else if (documento[passos].concluido.length == 3) {
      salvar_doc();
    }
  } else {
    if (button_aplicar.value == "Continuar") {
      documento[ident].cor_cabeca = colorcabeca.value;
      documento[ident].cor_texto = colortext.value;
      documento[ident].cor_exemplo = colorexemplo.value;
      documento[ident].concluido.push("cor");
      page_Exem();
    }
    if (status_exem == true) {
      if (documento[ident].concluido.length == 4) {
        salvar_doc();
      }
    } else if (documento[ident].concluido.length == 3) {
      salvar_doc();
    }
  }
  cabeca.style.background = colorcabeca.value;
  texto.style.background = colortext.value;
  exemplo_ilu.style.background = colorexemplo.value;
  button_aplicar.value = "Continuar";
}

function mudarButton() {
  button_aplicar.value = "Aplicar";
}


function negrito() {
  irParaOFinal(texto_area);
  document.execCommand("bold", false, null);
}

function irParaOFinal(elemento) {
  // 1. Cria um "alcance" (Range)
  const range = document.createRange();
  // 2. Seleciona todo o conteúdo dentro do elemento
  range.selectNodeContents(elemento);
  // 3. Colapsa (encolhe) o alcance para o final (false = final)
  range.collapse(false);

  // 4. Pega a seleção atual da tela
  const selecao = window.getSelection();
  // 5. Limpa seleções anteriores
  selecao.removeAllRanges();
  // 6. Aplica a nova posição do cursor
  selecao.addRange(range);

  // Garante que a div receba o foco de digitação
  elemento.focus();
}

function salvar_texto() {
  if (verificacao == "false" || verificacao == false) {
    documento[passos].texto = texto_area.innerHTML;
    documento[passos].concluido.push("texto");
    if (status_exem == true) {
      if (documento[passos].concluido.length == 4) {
        salvar_doc();
      }
    } else {
      if (documento[passos].concluido.length == 3) {
        salvar_doc();
      }
    }
  } else {
    documento[ident].texto = texto_area.innerHTML;
    documento[ident].concluido.push("texto");
    if (status_exem == true) {
      if (documento[ident].concluido.length == 4) {
        salvar_doc();
      }
    } else {
      if (documento[ident].concluido.length == 3) {
        salvar_doc();
      }
    }
  }
  page_cor();
}



function salvar_exem() {
  if (verificacao == "false" || verificacao == false) {
    documento[passos].exemplo = campoTexto.innerHTML;
    documento[passos].concluido.push("exemplo");
    if (status_exem == true) {
      if (documento[passos].concluido.length == 4) {
        salvar_doc();
      }
    } else {
      if (documento[passos].concluido.length == 3) {
        salvar_doc();
      }
    }
  } else {
    documento[ident].exemplo = campoTexto.innerHTML;
    documento[ident].concluido.push("exemplo");
    if (status_exem == true) {
      if (documento[ident].concluido.length >= 4) {
        salvar_doc();
      }
    } else {
      if (documento[ident].concluido.length >= 3) {
        salvar_doc();
      }
    }
  }
}

function salvar_doc() {
  if (verificacao == "false" || verificacao == false) {
    delete documento[passos].concluido;
    documento[passos].conta = conta;
    localStorage.setItem("livros", JSON.stringify(documento));
    location.href = "../menu_principal/menu.html";
  } else {
    documento[ident].titulo = input_titulo.value;
    documento[ident].autor = input_autor.value;
    documento[ident].exemplo = campoTexto.innerHTML;
    documento[ident].exemplosim = status_exem;
    documento[ident].status_doc = status_doc;
    documento[ident].concluido.push("criacao");
    localStorage.setItem("livros", JSON.stringify(documento));
    localStorage.setItem("aviso", false);
    location.href = "../menu_principal/menu.html";
  }
}
init();
