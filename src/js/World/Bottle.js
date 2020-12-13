import { Object3D } from 'three'
import * as THREE from 'three'
import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default class Bottle {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Bottle'

    this.createBottle()
    this.setMovement()
  }
  createBottle() {
    this.bottle = this.assets.models.bottle.scene

    this.bottle.cap = this.bottle.children[0].children[0]
    this.bottle.label = this.bottle.children[0].children[1]
    this.bottle.shape = this.bottle.children[0].children[2]

    this.bottle.shape.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      opacity: 0.3,
      transparent: true,
      refractionRatio: 0.8,
    })

    this.bottle.scale.set(0.1, 0.1, 0.1)
    this.bottle.rotation.set(-0.1, 5, 0)
    this.bottle.position.set(0, -3, 0)
    this.container.add(this.bottle)
  }
  setMovement() {
    gsap.registerPlugin(ScrollTrigger)

    const scroller = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    })

    scroller.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy('.container', {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: '100vh',
        }
      },
    })

    gsap.to('.container', {
      scrollTrigger: {
        scroller: document.querySelector('.container'), //locomotive-scroll
        scrub: true,
        trigger: '.container',
        pin: true,
        // anticipatePin: 1,
        start: 'top top',
        scrub: 2,
        end: document.querySelector('.container').offsetWidth,
      },
      x: -(
        document.querySelector('.container').offsetWidth - window.innerWidth
      ),
      ease: 'none',
    })

    ScrollTrigger.create({
      trigger: '.image-mask',
      scroller: '.container',
      start: 'top+=30% 50%',
      end: 'bottom-=40% 50%',
      animation: gsap.to('.image-mask', { backgroundSize: '120%' }),
      scrub: 2,
      // markers: true
    })

    ScrollTrigger.addEventListener('refresh', () => scroller.update())

    ScrollTrigger.refresh()

    // var rellax = new Rellax('.rellax', {
    //   speed: -2,
    //   center: false,
    //   wrapper: null,
    //   round: true,
    //   vertical: true,
    //   horizontal: false,
    // })
  }
}
