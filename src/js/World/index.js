<<<<<<< HEAD
import { AxesHelper, Object3D } from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Suzanne from './Suzanne'
import Bottle from './Bottle'
=======
import { Object3D, AxesHelper, FontLoader, TextGeometry, MeshPhongMaterial, Mesh, MeshLambertMaterial } from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
>>>>>>> 6e57f395d7a380590b5be14a1c09bd1e001d03a7

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'World'

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
<<<<<<< HEAD
    // this.setSuzanne()
    this.setBottle()
=======
    this.setText()
>>>>>>> 6e57f395d7a380590b5be14a1c09bd1e001d03a7
  }
  setLoader() {
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progress')

    if (this.assets.total === 0) {
      this.init()
      this.loadDiv.remove()
    } else {
      this.assets.on('ressourceLoad', () => {
        this.progress.style.width = this.loadModels.innerHTML = `${
          Math.floor((this.assets.done / this.assets.total) * 100) +
          Math.floor((1 / this.assets.total) * this.assets.currentPercent)
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
  setAmbientLight() {
    this.ambientlight = new AmbientLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.ambientlight.container)
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
<<<<<<< HEAD
  setSuzanne() {
    this.suzanne = new Suzanne({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.suzanne.container)
  }
  setBottle() {
    this.bottle = new Bottle({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.bottle.container)
=======
  setText() {
    var loader = new FontLoader();
    loader.load('../Haboro-Contrast-Regular.json', (font) => {
      console.log(font)
        this.textGeo = new TextGeometry("My Text", {
            font: font,
            size: 10,
            height: 50,
            curveSegments: 120,
            bevelThickness: 2,
            bevelSize: 1,
            bevelEnabled: true
        })
        this.textMaterial = new MeshLambertMaterial({ color: 0xff0000 })
        this.mesh = new Mesh(this.textGeo, this.textMaterial)
        this.mesh.position.set(0, 0, 0)
        this.container.add(this.mesh)
    } )
>>>>>>> 6e57f395d7a380590b5be14a1c09bd1e001d03a7
  }
}
