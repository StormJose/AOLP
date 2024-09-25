'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const estacaoLinksContainer = document.querySelector('.estacoes-lista');
  const estacaoLinks = document.querySelectorAll('.estacao-link')



  estacaoLinksContainer.addEventListener('click', async function(e) {
    e.preventDefault()

    const clicked = e.target.closest('.estacao-link')

    const estacaoId = clicked.dataset.id
    let url = "http://127.0.0.1:8000/cursos";

    if (estacaoId) {
      url+=`/${estacaoId}`
    }

    try {

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
    
      if (!res.ok) console.error({message: 'Não foi possível acessar o conteúdo', status: res.status})

        // A resposta é o próprio template ao invés de um objeto JSON
        const markup = await res.text()
        document.querySelector(".courses").innerHTML = markup;

    } catch(error) {
      console.error("Erro ao carregar os cursos:", error);
    }


    estacaoLinks.forEach((link) => link.classList.remove('estacao-link-active'))

    clicked.classList.add('estacao-link-active')

  })
});

