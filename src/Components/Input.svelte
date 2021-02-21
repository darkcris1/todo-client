<script>
  import { TextField, Icon } from 'svelte-materialify'
  export { className as class }
  export let error = ''
  export let value = ''
  export let icon = ''
  export let label = ''
  let className = ''
  $: errorMsg = error ? error : ''
</script>

{#if icon}
  <TextField
    bind:value
    error={!!error}
    messages={errorMsg}
    {...$$restProps}
    class={`mb-2 mt-2 ${className}`}>
    {label}
    <div slot="prepend">
      <Icon path={icon} />
    </div>
    <slot name="append" slot="append" />
  </TextField>
{:else}

  <TextField
    bind:value
    error={!!error}
    messages={errorMsg}
    {...$$restProps}
    class={`mb-2 mt-2 ${className}`}>
    {label}
    <slot name="append" slot="append" />
    <slot name="prepend" slot="prepend" />
  </TextField>
{/if}
