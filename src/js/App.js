import { Scene, WebGLRenderer, SpotLight } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import * as dat from 'dat.gui'

import Sizes from '@tools/Sizes'
import Time from '@tools/Time'
import Assets from '@tools/Loader'

import Camera from './Camera'
import WorldUsine from '@world/index'
import WorldBar from '@world/BarScene'
import WorldAtelier from '@world/AtelierScene'
//import Cirka from 'static/Cirka_Bold.json'

import AmbientLightSource from './World/AmbientLight'
import PointLightSource from './World/PointLight'

export default class App {
  constructor(options) {
    // Set options
    this.canvas = options.canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.assets = new Assets()
    this.composer = 0
    this.reachedValue = 0
    this.currentScene = 'usine'
    this.worldUsine
    this.worldBar
    this.worldAtelier
    //this.mouseX = 0
    //this.mouseY = 2

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorldUsine()
    this.setWorldBar()
    this.setWorldAtelier()
    this.setNoise()
    this.setMovement()
    this.setScroll()
  }
  setRenderer() {
    // Set scene
    this.scene = new Scene()
    // Set renderer
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    })
    // Set background color
    this.renderer.setClearColor(0x000000, 0.8)
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })
    // Set RequestAnimationFrame with 60ips
    this.time.on('tick', () => {
      this.renderer.render(this.scene, this.camera.camera)
    })
  }
  setScroll() {
    //pour être sur de ne pas rendre trop de fois les scènes (en scrollant comme un porc), on met des booleans qui renforcent les conditions
    var callOnceBar = false
    var callOnceAtelier = false
    window.addEventListener('wheel', (event) => {
      if (this.camera.camera.position.x > 100 && !callOnceBar) {
        callOnceBar = true
        this.setTransition()
      }
      // On ne peut pas faire remonter la position d'un plane de l'atelier vers ici, donc on simule avec reachedValue (approximatif mais ça marche :p )
      this.scale = event.deltaY * 0.01
      this.reachedValue += this.scale
      console.log(this.reachedValue)
      if (this.reachedValue > 150 && !callOnceAtelier) {
        callOnceAtelier = true
        this.setTransition()
      }
      //this.camera.camera.position.z = 0.2 + 5 * this.scale;
    })
  }
  updateChapters(chapter, title) {
    document.querySelector('.chapters h2').innerHTML = chapter
    document.querySelector('.chapters h3').innerHTML = title
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorldUsine() {
    // Create world instance
    this.worldUsine = new WorldUsine({
      time: this.time,
      debug: this.debug,
      assets: this.assets,
      camera: this.camera,
      renderer: this.renderer,
    })
    // Add world to scene
    this.scene.add(this.worldUsine.container)
  }
  setWorldBar() {
    if (this.currentScene === 'bar') {
      // Create world instance
      this.worldBar = new WorldBar({
        time: this.time,
        debug: this.debug,
        assets: this.assets,
        camera: this.camera,
        renderer: this.renderer,
      })
      // Add world to scene
      this.scene.add(this.worldBar.container)
    }
  }
  setWorldAtelier() {
    if (this.currentScene === 'atelier') {
      // Create world instance
      this.worldAtelier = new WorldAtelier({
        time: this.time,
        debug: this.debug,
        assets: this.assets,
        camera: this.camera,
        renderer: this.renderer,
      })
      // Add world to scene
      this.scene.add(this.worldAtelier.container)
    }
  }
  setTransition() {
    console.log(this.camera.camera.position.x)
    var curtain = document.getElementById('curtain')
    curtain.classList.remove('screen-change')
    curtain.offsetWidth
    curtain.classList.add('screen-change')

    if (this.currentScene === 'usine') {
      setTimeout(() => {
        console.log(this.worldUsine)
        this.scene.remove(this.worldUsine.container)
        this.currentScene = 'bar'
        this.setWorldBar()
        this.camera.camera.position.x = 0
      }, 2000)
    }

    if (this.currentScene === 'bar') {
      setTimeout(() => {
        console.log(this.worldBar)
        this.scene.remove(this.worldBar.container)
        this.currentScene = 'atelier'
        //On vire le masque qui passait devant le sticker pour pouvoir le drag n drop
        curtain.remove()
        this.setWorldAtelier()
      }, 2000)
    }
  }
  setNoise() {
    console.log(this.renderer)
    console.log(this.scene)
    console.log(this.camera)
    this.composer = new EffectComposer(this.renderer)
    var renderPass = new RenderPass(this.scene, this.camera.camera)

    this.composer.addPass(renderPass)

    this.filmPass = new FilmPass(
      0.6, // noise intensity
      0, // scanline intensity
      0, // scanline count
      false // grayscale
    )
    this.filmPass.renderToScreen = true
    this.composer.addPass(this.filmPass)
    console.log(this.composer)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.composer.render()
    })
  }
  setNoise() {
    console.log(this.renderer)
    console.log(this.scene)
    console.log(this.camera)
    this.composer = new EffectComposer(this.renderer)
    var renderPass = new RenderPass(this.scene, this.camera.camera)

    this.composer.addPass(renderPass)

    this.filmPass = new FilmPass(
      0.6, // noise intensity
      0, // scanline intensity
      100, // scanline count
      false // grayscale
    )
    this.filmPass.renderToScreen = true
    this.composer.addPass(this.filmPass)
    console.log(this.composer)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.composer.render()
    })
  }
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new dat.GUI({ width: 420 })
    }
  }
}
