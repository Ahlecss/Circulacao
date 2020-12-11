import { Object3D, MeshBasicMaterial, Mesh } from 'three'
import * as THREE from 'three'

export default class Sticker {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Sticker'

    this.createSticker()
    // this.setMovement()
  }
  createSticker() {
    
    const sticker = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x0000ff } );
    const meshSticker = new Mesh( sticker, material );
    this.container.add(meshSticker);
  
  }
  setMovement() {
    this.time.on('tick', () => {
      this.bottle.rotation.y += 0.005
    })
  }
}
