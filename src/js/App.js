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
    this.mouseX = 0
    this.mouseY = 2

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setScroll()
    this.setWorldUsine()
    // this.setWorldBar()
    this.setAmbientLight()
    this.setPointLight()
    this.setNoise()
    this.setMovement()
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
  setAmbientLight() {
    this.ambientlight = new SpotLight({
      debug: this.debugFolder,
    })
    this.scene.add(this.ambientlight.container)
  }
  setPointLight() {
    // console.log(this.camera)
    console.log(this.world)
    this.light = new PointLightSource({
      debug: this.debugFolder,
      posX: this.mouseX,
      posY: this.mouseY,
      posZ: -10,
      camera: this.camera,
      bottle: this.world.bottle,
    })
    this.scene.add(this.light.container)
    // When the mouse moves, call the given function
  }
  setScroll() {
    // console.log(document.getElementById('container'))
    window.addEventListener('wheel', (e) => {
      // console.log(this.light.light.target.position)
      // console.log(this.camera.camera.position.x)
      if (this.camera.camera.position.x >= 0) {
        this.camera.camera.position.x += e.deltaY * 0.01
        this.world.bottle.bottle.position.x += e.deltaY * 0.01
        this.world.bottle.bottle.sticker.position.x += e.deltaY * 0.01
        // this.light.params.positionX = (e.clientX / window.innerWidth) * 2 - 1
        // this.light.light.target.position.set +=
        //   (e.deltaX / window.innerWidth) * 2 - 1
      } else {
        this.world.bottle.bottle.position.x = 0
        this.camera.camera.position.x = 0
        // this.light.params.positionX = (e.clientX / window.innerWidth) * 2 - 1
        // this.light.light.target.position.set +=
        //   (e.deltaX / window.innerWidth) * 2 - 1
      }
    })
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
    this.world = new WorldUsine({
      time: this.time,
      debug: this.debug,
      assets: this.assets,
      camera: this.camera,
      renderer: this.renderer,
      scene: this.scene,
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setWorldAtelier() {
    // Create world instance
    this.world = new WorldAtelier({
      time: this.time,
      debug: this.debug,
      assets: this.assets,
      camera: this.camera,
      renderer: this.renderer,
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setNoise() {
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
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new dat.GUI({ width: 420 })
    }
  }
}
