export default class Sound {
  constructor() {
    this.init()
  }
  init() {
    var AudioContext = window.AudioContext || window.webkitAudioContext
    var audioCtx = new AudioContext()

    var myAudio = document.querySelector('audio')
    const track = audioCtx.createMediaElementSource(myAudio)

    track.connect(audioCtx.destination)
    myAudio.play()
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
