<script>
  import { Icon } from 'svelte-materialify'
  import ButtonIcon from './ButtonIcon.svelte'
  import { fade } from 'svelte/transition'
  import { mdiTrashCan, mdiRefresh } from '@mdi/js'
  import Placeholder from './Placeholder.svelte'
  import { todoStatus } from '../store'
  export let title = 'Todos'
  export let handleDelete = () => ''
</script>

<style>
  .title {
    font-size: 1.7rem;
  }
</style>

<div
  transition:fade
  class="d-flex justify-center align-center purple-text"
  style="width: 100%">
  <div class="rounded elevation-2 pa-5 " style="width: 100%; ">
    <div class="d-flex justify-space-between align-center mb-10">
      <div class="title">{title}</div>
      <ButtonIcon
        on:click={handleDelete}
        icon={mdiTrashCan}
        tooltip={'Delete All'} />
    </div>
    {#if !$todoStatus.isLoading}
      {#if !$todoStatus.error}
        <slot />
      {:else}
        <p class="text-center ">
          Error Occured while loading
          <Icon path={mdiRefresh} />
        </p>
      {/if}
    {:else}
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    {/if}
  </div>

</div>
