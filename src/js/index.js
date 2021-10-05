'use strict';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/style.scss';

import * as menuFuncs from './menu';
import * as formFuncs from './forms';
import * as newsFuncs from './news';

(function () {
    //removing preload class from body
    document.addEventListener("DOMContentLoaded", () => document.body.removeAttribute('class'));

    //defining core elements to hook events
    const menuItems = [...document.getElementsByClassName("menu__menu-item")];
    const switchElements = [...document.getElementsByClassName("switch")];
    const formContainers = [...document.getElementsByClassName("form")];
    const formInputs = [...document.getElementsByClassName("form__input")];
    const togglePasswordIcons = [...document.getElementsByClassName("toggle-password")];
    const toggleSwitchCheckboxInputs = [...document.getElementsByClassName("toggle-switch")];
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const newsContainer = document.getElementById("news-container");
    const newsLoadMore = document.getElementById("news-load-more");
    const newsLoading = document.getElementById("news-loading");
    const newsUrl = "https://my-json-server.typicode.com/TomaszJaworski/test-api/news";
    const techItems = [...document.getElementsByClassName("tech-item")];
    let newsInitialItemsCount = 5;
    let newsLoadMoreItemsCount = 2;

    // reseting register for the sake of Firefox bugs which preserves the data betwen reloads
    loginForm.reset();
    registerForm.reset();

    // get first batch of news
    newsFuncs.getNews(newsUrl, true, newsInitialItemsCount, newsContainer, newsLoadMore, newsLoading);


    //attaching click events to menu links to set active current link for style purposes
    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", (e) => menuFuncs.setActiveLink(e, menuItems));
    });

    //attaching click events to buttons and links to switch between forms
    switchElements.forEach(switchEl => {
        switchEl.addEventListener("click", (e) => formFuncs.switchForms(e, formContainers));
    });

    //handling placeholder animation to top left corner on focus
    formInputs.forEach(input => {
        input.addEventListener("focus", formFuncs.animateInputPlaceholders);
    });

    //handling placeholder animationback to middle in input empty on blur
    formInputs.forEach(input => {
        input.addEventListener("blur", formFuncs.resetInputPlaceholders);
    });

    //handling input validation
    formInputs.forEach(input => {
        input.addEventListener("input", formFuncs.validateFormInputs);
    });

    //toggling password visibility
    togglePasswordIcons.forEach(passwordIcon => {
        passwordIcon.addEventListener("click", formFuncs.togglePassword);
    });

    //toggling switches
    toggleSwitchCheckboxInputs.forEach(toggleSwitchCheckboxInput => {
        toggleSwitchCheckboxInput.addEventListener("click", formFuncs.toggleSwitch);
    });

    //on submit login form
    loginForm.addEventListener('submit', formFuncs.submitLoginForm);

    //on submit register form
    registerForm.addEventListener('submit', formFuncs.submitRegisterForm);

    //load following news
    newsLoadMore.addEventListener("click", (e) => newsFuncs.getNews(null, false, newsLoadMoreItemsCount, newsContainer, newsLoadMore, newsLoading));
})();