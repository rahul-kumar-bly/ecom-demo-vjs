const sampleSlider = new Swiper('.sample-slider', {
    // if navigation(arrows) is needed
    autoplay:{
        delay: 5000,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    // if pagination(dots) is needed
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
})