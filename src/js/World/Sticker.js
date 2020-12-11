import { Object3D, MeshBasicMaterial, Mesh } from 'three'
import * as THREE from 'three'
import DragControls from 'drag-controls'

export default class Sticker {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets
    this.camera = options.camera
    this.renderer = options.renderer

    // Set up
    this.container = new Object3D()
    this.container.name = 'Sticker'
    this.objects = [];

    this.createSticker()
    this.createControls()
    this.setMovement()
  }
  createSticker() {
    
    const sticker = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0xff0000 } );
    const meshSticker = new Mesh( sticker, material );
    this.container.add(meshSticker);
    this.objects.push( meshSticker );
  }
  createControls() {
    const controls = new DragControls( [ ... this.objects ], this.camera.camera, this.renderer.domElement );

    console.log(controls);  
    
  /*  controls.addEventListener( 'dragstart', function ( event ) {

      event.object.material.emissive.set( 0x888888 );

  } );

  this.controls.addEventListener( 'dragend', function ( event ) {

      event.object.material.emissive.set( 0x000000 );

  } );*/
  }
  setMovement() {
    this.time.on('tick', () => {
      this.bottle.rotation.y += 0.5
    })
  }
}
