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

// import AmbientLightSource from './AmbientLight'
// import PointLightSource from './PointLight'
import Bottle from './Bottle'
import Sticker from './Sticker'
import PERSO from '@textures/bar/PERSO.png'
import BAR_DEVANT from '@textures/bar/BAR_DEVANT.png'
import BAR_FOND from '@textures/bar/BAR_FOND.png'
import BIERRE from '@textures/bar/BIERRE.png'
import DRAPEAU from '@textures/bar/DRAPEAU.png'
import TV from '@textures/bar/TV.png'
import VERRES from '@textures/bar/VERRES.png'

export default class WorldBar {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets
    this.camera = options.camera
    this.renderer = options.renderer

    // Set up
    this.container = new Object3D()
    this.container.name = 'WorldBar'
    this.mouseX = 0
    this.mouseY = 2
    this.scale = 1

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder('WorldBar')
      this.debugFolder.open()
    }

    // this.setLoader()
    this.init()
  }
  init() {
    // this.setAmbientLight()
    // this.setPointLight()
    // this.setScroll()
    // this.setText()
    // this.setBottle()
    this.addPlanes()
    this.setBackground()
    // this.setChapters()
  }
  // setLoader() {
  //   this.loadDiv = document.querySelector('.loadScreen')
  //   this.progress = this.loadDiv.querySelector('.progressBar')

  //   if (this.assets.total === 0) {
  //     this.init()
  //     this.loadDiv.remove()
  //   } else {
  //     this.assets.on('ressourceLoad', () => {
  //       this.progress.style.top = `${
  //         100 -
  //         (Math.floor((this.assets.done / this.assets.total) * 100) +
  //           Math.floor((1 / this.assets.total) * this.assets.currentPercent))
  //       }%`
  //     })

  //     this.assets.on('ressourcesReady', () => {
  //       setTimeout(() => {
  //         this.init()
  //         this.loadDiv.style.opacity = 0
  //         setTimeout(() => {
  //           this.loadDiv.remove()
  //         }, 550)
  //       }, 1000)
  //     })
  //   }
  // }
  setBackground() {
    var loader = new TextureLoader()
    var texture = loader.load(BAR_FOND)

    this.geometry = new PlaneBufferGeometry(
      window.innerWidth / 130,
      window.innerHeight / 130,
      5
    )
    this.material = new MeshPhongMaterial({
      map: texture,
      opacity: 1,
      transparent: true,
    })

    this.backgroundplane = new Mesh(this.geometry, this.material)
    this.backgroundplane.position.set(-15, -4, -10)
    this.backgroundplane.scale.set(0.6, 0.5, 0.6)
    this.backgroundplane.receiveShadow = true
    this.backgroundplane.castShadow = true
    this.container.add(this.backgroundplane)
  }
  // setAmbientLight() {
  //   this.ambientlight = new SpotLight({
  //     debug: this.debugFolder,
  //   })
  //   this.container.add(this.ambientlight.container)
  // }
  // setPointLight() {
  //   // console.log(this.camera)
  //   this.light = new PointLightSource({
  //     debug: this.debugFolder,
  //     posX: this.mouseX,
  //     posY: this.mouseY,
  //     posZ: -10,
  //     camera: this.camera,
  //   })
  //   this.container.add(this.light.container)
  //   // When the mouse moves, call the given function
  // }
  setBottle() {
    this.bottle = new Bottle({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.bottle.container)
  }
  setSticker() {
    // console.log('perer')
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
  setScroll() {
    window.addEventListener('wheel', (event) => {
      // For start the experience scene
      this.scale = event.deltaY * 0.01
      //this.camera.camera.position.z = 0.2 + 5 * this.scale;
      // console.log(this.scale)

      this.bottle.bottle.position.z

      this.persoplane.position.x -= this.scale
      this.bardevantplane.position.x += this.scale
      this.biereplane.position.x += this.scale
      this.drapeauplane.position.x += this.scale
      this.tvplane.position.x += this.scale
      this.verresplane.position.x -= this.scale
      this.backgroundplane.position.x -= this.scale
    })
  }
  addPlanes() {
    var loader = new TextureLoader()
    this.verticalgeometry = new PlaneBufferGeometry(5, 20, 5)
    this.horizontalgeometry = new PlaneBufferGeometry(20, 5, 5)
    var perso = loader.load(PERSO)
    var barDevant = loader.load(BAR_DEVANT)
    var biere = loader.load(BIERRE)
    var drapeau = loader.load(DRAPEAU)
    var tv = loader.load(TV)
    var verres = loader.load(VERRES)

    this.persoMaterial = new MeshPhongMaterial({
      map: perso,
      opacity: 1,
      transparent: true,
    })

    this.barDevantMaterial = new MeshPhongMaterial({
      map: barDevant,
      opacity: 1,
      transparent: true,
    })

    this.biereMaterial = new MeshPhongMaterial({
      map: biere,
      opacity: 1,
      transparent: true,
    })

    this.drapeauMaterial = new MeshPhongMaterial({
      map: drapeau,
      opacity: 1,
      transparent: true,
    })

    this.tvMaterial = new MeshPhongMaterial({
      map: tv,
      opacity: 1,
      transparent: true,
    })

    this.verresMaterial = new MeshPhongMaterial({
      map: verres,
      opacity: 1,
      transparent: true,
    })

    this.secondmaterial = new MeshLambertMaterial({
      map: barDevant,
      shininess: 1,
      specular: 0xffffff,
      color: 0xffffff,
      opacity: 1,
      transparent: true,
      refractionRatio: -1,
      depthWrite: false,
    })

    this.persoplane = new Mesh(this.horizontalgeometry, this.persoMaterial)
    this.persoplane.position.set(-2.25, -0.5, 3)
    this.persoplane.scale.set(0.15, 0.9, 0.15)
    // this.persoplane.name = "les couilles d'Aymeric"

    this.bardevantplane = new Mesh(
      this.horizontalgeometry,
      this.barDevantMaterial
    )
    this.bardevantplane.position.set(1.5, -1.87, -1)
    this.bardevantplane.scale.set(0.8, 0.8, 0.8)
    this.bardevantplaneclone = this.bardevantplane.clone()
    this.bardevantplaneclone.position.set(-12, -1.87, -1)

    this.biereplane = new Mesh(this.horizontalgeometry, this.biereMaterial)
    this.biereplane.position.set(3.5, -1, -2)
    this.biereplane.scale.set(0.225, 0.75, 0.225)

    this.drapeauplane = new Mesh(this.horizontalgeometry, this.drapeauMaterial)
    this.drapeauplane.position.set(-2, 7, -7)
    this.drapeauplane.scale.set(0.6, 1.2, 0.6)

    this.tvplane = new Mesh(this.horizontalgeometry, this.tvMaterial)
    this.tvplane.position.set(14, 6, -6)
    this.tvplane.scale.set(0.25, 1, 0.25)

    this.verresplane = new Mesh(this.horizontalgeometry, this.verresMaterial)
    this.verresplane.position.set(-14, 3, -6)
    this.verresplane.scale.set(0.5, 0.5, 0.5)
    this.verresplaneclone = this.verresplane.clone()
    this.verresplaneclone.position.set(-23.5, 3, -6)

    this.persoplane.castShadow = this.bardevantplane.castShadow = this.biereplane.castShadow = this.drapeauplane.castShadow = this.tvplane.castShadow = this.verresplane.castShadow = true
    this.persoplane.receiveShadow = this.bardevantplane.receiveShadow = this.biereplane.receiveShadow = this.drapeauplane.receiveShadow = this.tvplane.drapeauplane = this.verresplane.drapeauplane = true

    this.container.add(
      this.persoplane,
      this.bardevantplane,
      this.bardevantplaneclone,
      this.biereplane,
      this.drapeauplane,
      this.tvplane,
      this.verresplane,
      this.verresplaneclone
    )
  }
}
