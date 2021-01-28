export default class Sound {
  constructor(options) {
    // Set options
    this.soundScene = options.soundScene
    this.autoplay = options.autoplay
    this.init()
    window.addEventListener('load', this.init, false)
  }
  init() {
    try {
      // Fix up for prefixing
      var AudioContext = window.AudioContext || window.webkitAudioContext
      var audioCtx = new AudioContext()
    } catch (e) {
      alert('Web Audio API is not supported in this browser')
    }
    console.log(this.soundScene)
    var myAudio = document.getElementById(this.soundScene)
    var button = document.getElementById('start-experience')
    const track = audioCtx.createMediaElementSource(myAudio)

    if(this.autoplay) {
      track.connect(audioCtx.destination)
      myAudio.play()
    } else {
    button.addEventListener('click', () => {
      console.log('lancé')
      track.connect(audioCtx.destination)
      myAudio.play()
    })
    }
  }
  setMovement() {
    document.addEventListener(
      'mousemove',
      (event) => {
        event.preventDefault()
        var rotationX = ((event.clientX / window.innerWidth) * 2 - 1) / 4
        this.bottle.rotation.set(0.1, 4.7 + rotationX, 0)
      },
      false
    )
  }
}
