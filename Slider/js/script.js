let totalSlides = document.querySelectorAll('.slider-item').length
document.querySelector('.slider-width').style.width = `calc(100vw * ${totalSlides})`
document.querySelector('.slider-controls').style.height = `${document.querySelector('.slider').clientHeight}px`;

let slideAtual = 0

function voltar() {
    slideAtual--
    if(slideAtual < 0) {
        slideAtual = totalSlides - 1
    }
    atualizaMargin()
}

function avancar() {
    slideAtual++
    if(slideAtual > (totalSlides - 1)) {
        slideAtual = 0
    }
    atualizaMargin()
}

function atualizaMargin() {
    let sliderItemWidth = document.querySelector('.slider-item').clientWidth
    let novaMargem = (slideAtual * sliderItemWidth) // Jogar uma tela
    document.querySelector('.slider-width').style.marginLeft = `-${novaMargem}px`
}

setInterval(avancar, 4000)
