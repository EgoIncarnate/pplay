/**
 * This is the main entry point into the application. It initializes
 * scene first, and then asynchronously loads Vue app 
 */
var initScene = require('./scene');

var canvas = document.getElementById('scene');
// Canvas may not be available in test run
if (canvas) initPixelPlay(canvas);

// Tell webpack to split bundle, and download settings UI later.
require.ensure('@/mainVue.js', () => {
  // Settings UI is ready, initialize vue.js application
  require('@/mainVue.js');
});

function initPixelPlay(canvas) {
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas.width = width;
  canvas.height =  height;
  var ctxOptions = {antialias: false};

  var gl = canvas.getContext('webgl', ctxOptions) ||
          canvas.getContext('experimental-webgl', ctxOptions);

  if (gl) {
    window.webGLEnabled = true;
    var scene = initScene(canvas);
    window.scene = scene;
  } else {
    // The Vue App will notify error later, when loaded.
    window.webGLEnabled = false;
  }
}