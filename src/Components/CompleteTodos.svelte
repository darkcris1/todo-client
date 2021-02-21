<script>
  import { ListItem, Ripple, Icon } from 'svelte-materialify'
  import ButtonIcon from './ButtonIcon.svelte'
  import { fade } from 'svelte/transition'
  import { send, receive } from '../crossfade'
  import { todos, todoDispatch } from '../store'
  import { mdiClose , mdiTrashCan, mdiUndo, mdiMagnify } from '@mdi/js'
</script>

<div
  transition:fade
  class="d-flex justify-center align-center purple-text"
  style="width: 100%">
  <div class="rounded elevation-2 pa-5 " style="width: 100%; ">
  <div class="d-flex justify-space-between align-center mb-10">
    <h2>Completed </h2>
     <ButtonIcon
        on:click={() => todoDispatch({ action: 'DELETE_COMPLETED_TODO' })}
        icon={mdiTrashCan}
        tooltip={'Delete All Completed Todos'} />
  </div>
    {#each $todos.filter((t) => t.complete) as todo (todo.id)}
      <div in:send={{ key: todo.id }} out:receive={{ key: todo.id }} use:Ripple>
        <ListItem selectable class="purple-text pa-0" style="font-weight: bold">
          {todo.todo}
          <div slot="append">

            <ButtonIcon
              on:click={() => todoDispatch({ action: 'UNDO', item: todo })}
              icon={mdiUndo}
              tooltip={'Restore'} />
            <ButtonIcon
              icon={mdiClose}
              on:click={() => todoDispatch({ action: 'DELETE', item: todo })}
              tooltip={'Delete'} />
          </div>
        </ListItem>
      </div>
    {:else}
      <p class="text-center ">
        Nothing is completed
        <Icon path={mdiMagnify} class="purple-text" />

      </p>
    {/each}
  </div>

</div>
