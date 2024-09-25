'use strict'


const subNavContainer = document.querySelector(".subnavigation-container");

const playlistAccordion = document.querySelector('.aulas-playlist');
const currentClassTitle = document.querySelector(".current-aula-card-titulo");
const currentClassLabel = document.querySelector('.current-aula span')
const playList = document.querySelector('.aulas-list[aria-label]')
const progressLabel = document.querySelector('.progress--label')

// sidebar

const sidebarList = document.querySelector(".aulas-sidebar--list");
const sidebarBtns = document.querySelectorAll(".sidebar-btn");
const tabContents = document.querySelectorAll(".tab-content");



const firstCardLink = document.querySelector('.aula-card-link')
const cardLinks = document.querySelectorAll(".aula-card-link");
let currentAulaId = null


//////////////////////////////////////////////////////////////////////


let state = {
    currentVideo: null, 
    progress: 0,
    classesAmount: null,
    seenClasses: null
}


// Monitorar o progresso do vídeo
const handleCourseProgress = function(currentClass) {

  //// Calculando o progresso atual (Provisório)

  // 1. Obtendo os nós filhos do elemento 'playlist' e
  // convertendo de NodeList para Array
  const courseClasses = Array.from(playList.childNodes);

  // 2. Filtrando a quantidade de aulas: Filtrando os elementos 'li' do array
  const classesAmount = courseClasses.filter(
    (node) => node.tagName === "LI"
  ).length;


  //// Renderizando o progresso atual na UI
  const progressBar = document.getElementById("curso--progress");

  const progress = (currentClass / classesAmount) * 100;

  progressBar?.setAttribute("value", progress);
  progressLabel.textContent = progress + "%"

  return progress + "%";
}



 // Cria um novo YouTube player
const onYouTubeIframeAPIReady = function (videoId) {
    player = new YT.Player("player", {
        height: "360",
        width: "640",
        videoId, // Replace with your video ID
        events: {
           'onReady': onPlayerReady,
           'onStateChange': onPlayerStateChange,
        },
    });
   console.log(player)
}

 // Obtem a duração do vídeo
const onPlayerReady = function (e) {
//    videoDuration = e.target.getDuration(); 
//    console.log(videoDuration)
       console.log("Player is ready:", event.target);
       if (e.target && typeof e.target.getDuration === "function") {
         const duration = e.target.getDuration();
         console.log("Video duration:", duration);
       } else {
         console.error(
           "Player instance or getDuration method is not available."
         );
       }

}


let progressInterval
function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING) {
    if (progressInterval) clearInterval(progressInterval)
     checkProgress();
   }
 }


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


let player;
let videoDuration;

// Carrega os dados da aula
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

  state.currentVideo = data.url_id

  // Carregando informações adicionais de vídeo 
  const video = await loadVideoData(state.currentVideo)

  const loader = '<span class="loader"></span>';

  const markup = `
        <div id="player" class="video-frame-wrapper">
            <iframe  class="video-frame"  src="${data.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>        
            
        <div class="aula-text-box">
            <h3 class="aula-selecionada-titulo">
                <span class="heading-span">Aula 1:</span> <br>${data.titulo}
            </h3>

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
                
            </ul>
        </nav>
        <div class="tabs-container">
            <div class="tab-content about-tab">
                <p>${video.duracao}</p>
                <p><span>Instrutor</span>: Fulano de Tal.</p>
                <p><span>Data</span>: 23/11/2024.</p>
            </div>
         
         
            <div class="tab-content">

            </div>
        </div>
    </div>
  `;
  
    document.querySelector(".aula").innerHTML = loader;
    setTimeout(() =>{
        document.querySelector(".aula").innerHTML = markup, 500
    
    })
    


    // Renderizando a aula atual na aba de acesso rápido da playlist
    currentClassTitle.textContent = data.titulo

    // Inicializando a lógica de atualização de progresso
    console.log(data.url_id)

    onYouTubeIframeAPIReady(state.currentVideo)
  
} catch (error) {
    console.error("Erro ao carregar aula:", error);
}
};


 // Checa o quanto do vídeo foi assistido
function checkProgress() {
  
   const progressCheck = setInterval(() => {
     let currentTime = player.getCurrentTime();
     let percentageWatched = (currentTime / videoDuration) * 100;

     console.log("Percentage Watched:", percentageWatched);

     if (percentageWatched >= 90) {
       markClassAsSeen();
       clearInterval(progressCheck)
       console.log('checked')
     }
   }, 5000); 
 }

 // Marca como Visto
 function markClassAsSeen() {
   console.log("Class marked as seen");
    state.seenClasses++
    handleCourseProgress(state.seenClasses)
    console.log(state.seenClasses)
 }


// Ativando a primeira quando a página carrega
const primeiraAulaId = firstCardLink.dataset.id;

state.currentVideo = primeiraAulaId

firstCardLink.classList.add('aula-card-link-active')

loadClassData(state.currentVideo)



// Selecionando uma aula para assistir
playList.addEventListener('click', async function(e) {
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
  document.querySelector('body').addEventListener("click", function 
  (e) {
  
    const clicked = e.target.closest(".sidebar-btn");

    if (!clicked) return;

    console.log(clicked);

    sidebarBtns.forEach((btn) => btn.classList.remove("sidebar-btn--active"));

    clicked.classList.add("sidebar-btn--active");


    tabContents.forEach((tabContent) => tabContent.classList.add('hidden'))
    
    // Mostrando conteúdo de acordo com a tab selecionada
    document.getElementById(`tab-content-${clicked.dataset.tab}`).classList.remove('hidden')
    console.log(document.getElementById(`tab-content-${clicked.dataset.tab}`))
  })
});


/////  Navegação Mobile

// Accordion: Playlist
const media = window.matchMedia("(min-width: 1024px)");

playlistAccordion.classList.remove("open--playlist")
playlistAccordion.addEventListener("click", function (e) {
  // currentTarget: Element to which the event handler is attached
  // target: The element that triggered the event (that was clicked)
  if (e.currentTarget.classList.contains("open--playlist")) e.currentTarget.classList.remove("open--playlist");
  else e.currentTarget.classList.add("open--playlist")
  handleMediaChange(media)
  
});


// Isso garante que o menu de playlist esteja ativo
const handleMediaChange = function (media) {
  // Em desktop, navegação sempre ativa.
  if (media.matches) {
      playlistAccordion.classList.add("open--playlist");
      currentClassLabel.textContent = 'Lista de reprodução'
    } else {
        currentClassLabel.textContent = 'Em reprodução'
    }
};

// Checagem inicial do tamanho da viewport
handleMediaChange(media)

// Reagir a mudança de viewport e garantir que o accordion da playlist permaneça aberto
window.addEventListener('resize', () => handleMediaQueryChange(mediaQuery))





