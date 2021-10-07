let seuVotoPara = document.querySelector('.d-1-mensagem span')
let cargo = document.querySelector('.d-1-cargo span')
let informacoesCandidato = document.querySelector('.d-1-informacoes-candidato')
let informacaoVice = document.querySelector('.teste')
let fotoLateral = document.querySelector('.d-1-right')
let aviso = document.querySelector('.divisao-2')
let numeros = document.querySelector('.d-1-digitos')
let audioFim = document.querySelector('#audio-fim')
let audioTecla = document.querySelector('#audio-tecla')
let audioTeclaCorrige = document.querySelector('#audio-tecla-corrige')

let etapaAtual = 0
let numero = ''
let branco = false
const votos = []
const audioFinalizacao = new Audio('urna-elet-3.mpeg')

function comecarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = ''

    numero = ''

    branco = false
    
    for(let i=0; i<etapa.numeros; i++) {
        if(i === 0) {
            numeroHtml += '<div class="numeros-digitos pisca"></div>';
        } else {
            numeroHtml += '<div class="numeros-digitos"></div>';
        }
    }
    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    informacoesCandidato.innerHTML = ''
    aviso.style.display = 'none'
    fotoLateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    
    if(candidato.length > 0) {
        candidato = candidato [0]
        seuVotoPara.style.display = 'block'
        if(candidato.vice === undefined) {
            informacoesCandidato.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`
        } else {
            informacoesCandidato.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}<br> Vice-prefeito(a): ${candidato.vice}`
        }

        aviso.style.display = 'block'

        let fotosHtml = ''
        
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-imagem small"><img src="img/${candidato.fotos[i].url}" alt="Candidate">${candidato.fotos[i].legenda}</div>`
            } else if(candidato.fotos[i].url === 'candidate1.png') {
                fotosHtml += `<div class="d-1-imagem"><img src="img/${candidato.fotos[i].url}" alt="Candidate" id="img1">${candidato.fotos[i].legenda}</div>` 
            } else {
                fotosHtml += `<div class="d-1-imagem"><img src="img/${candidato.fotos[i].url}" alt="Candidate">${candidato.fotos[i].legenda}</div>`
            }
        }    
        
        fotoLateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        informacoesCandidato.innerHTML = '<div class="voto-nulo pisca">VOTO NULO</div>'
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numeros-digitos.pisca')
    audioTecla.play()
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling != null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}

function votoBranco() {
    if(numero === '') {
        audioTecla.play()
        branco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        numeros.style.display = 'none'
        informacoesCandidato.innerHTML = '<div class="voto-branco pisca">VOTO EM BRANCO</div>'
    } else {
        alert('Para votar em BRANCO, tecle primeiro em CORRIGE.')
    }
}

function corrige() {
    audioTeclaCorrige.play()
    comecarEtapa()
}

function votoConfirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if(branco === true) {
        votoConfirmado = true
        console.log('Confirmando como BRANCO')
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true
        console.log('Confirmado como ' + numero)
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado) {
        etapaAtual++
        if(etapas[etapaAtual] !== undefined) {
            console.log(etapas[etapaAtual])
            comecarEtapa()
        } else {
            branco = false
            cargo.style.display = 'none'
            seuVotoPara.style.display = 'none'
            aviso.style.display = 'none'
            numeros.style.display = 'none'
            fotoLateral.style.display = 'none'
            document.querySelector('.tela').innerHTML = '<div class="voto-confirmado pisca">FIM</div>'
            console.log('Quantidade de votos: ', votos.length)
            console.log(votos)
            audioFim.play()
        }
    }
}

comecarEtapa()
