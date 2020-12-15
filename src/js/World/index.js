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
  SpotLight,
} from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Bottle from './Bottle'
import Sticker from './Sticker'
import PPlanUsine from '@textures/usine/1erPlan_USINE.png'
import DPlanUsine from '@textures/usine/2emePlan_USINE.png'
import TPlanUsine from '@textures/usine/3emePlan_USINE.png'
import QPlanUsine from '@textures/usine/4emePlan_USINE.png'
import FPlanUsine from '@textures/usine/5emePlan_USINE.png'

export default class WorldUsine {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets
    this.camera = options.camera
    this.renderer = options.renderer

    // Set up
    this.container = new Object3D()
    this.container.name = 'WorldUsine'
    this.mouseX = 0
    this.mouseY = 2

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder('WorldUsine')
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
    this.setSticker()
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
        this.camera.camera.position.x += e.deltaY * 0.01
        this.bottle.bottle.position.x += e.deltaY * 0.01
        this.bottle.bottle.sticker.position.x += e.deltaY * 0.01
      } else {
        this.bottle.bottle.position.x = 0
        this.camera.camera.position.x = 0
      }
    })
  }
  setBackground() {
    var loader = new TextureLoader()
    var texture = loader.load(FPlanUsine)

    this.geometry = new PlaneBufferGeometry(
      window.innerWidth / 130,
      window.innerHeight / 130,
      5
    )
    this.material = new MeshPhongMaterial({
      shininess: 100,
      specular: 0xaaaaaa,
      color: 0xaaaaaa,
      opacity: 0.2,
      transparent: true,
      refractionRatio: 1,
      depthWrite: false,
    })

    this.plane = new Mesh(this.geometry, this.material)
    this.plane.position.set(2, 0, -20)
    this.plane.scale.set(10, 10, 10)
    this.plane.receiveShadow = true
    this.plane2 = this.plane.clone()
    this.plane2.position.set(this.plane.geometry.parameters.width * 10, 0, -20)
    this.container.add(this.plane, this.plane2)
  }
  setAmbientLight() {
    this.ambientlight = new SpotLight({
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
    console.log('perer')
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
    var loader = new TextureLoader()
    this.verticalgeometry = new PlaneBufferGeometry(5, 20, 5)
    this.horizontalgeometry = new PlaneBufferGeometry(20, 5, 5)
    var fronttexture = loader.load(PPlanUsine)
    var secondtexture = loader.load(DPlanUsine)
    var thirdtexture = loader.load(TPlanUsine)
    var fourthtexture = loader.load(QPlanUsine)

    this.frontmaterial = new MeshLambertMaterial({
      map: fronttexture,
    })

    this.secondmaterial = new MeshLambertMaterial({
      map: secondtexture,
      opacity: 1,
      transparent: true,
    })

    this.thirdmaterial = new MeshLambertMaterial({
      map: thirdtexture,
      opacity: 1,
      transparent: true,
    })

    this.fourthmaterial = new MeshLambertMaterial({
      map: fourthtexture,
      opacity: 1,
      transparent: true,
    })

    this.firstplane = new Mesh(this.horizontalgeometry, this.frontmaterial)
    this.firstplane.position.set(30, -0.5, 4)
    this.firstplane.scale.set(0.05, 0.5, 0.05)

    this.secondplane = new Mesh(this.horizontalgeometry, this.secondmaterial)
    this.secondplane.position.set(-10, -2, 1)
    this.secondplane.scale.set(0.5, 0.5, 0.5)

    this.thirdplane = new Mesh(this.horizontalgeometry, this.thirdmaterial)
    this.thirdplane.position.set(-10, 0, -1)
    this.thirdplane.scale.set(1, 2, 0.5)

    this.fourthplane = new Mesh(this.verticalgeometry, this.fourthmaterial)
    this.fourthplane.position.set(-8, -2, -4)
    this.fourthplane.scale.set(2, 1, 0.5)

    var position = -10
    for (let i = 0; i < 20; i++) {
      this.secondplaneclone = this.secondplane.clone()
      this.secondplaneclone.position.set(position, -2, 1)
      this.secondplaneclone.scale.set(0.5, 0.5, 0.5)
      this.container.add(this.secondplaneclone)

      this.thirdplaneclone = this.thirdplane.clone()
      this.thirdplaneclone.position.set(position, 0, -1)
      this.thirdplaneclone.scale.set(1, 2, 0.5)
      this.container.add(this.thirdplaneclone)
      position = position + 10
    }

    this.firstplane.castShadow = this.secondplane.castShadow = this.thirdplane.castShadow = this.fourthplane.castShadow = true
    this.firstplane.receiveShadow = this.secondplane.receiveShadow = this.thirdplane.receiveShadow = this.fourthplane.receiveShadow = true

    this.container.add(
      this.firstplane,
      this.secondplane,
      this.thirdplane,
      this.fourthplane
    )
  }
}
