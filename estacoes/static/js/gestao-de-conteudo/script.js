const btnExtractVideoID = document.querySelector('.url-btn')

function extrairID() {
    const url = document.getElementById('youtubeLink').value;
    
    const indice = url.indexOf('=');
    
    if (indice !== -1) {
        // Extrai a substring a partir do índice logo após o sinal de igual
        const id = url.substring(indice + 1);
        
        // Define o valor do campo de entrada com o ID 'videoId' para o ID extraído
        document.getElementById('videoId').value = `${id}`;
    } 
}

// Adiciona um ouvinte de evento ao campo de entrada com o ID 'youtubeLink'
// Sempre que o valor do campo é alterado, a função 'extrairID' é chamada
document.getElementById('youtubeLink').addEventListener('input', extrairID);


btnExtractVideoID.addEventListener('click', function(e) {
    e.preventDefault()
})

// Validar o formato de URL do vídeo
const  isValidYouTubeEmbedURL = function(url) {
    const youtubeEmbedRegex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+(\?[a-zA-Z0-9_=&-]+)?$/;
    return youtubeEmbedRegex.test(url);
}

const validateForm = function(e) {
    const urlInput = document.getElementById('youtubeLink').value;
    if (!isValidYouTubeEmbedURL(urlInput)) {
        e.preventDefault(); // Prevent form submission
        alert('Please enter a valid YouTube embed URL.');
    }
}

window.onload = function() {
    const form = document.getElementById('urlForm');
    form.addEventListener('submit', validateForm);
};