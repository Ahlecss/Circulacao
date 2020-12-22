import {
  Object3D,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  MeshPhongMaterial,
} from 'three'
import etiquetteMolotov from '@textures/Molotov.png'

export default class Decalcomanie {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets
    this.bottle = options.bottle
    this.camera = options.camera
    this.renderer = options.renderer

    // Set up
    this.container = new Object3D()
    this.container.name = 'Decalcomanie'
    this.mesh3D

    //this.createDecalcomanie()
  }
  createDecalcomanie() {
    const textureEtiquetteMolotov = new TextureLoader().load(etiquetteMolotov)

    const material = new MeshPhongMaterial({
      map: textureEtiquetteMolotov,
      color: 0xffffff,
      transparent: true,
      opacity: 1,
    })
    this.mesh3D = new Mesh(this.bottle.bottle.sticker.geometry, material)
    this.mesh3D.scale.set(0.03, 0.09, 0.1)
    this.mesh3D.rotation.set(6, 0, 6)
    this.mesh3D.position.set(0, -1.5, 1)
    this.container.add(this.mesh3D)
  }
  setMovement() {
    this.time.on('tick', () => {
      //this.bottle.rotation.y += 0.005
    })
  }
}
