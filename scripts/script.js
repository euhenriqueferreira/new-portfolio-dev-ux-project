
// Dynamic Menu Mobile
touchStartedX = 0;
touchStartedY = 0;
touchEndedX = 0;
touchEndedY = 0;
const menuMobileWrapper = document.querySelector('.modal-menu-mobile');
const body = document.querySelector('body');

$(document).ready(function(){


    // Dynamic Main Menu 
    const buttonTriggerMenu = $('#slide-down-menu');
    const menuWrapper = $('#menu-wrapper');

    buttonTriggerMenu.on('click', function(event){
        event.stopPropagation();
        menuWrapper.toggleClass('menu-visible');
    })
    
    $('body').on('click', function(event){
        if(!$(event.target).hasClass('dynamic-menu-wrapper')){
            menuWrapper.removeClass('menu-visible');
        }
    })


    body.addEventListener('touchstart', function(event){
        event.preventDefault();
        touchStartedX = event.changedTouches[0].screenX;  
        touchStartedY = event.changedTouches[0].screenY;  
    })
    
    body.addEventListener('touchend', function(event){
        touchEndedX = event.changedTouches[0].screenX;    
        touchEndedY = event.changedTouches[0].screenY;  
        handleSwipeMenuMobile()
    })


    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault(); 

        var target = $(this.getAttribute('href'));
        let offset = 90;
        
        if(target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 1000);
        }

        // Altera a URL sem recarregar a página
        history.pushState(null, null, ' ');
    });


    // Modal Cases
    const modalCases = $('.modal-my-cases');
    const btnOpenModal = $('button.btn-open-modal-cases');
    const btnCloseModal = $('button.close-modal-btn');

    btnOpenModal.on('click', function(e){
        e.preventDefault();
        modalCases.fadeIn();
        modalCases.css('display', 'flex');
        unloadScrollBars();
    })

    btnCloseModal.on('click', function(){
        modalCases.fadeOut();
        reloadScrollBars();
    })

    body.addEventListener('click', function(event){
        if(event.target.classList.contains('modal-my-cases')){
            modalCases.fadeOut();
            reloadScrollBars();
        }
    })



    // Services Section
    const services = document.querySelectorAll('.option-item');
    const textBoxParagraph = document.querySelector('.paragraph-text');

    services.forEach((service) =>{
        service.addEventListener('click', function(){
            
            services.forEach((service) =>{
                service.classList.remove('active');
            })

            this.classList.add('active');
            if(service === services[0]){
                textBoxParagraph.textContent = "A fase de ideação é o primeiro passo do processo. Nessa fase, o objetivo é ter ideias e refiná-las de acordo com o objetivo proposto."
            }
            if(service === services[1]){
                textBoxParagraph.textContent = "Na fase de Web Design, são desenvolvidos protótipos de baixa e alta fidelidade, que serão refinados até se tornarem páginas e componentes com layouts intuitívos, acessíveis e com ótima experiência."
            }
            if(service === services[2]){
                textBoxParagraph.textContent = "No processo de Web Development, o protótipo refinado  anteriormente é agora desenvolvido em código, passando por testes e melhorias até que o website tenha ótima experiência de usuário."
            }
        })
    })
})

function handleSwipeMenuMobile(){
    const offsetY = touchEndedY - touchStartedY;
    const offsetX = touchStartedX - touchEndedX;
    if(touchEndedX < touchStartedX && offsetY < 30 && offsetY > -30 && offsetX > 100){

        menuMobileWrapper.classList.add('modal-visible');

        body.removeEventListener('click', handleBodyClickMenuMobile);
        body.addEventListener('click', handleBodyClickMenuMobile);
    }
}

function handleBodyClickMenuMobile(event){
    console.log(event.target)
    if(!event.target.classList.contains('modal-menu-mobile') && !event.target.classList.contains('anchor-list-mobile__item')){
        menuMobileWrapper.classList.remove('modal-visible');
    }
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no'; // IE
}

function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = 'yes'; // IE
}
