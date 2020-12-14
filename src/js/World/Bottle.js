import { Object3D } from 'three'
import * as THREE from 'three'

export default class Bottle {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Bottle'

    this.createBottle()
    this.setMovement()
  }
  createBottle() {
    // this.bottle = this.assets.models.bottle.scene
    this.bottle = this.assets.models.bouteille.scene

    this.bottle.cap = this.bottle.children[0].children[0]
    this.bottle.sticker = this.bottle.children[0].children[1]
    this.bottle.label = this.bottle.children[0].children[2]
    this.bottle.shape = this.bottle.children[0].children[3]

    this.bottle.shape.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      opacity: 0.3,
      transparent: true,
      refractionRatio: 0.8,
    })
    this.bottle.sticker.visible = false

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
