import { crossfade, fly } from 'svelte/transition'
const [send, receive] = crossfade({
  duration: 800,

  fallback(node) {
    return fly(node, {
      x: 200,
    })
  },
})

export { send, receive }
