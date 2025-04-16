import {throttle} from './optimization.js';

export const Header = () => {
    const header = document.getElementById('header');
    const btn = document.getElementById('header-btn');
    const menu = document.getElementById('header-menu');
    const main = document.getElementById('main');

    btn.addEventListener('click', () => {
        menu.classList.toggle('header-menu--active');
        btn.classList.toggle('header__menu-btn--active');
    });

    document.addEventListener('click', (e) => {
        if (e.target === menu || menu.contains(e.target) || e.target === btn) return;

        menu.classList.remove('header-menu--active');
        btn.classList.remove('header__menu-btn--active');
    });

    fixHeaderWhenScrolling(header, main.offsetHeight);
    smoothScrolling(header);
    
}

function fixHeaderWhenScrolling (header, scrollHeight) {

    const onScroll = throttle(() => {
        const currentScroll = window.scrollY;
        const flag = currentScroll > scrollHeight / 2;

        header.classList.toggle('header--fixed', flag);

    }, 100);

    window.addEventListener('scroll', onScroll);
}

function smoothScrolling (header) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
      
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
      
          if (!targetElement) return;
      
    
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - header.offsetHeight;
      
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        });
      });
}