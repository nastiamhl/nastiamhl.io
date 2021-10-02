export const setActiveLink = function (e, items) {
    items.forEach(item => {
        item.classList.remove('menu__menu-item--current');
        item.classList.add('menu__menu-item');
    });

    let target = e.target;
    target.classList.remove('menu__menu-item');
    target.classList.add('menu__menu-item--current');

}