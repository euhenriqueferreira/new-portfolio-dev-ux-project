
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


    // Modal Cases
    const modalCases = $('.modal-my-cases');
    const btnOpenModal = $('button.btn-open-modal-cases');
    const btnCloseModal = $('button.close-modal-btn');

    btnOpenModal.on('click', function(){
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
})

function handleSwipeMenuMobile(){
    const offset = touchEndedY - touchStartedY;
    console.log(offset)
    if(touchEndedX < touchStartedX && offset < 30 && offset > -30){

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
