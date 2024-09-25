//é possivel otimizar essa rotina em 1000% porém meu tempo é minino então se caso você conhecer um pouco de js tente otimizar esse codigo

const estacoesLista = document.getElementById('estacoes-lista');
const estacoesNomes = [];

for (let i = 0; i < estacoesLista.children.length; i++) {
    estacoesNomes.push(estacoesLista.children[i].textContent);
}

console.log(estacoesNomes); 



// variaveis do dom
const links_1 = document.querySelector('.esconde-1');
const links_2 = document.querySelector('.esconde-2');
const links_3 = document.querySelector('.esconde-3');
const links_4 = document.querySelector('.esconde-4');
const links_5 = document.querySelector('.esconde-5');
const links_6 = document.querySelector('.esconde-6');
const links_7 = document.querySelector('.esconde-7');
const links_8 = document.querySelector('.esconde-8');
const links_9 = document.querySelector('.esconde-9');
const links_10 = document.querySelector('.esconde-10');
//RH
const BoxRH = document.getElementById('DEV-box');
const seta_Rh = document.getElementById('DEV');
//ESG
const seta_ESG = document.getElementById('GROG');
const BoxESG = document.getElementById('GROG-box');
//PCA
const seta_BPO = document.getElementById('BPO');
const BoxBPO = document.getElementById('BPO-box');

seta_Rh.addEventListener('click', () =>{
    mudaEstilo(links_1,BoxRH);
});

seta_ESG.addEventListener('click', () =>{
    mudaEstilo(links_2, BoxESG);
})

seta_BPO.addEventListener('click', () =>{
    mudaEstilo(links_3, BoxBPO);
})

function mudaEstilo(link, box){
    link.classList.toggle('active');
    box.classList.toggle('active');
};

// function LimpaEstilo(link, link2, link3){
//     link.style.display = 'none';
// }
