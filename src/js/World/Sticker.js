import { Object3D, MeshBasicMaterial, Mesh, Vector3, Euler } from 'three'
import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

export default class Sticker {
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
    // console.log(this.bottle.bottle.label.geometry)
    // console.log(this.bottle.bottle.shape.geometry)
    // this.bottle.bottle.scale.set(0.1, 0.1, 0.1)
    // this.bottle.bottle.rotation.set(-0.1, 5, 0)
    // this.bottle.bottle.position.set(0, -3, 0)

    const box = new THREE.BoxGeometry(1, 1, 1)
    // console.log(box)
    const material = new MeshBasicMaterial({ color: 0x0000ff })
    const meshBox = new Mesh(box, material)
    const mesh3D = new Mesh(this.bottle.bottle.label.geometry, material)
    // console.log(meshBox);
    // console.log(mesh3D);
    mesh3D.scale.set(0.05, 0.05, 0.05)
    this.objects.push( mesh3D )
    this.container.add(mesh3D)

    const position = new THREE.Vector3(1, 1, 1)
    const orientation = new THREE.Euler(1, 1, 1, 1, 'ui')
    const size = new THREE.Vector3(1, 1, 1)
    const geometry = new DecalGeometry(meshBox, position, orientation, size)
    const material2 = new MeshBasicMaterial({ color: 0x00ff00 })
    const mesh2 = new Mesh(geometry, material2)
    this.container.add(mesh2)
  }
  createControls() {
    const controls = new DragControls( this.objects, this.camera.camera, this.renderer.domElement );
  }
  setMovement() {
    this.time.on('tick', () => {
      this.bottle.rotation.y += 0.005
    })
  }
}
