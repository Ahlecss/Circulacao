import { Object3D, MeshBasicMaterial, Mesh, Vector3, Euler } from 'three'
import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

export default class Bottle {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets
    this.bottle = options.bottle
    this.camera = options.camera
    this.renderer = options.renderer

    // Set up
    this.container = new Object3D()
    this.container.name = 'Sticker'
    this.objects = []

    this.createSticker()
    this.createControls()
    // this.setMovement()
  }
  createSticker() {
    // const box = new THREE.BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x0000ff })
    // const meshBox = new Mesh(box, material)
    const mesh3D = new Mesh(this.bottle.bottle.sticker.geometry, material)
    mesh3D.scale.set(0.1, 0.1, 0.1)
    mesh3D.rotation.set(-0.15, 0, 0)
    mesh3D.position.set(0, -1.5, -0.1)
    this.container.add(mesh3D)

    // const position = new THREE.Vector3(1, 1, 1)
    // const orientation = new THREE.Euler(1, 1, 1, 1, 'ui')
    // const size = new THREE.Vector3(1, 1, 1)
    // const sticker = new DecalGeometry(meshBox, position, orientation, size)
    // const stickermaterial = new MeshBasicMaterial({ color: 0x00ff00 })
    // const meshSticker = new Mesh(sticker, stickermaterial)

    // this.container.add(meshSticker)
    // this.objects.push(meshSticker)
    this.objects.push(mesh3D)
  }
  createControls() {
    const controls = new DragControls(
      [...this.objects],
      this.camera.camera,
      this.renderer.domElement
    )
    /* 
    console.log(controls)
   
    controls.addEventListener('dragstart', function (event) {
      event.object.material.emissive.set( 0x000000 );
    })
 
  this.controls.addEventListener( 'dragend', function ( event ) {

      event.object.material.emissive.set( 0x000000 );

  } );*/
  }
  setMovement() {
    this.time.on('tick', () => {
      this.bottle.rotation.y += 0.005
    })
  }
}
