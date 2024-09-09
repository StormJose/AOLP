'use strict'


const subNavContainer = document.querySelector(".subnavigation-container");

const playlistAccordion = document.querySelector('.aulas-playlist');
const currentClassTitle = document.querySelector(".current-aula-card-titulo");
const currentClassLabel = document.querySelector('.current-aula span')
const playList = document.querySelector('.aulas-list[aria-label]')
const progressLabel = document.querySelector('.progress--label')

//// sidebar

const sidebarList = document.querySelector(".aulas-sidebar--list");
const sidebarBtns = document.querySelectorAll(".sidebar-btn");
const tabContents = document.querySelectorAll(".tab-content");
// comentários
const formCreateComment = document.querySelector(".create-comment-form");
const inputDoubt = document.querySelector(".input--create-comment");
const btnSendDoubt = document.querySelector(".btn--send-comment");
const commentAnswersList = document.querySelector('.comment-answers--list')

// Cards de playlist
const firstCardLink = document.querySelector('.playlist-card-link')
const cardLinks = document.querySelectorAll(".playlist-card-link");
let currentAulaId = null


//////////////////////////////////////////////////////////////////////


// Estado inicial 
let state = {
  progress: 0,
  currentClass: null, 
  classesAmount: null,
  seenClasses: null
}



// Funções úteis

//format
// 2024-09-03T12:34:56Z



// Provisório
const getCurrentDate = () => {
   return new Intl.DateTimeFormat("pt", {
     day: "numeric",
     month: "short",
     year: "numeric",
   }).format(new Date())

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
// const loadClassData = async function (aulaId) {
//   try {
    
//     let URL = `http://127.0.0.1:8000/api/aulas/${aulaId}`;
    
//     const res = await fetch(URL, {
//       method: "GET",
//       headers: {
//         "X-Requested-With": "XMLHttpRequest",
//       },
//     });
    
//     if (!res.ok)
//       console.error({
//     message: "Não foi possível acessar o conteúdo",
//     status: res.status,
//   });
  
//   const data = await res.json()
//   console.log(data)

//   state.currentVideo = data.url_id

//   // Carregando informações adicionais de vídeo 
//   const video = await loadVideoData(state.currentVideo)

//   const loader = '<span class="loader"></span>';

//   const markup = `
       
//   `;
  
//     document.querySelector(".aula").innerHTML = loader;
//     setTimeout(() =>{
//         document.querySelector(".aula").innerHTML = markup, 500
    
//     })
    


//     // Renderizando a aula atual na aba de acesso rápido da playlist
//     currentClassTitle.textContent = data.titulo

//     // Inicializando a lógica de atualização de progresso
//     console.log(data.url_id)

//     onYouTubeIframeAPIReady(state.currentVideo)
  
// } catch (error) {
//     console.error("Erro ao carregar aula:", error);
// }
// };


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

state.currentClass = primeiraAulaId

firstCardLink.classList.add('aula-card-link-active')




// Selecionando uma aula para assistir
playList.addEventListener('click', async function(e) {
  const clicked = e.target.closest(".aula-card-link");
  
  if (!clicked) return;
  
    // Prevenindo uma nova requisição caso a aula ja esteja selecionada
    const aulaId = clicked.dataset.id;

    if (aulaId === currentAulaId) return;

    currentAulaId = aulaId

    // Renderizando novos estilos
    cardLinks.forEach((card) => card.classList.remove("aula-card-link-active"));
    clicked.classList.add("aula-card-link-active");

    if (aulaId) {
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



// Inserção de comentários


const createComment = function(comment) {
  const markup = `
  <div class="comment-answer-box">
    <header class="comment-answer-header">
        <img src="/static/imgs/answer-author.jpg" alt="">
          <h5 class="answer-author-name">Vladimir Ilitch</h5>
          </header>
          <div class="comment-answer-content">
         <p class="comment-answer-text">
         ${comment}
         </p>
          <time class="comment-date" datetime="">
           ${getCurrentDate()}
        </time>
    </div>
                                       
  </div>`;

  commentAnswersList.insertAdjacentHTML('beforeend', markup)
}


inputDoubt.addEventListener('input', function(e) {
  e.preventDefault()



  if (e.target.value.length) {
    btnSendDoubt.style.opacity = '1'
    btnSendDoubt.style.pointerEvents = 'auto'
    btnSendDoubt.style.disabled = 'false'
  } else {
    btnSendDoubt.style.opacity = "0.5";
    
    btnSendDoubt.style.pointerEvents = 'none'
    btnSendDoubt.style.disabled = 'true'
    
  }


})



formCreateComment.addEventListener('submit', async function(e) {
  e.preventDefault();

  // Access individual form elements by their ID or name
  const comment = inputDoubt.value;

  if (!comment.length) return; 

  const errors = {}

  // LÓGICA PARA REALIZAR A SUBMISSÃO DE UM COMENTÁRIO
  // If you need to send the data via AJAX
  // const res = await fetch("/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ name, email }),
  // })

  // const data = await res.json()
    
  // if (!res.ok) {
  //   console.error({message: 'Não foi possível publicar seu comentário'})
  //   errors.message
    
  // }

  createComment(comment)

  inputDoubt.value = ''

  })





/////  Navegação Mobile

// Accordion: Playlist
const media = window.matchMedia("(min-width: 1024px)");

playlistAccordion.classList.remove("open--playlist")
playlistAccordion.addEventListener("click", function (e) {
  console.log('click')
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
      playlistAccordion.classList.remove("open--playlist");
    }
};

// Checagem inicial do tamanho da viewport
handleMediaChange(media)

// Reagir a mudança de viewport e garantir que o accordion da playlist permaneça aberto
window.addEventListener('resize', () => handleMediaChange(mediaQuery))





