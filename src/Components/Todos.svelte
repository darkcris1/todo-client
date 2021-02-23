<script>
  import { ListItem, Ripple, Icon } from 'svelte-materialify'
  import TodoLayout from './TodoLayout.svelte'
  import ButtonIcon from './ButtonIcon.svelte'
  import { send, receive } from '../crossfade'
  import { todos, todoDispatch } from '../store'
  import { mdiPencil, mdiCheck, mdiMagnify } from '@mdi/js'
  import { flip } from 'svelte/animate'

  export let handleEdit = () => ''
</script>

<TodoLayout
  title="Todos"
  handleDelete={() => todoDispatch({ action: 'DELETE_ALL_TODOS' })}>
  {#each $todos.filter((t) => !t.complete) as todo (todo.id)}
    <div
      animate:flip
      in:send={{ key: todo.id }}
      out:receive={{ key: todo.id }}
      use:Ripple>
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
</TodoLayout>
