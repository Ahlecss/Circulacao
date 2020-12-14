import { Object3D, MeshBasicMaterial, MeshLambertMaterial, Mesh, Vector3, Euler, TextureLoader } from 'three'
import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import etiquette from '@textures/etiquette.jpg'
import etiquetteCoca from '@textures/etiquetteCoca.png'
import gsap from 'gsap'

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
    this.tweenTopRight = 0
    this.tweenBottomRight = 0
    this.tweenTopLeft = 0
    this.tweenBottomLeft = 0
    this.tweenOpacity = 0
    this.material

    this.createSticker()
    this.createControls()
    // this.setMovement()
  }
  createSticker() {
    const textureEtiquette = new TextureLoader().load(etiquette);
    
    const material = new MeshLambertMaterial({ map: textureEtiquette })
    const mesh3D = new Mesh(this.bottle.bottle.sticker.geometry, material)
    mesh3D.scale.set(0.1, 0.1, 0.1)
    mesh3D.rotation.set(-0.15, 0, 0)  
    mesh3D.position.set(0, -1.5, 0.1)
    this.container.add(mesh3D)
    
    const position = new THREE.Vector3(1, 1, 1)
    const orientation = new THREE.Euler(1, 1, 1, 1, 'ui')
    const size = new THREE.Vector3(1, 1, 1)
    const geometry = new DecalGeometry(mesh3D, position, orientation, size)
    const material2 = new MeshBasicMaterial({ color: 0x00ff00 })
    const mesh2 = new Mesh(geometry, material2)
    this.objects.push(mesh3D);
    console.log(this.objects);

    this.tweenTopRight = gsap.to(mesh3D.position, {duration: 0.8, x: 10, y: -10});
    this.tweenTopRight.pause()
    this.tweenBottomRight = gsap.to(mesh3D.position, {duration: 0.8, x: 10, y: 10});
    this.tweenBottomRight.pause()
    this.tweenTopLeft  = gsap.to(mesh3D.position, {duration: 0.8, x: -10, y: -10});
    this.tweenTopLeft.pause()
    this.tweenBottomLeft  = gsap.to(mesh3D.position, {duration: 0.8, x: -10, y: 10});
    this.tweenBottomLeft.pause()
    this.tweenOpacity = gsap.to(material, {duration: 0.8, opacity: 0, transparent: true});
    this.tweenOpacity.pause()
    
  }
  createControls() {
    const controls = new DragControls( [...this.objects], this.camera.camera, this.renderer.domElement );
    const tweenTopRight = this.tweenTopRight;
    const tweenBottomRight = this.tweenBottomRight;
    const tweenTopLeft = this.tweenTopLeft;
    const tweenBottomLeft = this.tweenBottomLeft;
    const tweenOpacity = this.tweenOpacity;
    const objectsY = this.objects[0].position.y;
    const objectsZ = this.objects[0].position.z;
    controls.addEventListener( 'drag', function ( event ) {
      //event.object.position.y = objectsY;
      //event.object.position.z = objectsZ;
      
    } );
    controls.addEventListener( 'dragend', function ( event ) {
      if(event.object.position.x > 1.25) {
        if(event.object.position.y > 1.25) {
        tweenTopRight.play();
        tweenOpacity.play();
      } else if(event.object.position.y > -1.25) {
        tweenBottomRight.play();
        tweenOpacity.play();
        }
      }
      else if(event.object.position.x < -1.25) {
        if(event.object.position.y < -1.25) {
          tweenTopLeft.play();
          tweenOpacity.play();
        } else if(event.object.position.y < 1.25) {
          tweenBottomLeft.play();
          tweenOpacity.play();
          }
      }
    } );
  }
  setMovement() {
    this.time.on('tick', () => {
      this.bottle.rotation.y += 0.005
    })
  }
}
