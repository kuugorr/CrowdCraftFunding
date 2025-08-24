"use strict";

import App from './app.js';

// getting the two containers
const appContainer = document.querySelector('#app');
const userContainer=document.getElementById("login-area");
const navLinks=document.getElementById("nav-links");
const navButtons=document.getElementById("navButtons");
const footer = document.querySelector('#footer');

// creating our app
const app = new App(appContainer,userContainer,navLinks,navButtons,footer);
