<script>
  import { ListItem, Ripple, Icon } from 'svelte-materialify'
  import ButtonIcon from './ButtonIcon.svelte'
  import { send, receive } from '../crossfade'
  import { todos, todoDispatch } from '../store'
  import { mdiClose, mdiUndo, mdiMagnify } from '@mdi/js'
  import TodoLayout from './TodoLayout.svelte'
  import { flip } from 'svelte/animate'
</script>

<TodoLayout
  title="Done"
  handleDelete={() => todoDispatch({ action: 'DELETE_COMPLETED_TODO' })}>
  {#each $todos.filter((t) => t.complete) as todo (todo.id)}
    <div
      animate:flip
      in:send={{ key: todo.id }}
      out:receive={{ key: todo.id }}
      use:Ripple>
      <ListItem selectable class="purple-text pa-0">
        <span style="text-decoration: line-through">{todo.todo}</span>

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
    <!-- If The todos is empty message -->
    <p class="text-center ">
      Nothing is completed
      <Icon path={mdiMagnify} class="purple-text" />

    </p>
  {/each}
</TodoLayout>
