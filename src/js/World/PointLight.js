import { Object3D, PointLight, Color, Vector3 } from 'three'

export default class PointLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug
    this.posX = options.posX
    this.posY = options.posY
    this.posZ = options.posZ
    this.camera = options.camera

    // Set up
    this.container = new Object3D()
    this.container.name = 'Point Light'
    this.params = {
      color: 0xffffff,
      positionX: this.posX,
      positionY: this.posY,
      positionZ: this.posZ,
    }

    this.createPointLight()
    this.updatePointLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createPointLight() {
    this.light = new PointLight(this.params.color)
    this.light.castShadow = true
    this.light.position.set(
      this.params.positionX,
      this.params.positionY,
      this.params.positionZ
    )
    this.container.add(this.light)

  }
  updatePointLight(){
    document.addEventListener('mousemove', event => {
      console.log(this.camera)

      event.preventDefault();
      this.params.positionX = (event.clientX / window.innerWidth) * 2 - 1;
      this.params.positionY = - (event.clientY / window.innerHeight) * 2 + 1;

       // Make the sphere follow the mouse
      var vector = new Vector3(this.params.positionX, this.params.positionY, 0.5);
      console.log(this.camera.position);
      vector.unproject( this.camera.camera );
      var dir = vector.sub( this.camera.camera.position ).normalize();
      var distance = - this.camera.camera.position.z / dir.z;
      var pos = this.camera.camera.position.clone().add( dir.multiplyScalar( distance ) );
      console.log(pos)
      this.light.position.copy(pos);
      
    }, false);
  }
  setDebug() {
    // Color debug
    this.debugFolder = this.debug.addFolder('Point Light')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new Color(this.params.color)
      })
    //Position debug
    this.debugFolder
      .add(this.light.position, 'x')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position X')
    this.debugFolder
      .add(this.light.position, 'y')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position Y')
    this.debugFolder
      .add(this.light.position, 'z')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position Z')
  }
}
