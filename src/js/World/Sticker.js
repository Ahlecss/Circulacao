import { Object3D, MeshBasicMaterial, Mesh, Vector3, Euler, TextureLoader } from 'three'
import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import CocaTexture from '@textures/coca.png'

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
    const texture = new TextureLoader().load(CocaTexture);

    const material = new MeshBasicMaterial({ map: texture })
    const mesh3D = new Mesh(this.bottle.bottle.label.geometry, material)
    mesh3D.scale.set(0.05, 0.05, 0.05)
    this.objects.push( mesh3D )
    this.container.add(mesh3D)

    const position = new THREE.Vector3(1, 1, 1)
    const orientation = new THREE.Euler(1, 1, 1, 1, 'ui')
    const size = new THREE.Vector3(1, 1, 1)
    const geometry = new DecalGeometry(mesh3D, position, orientation, size)
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
