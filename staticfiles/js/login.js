const form = document.getElementById('form');
const campos = document.querySelectorAll(".inputs");
const email = document.getElementById("email");
const senha = document.getElementById("senha")
const labelMensagemErro = document.querySelectorAll(".mensagem--erro");
const formBtn = document.getElementById("botao-cadastro");
const spinner = document.querySelector(".spinner");


form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validar()) {
          form.submit()  
        }
  });
        


function validar() {
  let mensagem;
  let isValid = true;

  spinner.classList.add("outer-ring");
  
  campos.forEach((campo) => {
    if (campo.value === "") {
      mensagem = `${campo.getAttribute("id")} deve ser preenchido`;
      setErrorMessage(campo, mensagem);
      isValid = false;
    } else {
      removeErrorMessage(campo);
    }
  });


  if (!isValid) {
    spinner.classList.remove("outer-ring");
    return false;
  }

  return true;
}


function setErrorMessage(campo, mensagem) {
  console.log("erro em:", campo.getAttribute("id"));

  spinner.classList.remove("outer-ring");
  campo.style.border = "red";
  campo.style.border = "red 1px solid";

  let labelError = campo.nextElementSibling;
  labelError.textContent = mensagem;
}

function removeErrorMessage(campo) {
  campo.style.background = "white";
  campo.style.border = "1.55px solid #222";

  let labelError = campo.nextElementSibling;
  labelError.textContent = " ";
}


