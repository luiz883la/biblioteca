let usuario = JSON.parse(localStorage.getItem("usuario")) || {};
let conta = localStorage.getItem("conta") || "";
localStorage.setItem("conta", conta);
if (!usuario["Admin"]) {
  usuario["Admin"] = {
    nome: "Luiz",
    senha: "0509",
  };
}
localStorage.setItem("usuario", JSON.stringify(usuario));
let Numero_Usuario = localStorage.getItem("quantusuario") || 0;
localStorage.setItem("quantusuario", Numero_Usuario);
 let documento = JSON.parse(localStorage.getItem("livros")) || {};
if (!JSON.parse(localStorage.getItem("livros"))) {}
console.log(documento);
console.log(usuario);
localStorage.setItem("livros", JSON.stringify(documento));

