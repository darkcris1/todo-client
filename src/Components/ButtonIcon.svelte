<script>
  import { Icon, Tooltip, Button } from 'svelte-materialify'
  export let icon = null
  export let tooltip = ''
  let className = ''
  export { className as class }
</script>

{#if tooltip}
  <Tooltip top>
    <Button
      {...$$restProps}
      fab
      depressed
      text
      class={'ma-0 ' + className}
      on:click>
      <Icon path={icon} />
    </Button>
    <span slot="tip">{tooltip}</span>

  </Tooltip>
{:else}
  <Button
    {...$$restProps}
    fab
    depressed
    text
    class={'ma-0 ' + className}
    on:click>
    <Icon path={icon} />
  </Button>
{/if}
