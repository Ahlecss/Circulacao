import { Object3D, MeshBasicMaterial, MeshLambertMaterial, Mesh, Vector3, Euler, TextureLoader } from 'three'
import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import etiquette from '@textures/etiquette.jpg'

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
    const texture = new TextureLoader().load(etiquette);

    const material = new MeshLambertMaterial({ map: texture })
    const mesh3D = new Mesh(this.bottle.bottle.sticker.geometry, material)
    mesh3D.scale.set(0.1, 0.1, 0.1)
    mesh3D.rotation.set(-0.15, 0, 0)
    mesh3D.position.set(0, -1.5, -0.1)
    this.container.add(mesh3D)

    const position = new THREE.Vector3(1, 1, 1)
    const orientation = new THREE.Euler(1, 1, 1, 1, 'ui')
    const size = new THREE.Vector3(1, 1, 1)
    const geometry = new DecalGeometry(mesh3D, position, orientation, size)
    const material2 = new MeshBasicMaterial({ color: 0x00ff00 })
    const mesh2 = new Mesh(geometry, material2)
    this.objects.push(mesh3D);
    console.log(this.objects);

  }
  createControls() {
    const controls = new DragControls( [...this.objects], this.camera.camera, this.renderer.domElement );
    const objectsY = this.objects[0].position.y;
    const objectsZ = this.objects[0].position.z;
    controls.addEventListener( 'drag', function ( event ) {
      event.object.position.y = objectsY;
      event.object.position.z = objectsZ;
    
    } );
  }
  setMovement() {
    this.time.on('tick', () => {
      this.bottle.rotation.y += 0.005
    })
  }
}
