import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  PlaneGeometry,
  MathUtils,
  Clock,
} from 'three';
import Stats from 'stats.js';
import Tiles from './Tiles';
import resources from './Resources';
import FallingLetters from './FallingLetters';

export default class App {
  constructor() {
    this._init();
    this.isScrollingDown = false;
  }

  async _init() {
    // RENDERER
    this._gl = new WebGLRenderer({
      canvas: document.querySelector('#canvas'),
    });

    this._gl.setSize(window.innerWidth, window.innerHeight);

    // CAMERA
    const aspect = window.innerWidth / window.innerHeight;

    this._camera = new PerspectiveCamera(60, aspect, 1, 1000);
    this._camera.position.z = 200;
    this._resize();

    // LOAD EVERYTHING
    await resources.load(); 


    // SCENE
    this._scene = new Scene();
    this._scene.background = new Color(0x16201f);

    // PLANES
    this._initScene();

    // FALLING LETTERS
    this._fallingLetters = new FallingLetters();
    this._scene.add(this._fallingLetters);

    // STATS
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);

    // CLOCK
    this._clock = new Clock();

    this._animate();

    this._initEvents();

    // SCROLL EVENT
    window.addEventListener('wheel', this._onWheel.bind(this));
  }

  _initScene() {
    const tiles = new Tiles();
    this._tiles = tiles;
    this._scene.add(tiles);
  }

  onDrag(e, delta) {
    this._tiles.onDrag(e, delta);
  }

  _initEvents() {
    window.addEventListener('resize', this._resize.bind(this));
  }

  _resize() {
    this._gl.setSize(window.innerWidth, window.innerHeight);

    // CHANGE FOV
    let fov = Math.atan(window.innerHeight / 2 / this._camera.position.z) * 2;
    fov = MathUtils.radToDeg(fov);
    this._camera.fov = fov;

    const aspect = window.innerWidth / window.innerHeight;
    this._camera.aspect = aspect;
    this._camera.updateProjectionMatrix();
  }

  _animate() {
    this._stats.begin();

    this._clock.delta = this._clock.getDelta();

    this._tiles.update();
    this._fallingLetters.update();
    
    this._gl.render(this._scene, this._camera);
    this._stats.end();
    window.requestAnimationFrame(this._animate.bind(this));
  }

  _onWheel(event) {
    const deltaY = event.deltaY; // The vertical scroll amount

    // Check if scrolling down
    if (deltaY > 0) {
      if (!this.isScrollingDown) {
        // Start falling letters if not already started
        this.isScrollingDown = true;
      }
      this._fallingLetters.update(); // Update the position of letters
    } else {
    }
  }


}
