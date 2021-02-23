import { quintOut } from 'svelte/easing'
import { crossfade } from 'svelte/transition'

const [send, receive] = crossfade({
  easing: quintOut,
  duration: 800,
  fallback(node) {
    const style = getComputedStyle(node)
    const transform = style.transform === 'none' ? '' : style.transform

    return {
      easing: quintOut,
      css: (t) => `
                transform: ${transform} scale(${t});
                opacity: ${t}
            `,
    }
  },
})
export { send, receive }
