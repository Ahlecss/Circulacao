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
    this.container.name = 'WorldBar'
    this.mouseX = 0
    this.mouseY = 2
    this.scale = 1
    this.meshText

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder('WorldBar')
      this.debugFolder.open()
    }


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
  setSound() {
    this.audio = new Sound({ soundScene: 'atelierSound' })
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
      this.backgroundplane.scale.set(1.55, 1.55, 1.55)
      this.backgroundplane.receiveShadow = true
      this.backgroundplane.castShadow = true

      this.shadowBackgroundMaterial = this.material;

      this.shadowBackgroundMaterial = new ShadowMaterial;
      this.shadowBackgroundMaterial.opacity = 1;

      this.shadowBackgroundPlane = new Mesh(this.geometry, this.shadowBackgroundMaterial)
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
          this.bottle.bottle.position.x = 0;
        })
      }
    setChapters() {
        var chapter = document.createElement('div');
        chapter.innerHTML = "";
        var chaptering = document.createElement('h2');
        var title = document.createElement('h3');
        chapter.appendChild(chaptering)
        chapter.appendChild(title)
        chapter.classList.add('chapters')
        title.classList.add('title')
        chaptering.innerHTML = "Chapitre 3 -&nbsp;";
        title.innerHTML = "L'Atelier";
    }
    setText() {
      var loader = new FontLoader()
      loader.load('/Andika_New_Basic_Bold.json', (font) => {
        this.textGeo = new TextGeometry("L’artiste cherche un concept qui pourrait à\nla fois capturer l'expérience de la vie sous\nla dictature et repousser ses contraintes\noppressives. ", {
          font: font,
          size: 0.08,
          height: 0,
          curveSegments: 1,
          bevelThickness: 2,
          bevelSize: 30,
          bevelEnabled: false,
        })
        this.textMaterial = new MeshPhongMaterial({ 
          shininess: 0.5,
          specular: 0x222222,
          color: 0x222222,
          opacity: 1,
          transparent: true,
          refractionRatio: -1,
          depthWrite: false
        })
        this.meshText = new Mesh(this.textGeo, this.textMaterial)
        this.meshText.position.set(-6.25, 0.4, 0.5)
        this.container.add(this.meshText)
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
        depthWrite: false
      })
  
      this.persoplane = new Mesh(this.horizontalgeometry, this.persoMaterial)
      this.persoplane.position.set(-2.5, -0.5, 3)
      this.persoplane.scale.set(0.15, 0.9, 0.15)
      this.persoplane.name = "les couilles d'Aymeric"
      
      this.bardevantplane = new Mesh(this.horizontalgeometry, this.barDevantMaterial)
      this.bardevantplane.position.set(1.5, -2.25, -1)
      this.bardevantplane.scale.set(0.8, 0.8, 0.8)
      
      this.biereplane = new Mesh(this.horizontalgeometry, this.biereMaterial)
      this.biereplane.position.set(3.5, -1.75, -2)
      this.biereplane.scale.set(0.225, 0.75, 0.225)

      this.drapeauplane = new Mesh(this.horizontalgeometry, this.drapeauMaterial)
      this.drapeauplane.position.set(-2, 6.25, -7)
      this.drapeauplane.scale.set(0.6, 1.2, 0.6)

      this.tvplane = new Mesh(this.horizontalgeometry, this.tvMaterial)
      this.tvplane.position.set(14, 6, -6)
      this.tvplane.scale.set(0.25, 1, 0.25)

      this.verresplane = new Mesh(this.horizontalgeometry, this.verresMaterial)
      this.verresplane.position.set(-14, 3, -6)
      this.verresplane.scale.set(0.5, 0.5, 0.5)
  
      this.persoplane.castShadow = this.bardevantplane.castShadow = this.biereplane.castShadow = this.drapeauplane.castShadow = this.tvplane.castShadow = this.verresplane.castShadow = true
      this.persoplane.receiveShadow = this.bardevantplane.receiveShadow = this.biereplane.receiveShadow = this.drapeauplane.receiveShadow = this.tvplane.drapeauplane = this.verresplane.drapeauplane = true
  
      this.container.add(
        this.persoplane, 
        this.bardevantplane,
        this.biereplane,
        this.drapeauplane,
        this.tvplane,
        this.verresplane
        )
    }
  }
  