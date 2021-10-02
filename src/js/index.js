import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/style.scss';

import * as menuFuncs from './menu';

(function () {
    //attaching click events to menu links to set active current link for style purposes
    const menuItems = [...document.getElementsByClassName("menu__menu-item")];
    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", (e) => menuFuncs.setActiveLink(e, menuItems));
    });

})();