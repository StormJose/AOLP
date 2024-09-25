'use strict'


const subNavContainer = document.querySelector(".subnavigation-container");

const playlistAccordion = document.querySelector('.aulas-playlist');
const currentClassTitle = document.querySelector(".current-aula-card-titulo");

const aulasContainer = document.querySelector(".aulas-list");
const firstCardLink = document.querySelector('.aula-card-link')
const cardLinks = document.querySelectorAll(".aula-card-link");
let currentAulaId = null


// Carregando os dados da aula selecionada

const loadVideoData = async function(videoId) {
    try {
        const URL = `http://127.0.0.1:8000/api/get_aula/${videoId}`

        const res = await fetch(URL)
        const data = await res.json()

        return data
    } catch(error) {
        console.error(error)
    }

}

const loadClassData = async function (aulaId) {
  try {
    
    let URL = `http://127.0.0.1:8000/api/aulas/${aulaId}`;
    
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    
    if (!res.ok)
      console.error({
    message: "Não foi possível acessar o conteúdo",
    status: res.status,
  });
  
  const data = await res.json()
  console.log(data)

  // Carregando informações adicionais de vídeo 
  const video = await loadVideoData(data.url_id)

  const loader = '<span class="loader"></span>';

  const markup = `
    <header class="aula--header"> 
            <a href="{% url 'cursos' %}" class="voltar-link">
                <svg class="voltar-icon"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>  
            </a>
            <div>   
                <h3 class="aula-selecionada-titulo"><span class="heading-span">Aula 1:</span> <br>${data.titulo}</h3>
            </div>
        </header>

    <iframe class="video-frame"  src="${data.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        
    <div class="aula-text-box">

        <p class="aula-selecionada-descrição">${data.descricao}</p>
        
    </div>
    <div class="aula-related-content container">
        <nav class="subnavigation-container">
            <ul class="aula-subnavigation-list">
                <li>
                    <button class="tab-btn tab-btn-active" data-tab="1">
                        <svg class="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                        </svg>


                        Sobre</button>
                </li>
                <li>
                    <button class="tab-btn" data-tab="2">
                        <svg class="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                            <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                            <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                        </svg>
                        Exercícios
                    </button>
                </li>
                <li>
                    <button class="tab-btn" data-tab="3" >
                        <svg class="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                        </svg>
                        Comentários
                    </button>
                </li>
                
            </ul>
        </nav>
        <div class="tabs-container">
            <div class="tab-content about-tab" id="tab-content-1">
                <p>${video.duracao}</p>
                <p><span>Instrutor</span>: Fulano de Tal.</p>
                <p><span>Data</span>: 23/11/2024.</p>
            </div>
            <div class="tab-content exercises-tab hidden" id="tab-content-2">

            </div>
            <div class="tab-content comments-tab hidden" id="tab-content-3">
                <div class="doubt-box">
                    <header class="doubt-header">
                        <img src="" alt="foto de perfil do usuário"/>
                        <h4 class="doubt-title">Minha dúvida</h4>
                    </header>
                    <div class="doubt-answer-content">
                        <p class="doubt-text"></p>
                        <time datetime="2024-08-29">
                            29 de Agosto, 2024
                        </time>
                    </div>
                    <ul class="doubt-answers--list">
                        <li>
                            <div class="doubt-answer-box">
                                <header class="doubt-answer-header">
                                    <img src="" alt="" />
                                    <h5 class="doubt-answer-title">Interação do instrutor</h5>
                                </header>
                                <div class="doubt-answer-content">
                                    <p class="doubt-answer-text">Resposta do instrutor...</p>
                                    <time datetime="2024-08-29">
                                        29 de Agosto, 2024
                                    </time>
                                </div>
                               {% comment %}  <ul class="co-answers--list">
                                    <li>

                                    </li>
                                </ul> {% endcomment %}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-content">

            </div>
        </div>
    </div>
  `;
  
  document.querySelector(".aula").innerHTML = loader;
  setTimeout(() => document.querySelector(".aula").innerHTML = markup, 500)


  // Renderizando a aula atual na aba de acesso rápido da playlist
  currentClassTitle.textContent = data.titulo

} catch (error) {
  console.error("Erro ao carregar aula:", error);
}
};


// Ativando a primeira quando a página carrega
const primeiraAulaId = firstCardLink.dataset.id;

firstCardLink.classList.add('aula-card-link-active')

loadClassData(primeiraAulaId)



// Selecionando uma aula para assistir
aulasContainer.addEventListener('click', async function(e) {
  e.preventDefault()
  const clicked = e.target.closest(".aula-card-link");
  
  if (!clicked) return;
  
    // Prevenindo uma nova requisição caso a aula ja esteja selecionada
    const aulaId = clicked.dataset.id;

    if (aulaId === currentAulaId) return;

    currentAulaId = aulaId

    // Renderizando novos estilos
    cardLinks.forEach((card) => card.classList.remove("aula-card-link-active"));
    clicked.classList.add("aula-card-link-active");


    // Carregando os dados da aula
    if (aulaId) {
      await loadClassData(aulaId)
      window.scrollTo({top: 0, behavior: 'smooth'})
    }

})


// Tabs: Conteúdo relacionado à aula
document.addEventListener("DOMContentLoaded", function () {
  
  console.log(aulasContainer)
  document.querySelector('body').addEventListener("click", function 
  (e) {
    
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    const clicked = e.target.closest(".tab-btn");

    if (!clicked) return;

    console.log(clicked);

    tabButtons.forEach((btn) => btn.classList.remove("tab-btn-active"));

    clicked.classList.add("tab-btn-active");

    // Mostrando conteúdo de acordo com a tab selecionada
    tabContents.forEach((tabContent) => tabContent.classList.add('hidden'))

    document.getElementById(`tab-content-${clicked.dataset.tab}`).classList.remove('hidden')
  })
});


/////  Navegação Mobile

// Accordion: Playlist

playlistAccordion.classList.remove("open--playlist")
playlistAccordion.addEventListener("click", function (e) {
  // currentTarget: Element to which the event handler is attached
  // target: The element that triggered the event (that was clicked)
  if (e.currentTarget.classList.contains("open--playlist")) e.currentTarget.classList.remove("open--playlist");
  else e.currentTarget.classList.add("open--playlist")
  
});

