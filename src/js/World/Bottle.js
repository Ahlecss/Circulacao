import { Object3D, TextureLoader, MeshBasicMaterial } from 'three'
import * as THREE from 'three'
import etiquetteCoca from '@textures/etiquetteCoca.png'

export default class Bottle {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Bottle'

    this.createBottle()
    //this.setMovement()
  }
  createBottle() {
    // this.bottle = this.assets.models.bottle.scene
    this.bottle = this.assets.models.bouteille.scene
    // console.log(this.bottle)
    this.bottle.cap = this.bottle.children[0].children[0]
    this.bottle.sticker = this.bottle.children[0].children[1]
    this.bottle.label = this.bottle.children[0].children[2]
    this.bottle.shape = this.bottle.children[0].children[3]

    this.bottle.label.scale.z = -1

    this.bottle.shape.material = new THREE.MeshPhongMaterial({
      shininess: 100,
      specular: 0xffffff,
      color: 0xffffff,
      opacity: 0.2,
      transparent: true,
      refractionRatio: 1,
      depthWrite: false,
    })

    this.bottle.sticker.visible = false

    const textureEtiquetteCoca = new TextureLoader().load(etiquetteCoca)

    this.bottle.label.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: textureEtiquetteCoca,
      opacity: 0.3,
      transparent: true,
      refractionRatio: 0.8,
    })

    this.bottle.scale.set(0.1, 0.1, 0.1)
    this.bottle.rotation.set(0.1, 4.7, 0)
    this.bottle.position.set(0, -3, 0)
    this.container.add(this.bottle)
  }
  setMovement() {
    document.addEventListener(
      'mousemove',
      (event) => {
        event.preventDefault()
        var rotationX = ((event.clientX / window.innerWidth) * 2 - 1) / 4
        this.bottle.rotation.set(0.1, 4.7 + rotationX, 0)
      },
      false
    )
  }
}
