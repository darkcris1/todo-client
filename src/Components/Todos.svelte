<script>
  import { ListItem, Ripple, Icon } from 'svelte-materialify'
  import ButtonIcon from './ButtonIcon.svelte'
  import { fade } from 'svelte/transition'
  import { send, receive } from '../crossfade'
  import { todos, todoDispatch } from '../store'
  import { mdiPencil, mdiTrashCan, mdiCheck, mdiMagnify } from '@mdi/js'
  export let handleEdit = () => ''
</script>

<div
  transition:fade
  class="d-flex justify-center align-center"
  style="width: 100%">
  <div class="rounded elevation-2 pa-5 " style="width: 100%;height: 100%">
    <div class="d-flex justify-space-between align-center mb-10">
    <h2>Todos</h2>
     <ButtonIcon
        on:click={() => todoDispatch({ action: 'DELETE_ALL_TODOS' })}
        icon={mdiTrashCan}
        tooltip={'Delete All Todos'} />
  </div>
    {#each $todos.filter((t) => !t.complete) as todo (todo.id)}
      <div in:send={{ key: todo.id }} out:receive={{ key: todo.id }} use:Ripple>
        <ListItem class="pa-0" selectable ripple={false}>
          {todo.todo}
          <div slot="append" class="d-flex">
            <ButtonIcon
              icon={mdiPencil}
              on:click={() => handleEdit(todo)}
              tooltip={'Edit'} />
            <ButtonIcon
              on:click={() => todoDispatch({ action: 'DONE', item: todo })}
              icon={mdiCheck}
              tooltip={'Done'} />
          </div>
        </ListItem>
      </div>
    {:else}
      <p class="text-center">
        You have no todos yet
        <Icon path={mdiMagnify} />
      </p>
    {/each}
  </div>

</div>
