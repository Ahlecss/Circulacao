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
  ShadowMaterial,
} from 'three'

import Sound from './Sound'
import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Bottle from './Bottle'
import Sticker from './Sticker'
import Decalcomanie from './Decalcomanie'
import Lottie from 'lottie-web'
import atelierBackground from '@textures/atelier/atelierBackground.jpg'

export default class WorldAtelier {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets
    this.camera = options.camera
    this.renderer = options.renderer

    // Set up
    this.container = new Object3D()
    this.container.name = 'WorldAtelier'
    this.mouseX = 0
    this.mouseY = 2
    this.scale = 1
    this.meshText

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder('WorldAtelier')
      this.debugFolder.open()
    }
    this.addAnimation()
    this.setAmbientLight()
    this.setPointLight()
    this.setScroll()
    this.setText()
    this.setBottle()
    this.setBackground()
    this.setChapters()
    this.setSticker()
    this.setSound()
    this.setDecalcomanie()
  }
  addAnimation() {
    var instructions = document.createElement('div')
    var animation = document.createElement('div')
    var paragraph = document.createElement('p')
    var button = document.createElement('button')

    instructions.appendChild(animation)
    instructions.appendChild(paragraph)
    instructions.appendChild(button)
    instructions.classList.add('drag-instructions')
    animation.id = 'drag-container'
    button.id = 'instruction-close'

    paragraph.innerHTML = "Drag pour décoller l'étiquette"
    button.innerHTML = 'close'

    document.body.appendChild(instructions)
    document
      .querySelector('#instruction-close')
      .addEventListener('click', (e) => {
        document.querySelector('.drag-instructions').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.drag-instructions').remove()
        }, 1600)
        e.preventDefault()
      })

    var dragcontainer = document.getElementById('drag-container')
    var draganimData = {
      container: dragcontainer,
      renderer: 'svg',
      autoplay: true,
      loop: true,
      path: '/etiquette.json',
    }
    Lottie.loadAnimation(draganimData)
  }
  setSound() {
    this.audio = new Sound({ soundScene: 'atelierSound', autoplay: true })
    // this.audio.soundPlay()
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
  setDecalcomanie() {
    this.decalcomanie = new Decalcomanie({
      time: this.time,
      assets: this.assets,
      bottle: this.bottle,
      camera: this.camera,
      renderer: this.renderer,
    })
    this.container.add(this.decalcomanie.container)
  }
  setBackground() {
    console.log('ui')
    var loader = new TextureLoader()
    var texture = loader.load(atelierBackground)

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
    this.backgroundplane.position.set(0, 0, -1)
    this.backgroundplane.scale.set(1.6, 1.6, 1.6)
    this.backgroundplane.receiveShadow = true
    this.backgroundplane.castShadow = true

    this.shadowBackgroundMaterial = this.material

    this.shadowBackgroundMaterial = new ShadowMaterial()
    this.shadowBackgroundMaterial.opacity = 1

    this.shadowBackgroundPlane = new Mesh(
      this.geometry,
      this.shadowBackgroundMaterial
    )
    this.shadowBackgroundPlane.position.set(0, 0, 0)
    this.shadowBackgroundPlane.scale.set(1, 1, 1)
    this.shadowBackgroundPlane.receiveShadow = true
    this.shadowBackgroundPlane.castShadow = true

    this.container.add(this.backgroundplane)
    this.container.add(this.shadowBackgroundPlane)
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
    this.sticker = new Sticker({
      time: this.time,
      assets: this.assets,
      bottle: this.bottle,
      camera: this.camera,
      renderer: this.renderer,
    })
    this.container.add(this.sticker.container)
  }
  setScroll() {
    window.addEventListener('wheel', (event) => {
      this.bottle.bottle.position.x = 0
    })
  }
  setChapters() {
    var chapter = document.getElementById('chapters')
    chapter.innerHTML = ''
    var chaptering = document.createElement('h2')
    var title = document.createElement('h3')
    chapter.appendChild(chaptering)
    chapter.appendChild(title)
    chapter.classList.add('chapters')
    title.classList.add('title')
    chaptering.innerHTML = 'Chapitre 3 -&nbsp;'
    title.innerHTML = "L'Atelier"
  }
  setText() {
    var loader = new FontLoader()
    loader.load('/Andika_New_Basic_Bold.json', (font) => {
      this.textGeo = new TextGeometry(
        "L’artiste cherche un concept qui pourrait à\nla fois capturer l'expérience de la vie sous\nla dictature et repousser ses contraintes\noppressives. ",
        {
          font: font,
          size: 0.08,
          height: 0,
          curveSegments: 1,
          bevelThickness: 2,
          bevelSize: 30,
          bevelEnabled: false,
        }
      )
      this.textMaterial = new MeshPhongMaterial({
        shininess: 0.5,
        specular: 0x222222,
        color: 0x222222,
        opacity: 1,
        transparent: true,
        refractionRatio: -1,
        depthWrite: false,
      })
      this.meshText = new Mesh(this.textGeo, this.textMaterial)
      this.meshText.position.set(-6.25, 0.4, 0.5)
      this.container.add(this.meshText)
    })
  }
}
