let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');
    if (currentScroll > lastScrollTop) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});