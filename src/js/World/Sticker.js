import { Object3D, MeshBasicMaterial, Mesh, Vector3, Euler } from 'three'
import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

export default class Sticker {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets
    this.bottle = options.bottle

    // Set up
    this.container = new Object3D()
    this.container.name = 'Sticker'

    this.createSticker()
    // this.setMovement()
  }
  createSticker() {
    console.log(this.bottle)
    

    const box = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0xff0000 } );
    const meshBox = new Mesh( box, material );
    const mesh3D = new Mesh( this.bottle.bottle.shape.geometry, material );
    console.log(meshBox);
    console.log(mesh3D);
    mesh3D.scale.set(0.05, 0.05, 0.05)
    //this.container.add(mesh3D);
    
    const position = new THREE.Vector3(5, 1, 0);
    const orientation = new THREE.Euler(10,0,0,0, 'ui');
    const size = new THREE.Vector3( 50, 20, 20 );
    const geometry = new DecalGeometry( mesh3D, position, orientation, size );
    const material2 = new MeshBasicMaterial( { color: 0x0000ff } );
    const mesh2 = new Mesh( geometry, material2 );
    mesh2.scale.set(0.05, 0.05, 0.05)

    this.container.add( mesh2 );
  }
  setMovement() {
    this.time.on('tick', () => {
      this.bottle.rotation.y += 0.005
    })
  }
}
