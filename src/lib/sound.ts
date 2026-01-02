'use client'

export class SoundManager {
  private audioContext: AudioContext | null = null
  private isMuted = false

  private getAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }

  playCorrect() {
    if (this.isMuted) return
    const ctx = this.getAudioContext()
    this.playTone(ctx, 659, 0.1, 0.1) // E
    setTimeout(() => this.playTone(ctx, 784, 0.1, 0.1), 150) // G
    setTimeout(() => this.playTone(ctx, 1047, 0.2, 0.2), 300) // C
  }

  playIncorrect() {
    if (this.isMuted) return
    const ctx = this.getAudioContext()
    this.playTone(ctx, 349, 0.15, 0.2) // F
    setTimeout(() => this.playTone(ctx, 293, 0.15, 0.2), 150) // D
  }

  playLevelUp() {
    if (this.isMuted) return
    const ctx = this.getAudioContext()
    const notes = [523, 659, 784, 1047] // C, E, G, C
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(ctx, freq, 0.1, 0.15), idx * 150)
    })
  }

  private playTone(context: AudioContext, frequency: number, duration: number, volume = 0.3) {
    const osc = context.createOscillator()
    const gain = context.createGain()

    osc.connect(gain)
    gain.connect(context.destination)

    osc.frequency.value = frequency
    gain.gain.setValueAtTime(volume, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration)

    osc.start(context.currentTime)
    osc.stop(context.currentTime + duration)
  }

  toggleMute() {
    this.isMuted = !this.isMuted
  }
}

export const soundManager = new SoundManager()
