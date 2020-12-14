import {
  Object3D,
  AxesHelper,
  FontLoader,
  TextGeometry,
  MeshPhongMaterial,
  Mesh,
  MeshLambertMaterial,
  TextureLoader,
  PlaneBufferGeometry,
  MeshBasicMaterial,
} from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Bottle from './Bottle'
import Sticker from './Sticker'
import Noise from '@textures/Noise.png'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets
    this.camera = options.camera
    this.renderer = options.renderer

    // Set up
    this.container = new Object3D()
    this.container.name = 'World'
    this.mouseX = 0
    this.mouseY = 2

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }

    this.setLoader()
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    this.setScroll()
    // this.setText()
    this.setBottle()
    this.addPlanes()
    this.setBackground()
    // this.setSticker()
  }
  setLoader() {
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progressBar')

    if (this.assets.total === 0) {
      this.init()
      this.loadDiv.remove()
    } else {
      this.assets.on('ressourceLoad', () => {
        this.loadModels.innerHTML = `${
          Math.floor((this.assets.done / this.assets.total) * 100) +
          Math.floor((1 / this.assets.total) * this.assets.currentPercent)
        }%`
        this.progress.style.top = `${
          100 -
          (Math.floor((this.assets.done / this.assets.total) * 100) +
            Math.floor((1 / this.assets.total) * this.assets.currentPercent))
        }%`
      })

      this.assets.on('ressourcesReady', () => {
        setTimeout(() => {
          this.init()
          this.loadDiv.style.opacity = 0
          setTimeout(() => {
            this.loadDiv.remove()
          }, 550)
        }, 1000)
      })
    }
  }
  setScroll() {
    window.addEventListener('wheel', (e) => {
      if (this.camera.camera.position.x >= 0) {
        this.camera.camera.position.x += e.deltaY * 0.003
        this.bottle.bottle.position.x += e.deltaY * 0.003
      } else {
        this.bottle.bottle.position.x = 0
        this.camera.camera.position.x = 0
      }
    })
  }
  setBackground() {
    var loader = new TextureLoader()
    var texture = loader.load(Noise)

    this.geometry = new PlaneBufferGeometry()
    this.material = new MeshBasicMaterial({
      map: texture,
      opacity: 1,
      transparent: true,
      normalmap: texture,
    })

    this.plane = new Mesh(this.geometry, this.material)
    this.plane.position.set(0, 0, -20)
    this.plane.scale.set(150, 150, 2)
    this.plane.castShadow = true
    this.plane.receiveShadow = true
    this.container.add(this.plane)
  }
  setAmbientLight() {
    this.ambientlight = new AmbientLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.ambientlight.container)
  }
  setPointLight() {
    // console.log(this.camera)
    this.light = new PointLightSource({
      debug: this.debugFolder,
      posX: this.mouseX,
      posY: this.mouseY,
      posZ: -10,
      camera: this.camera,
    })
    this.container.add(this.light.container)
    // When the mouse moves, call the given function
  }
  setBottle() {
    this.bottle = new Bottle({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.bottle.container)
  }
  setSticker() {
    this.sticker = new Sticker({
      time: this.time,
      assets: this.assets,
      bottle: this.bottle,
      camera: this.camera,
      renderer: this.renderer,
    })
    this.container.add(this.sticker.container)
  }
  setText() {
    var loader = new FontLoader()
    loader.load('../Haboro-Contrast-Regular.json', (font) => {
      // console.log(font)
      this.textGeo = new TextGeometry('My Text', {
        font: font,
        size: 10,
        height: 50,
        curveSegments: 120,
        bevelThickness: 2,
        bevelSize: 1,
        bevelEnabled: true,
      })
      this.textMaterial = new MeshLambertMaterial({ color: 0xff0000 })
      this.mesh = new Mesh(this.textGeo, this.textMaterial)
      this.mesh.position.set(0, 0, 0)
      this.container.add(this.mesh)
    })
  }
  addPlanes() {
    // var loader = new TextureLoader()
    // var texture = loader.load(Noise)
    // this.geometry = new PlaneBufferGeometry()
    // this.material = new MeshBasicMaterial({
    //   map: texture,
    //   opacity: 1,
    //   transparent: true,
    //   normalmap: texture,
    // })
    // this.plane = new Mesh(this.geometry, this.material)
    // this.plane.position.set(-2, 0, 2)
    // this.plane.scale.set(4, 4, 4)
    // this.plane.castShadow = true
    // this.plane.receiveShadow = true
    // this.container.add(this.plane)
  }
}
