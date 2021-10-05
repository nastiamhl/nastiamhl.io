export const setActiveLink = (e, items) => {
    items.forEach(item => {
        item.classList.remove('menu__menu-item--current');
        item.classList.add('menu__menu-item');
    });

    const target = e.target;
    target.classList.remove('menu__menu-item');
    target.classList.add('menu__menu-item--current');

    document.getElementById(target.id.replace("-link", "") + "-section").scrollIntoView();

}

export const toggleMobileMenu = (menuContainer, menuItemsContainer, menuItems) => {
    menuContainer.classList.toggle('mobile-show');
    menuItemsContainer.classList.toggle('mobile-show');
    menuItems.forEach(menuItem => menuItem.classList.toggle('mobile-show'));
    document.body.classList.toggle("overflow-blocked");
}