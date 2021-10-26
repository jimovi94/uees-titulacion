// Tailored by Pixavio
const bg = [
  'background: linear-gradient(135deg,#04005e 0,#000039 100%);',
  'color: #FFFFFF',
  'padding: 10px 200px',
  'line-height: 25px',
  'font-family:monospace',
  'font-size: 16px;'
].join(';');
console.log('%c Tailored by Pixavio', bg);

/* if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {}).catch(function (err) {});
  });
} */

// Global Imports
import * as Turbo from "@hotwired/turbo";
import {
  Application,
  Controller
} from "@hotwired/stimulus"
import {
  definitionsFromContext
} from "@hotwired/stimulus-webpack-helpers"

//Window Import
window.Controller = Controller;

//Init Turbo & Stimullus
Turbo.start();
window.Stimulus = Application.start();
const context = require.context("./controllers", true, /\.js$/);
Stimulus.load(definitionsFromContext(context));