import { Object3D } from 'three'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
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
    // this.setMovement()
  }
  createBottle() {
    this.bottle = this.assets.models.bottle.scene

    this.bottle.cap = this.bottle.children[0].children[0]
    this.bottle.label = this.bottle.children[0].children[1]
    this.bottle.shape = this.bottle.children[0].children[2]

    this.bottle.shape.material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      opacity: 0.2,
      transparent: true,
      refractionRatio: 1,
      reflectivity: 1,
    })

    this.bottle.scale.set(0.1, 0.1, 0.1)
    this.bottle.rotation.set(-0.1, 5, 0)
    this.bottle.position.set(0, -3, 0)

    this.container.add(this.bottle)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.bottle.rotation.y += 0.005
    })
  }
}
