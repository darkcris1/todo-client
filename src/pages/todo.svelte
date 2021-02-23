<script>
  import {
    TextField,
    Icon,
    Button,
    Row,
    Col,
    Overlay,
  } from 'svelte-materialify'
  import { mdiPlusCircle } from '@mdi/js'
  import { send, receive } from '../crossfade'
  import { uid } from '../utils'
  import { todoDispatch, user, theme } from '../store'
  import Todos from '../Components/Todos.svelte'
  import CompleteTodos from '../Components/CompleteTodos.svelte'
  import { goto, metatags } from '@roxi/routify'

  $: !$user && $goto('/')
  metatags.title = `${$user && $user.username} • Etodos`

  let value = ''
  let editTodo
  let active = false
  const maxLength = 30

  async function handleSubmit() {
    if (!value || value.length > maxLength) return
    const todoToBeAdded = {
      todo: value,
      id: uid(),
      complete: false,
    }
    todoDispatch({ action: 'ADD', item: todoToBeAdded })
    value = ''
  }

  function handleEdit(item) {
    todoDispatch({ action: 'DELETE', item })
    editTodo = item
    active = true
  }
  function handleClose(item) {
    if (!item.todo || item.todo.length > maxLength) return
    todoDispatch({ action: 'ADD', item })
    active = false
  }

  const centerClass = 'd-flex justify-center align-center'
  const CROSSFADE_KEY = 'EDIT_PAGETRANSITION'
</script>

{#if $user}

  <Row class="ma-2">
    <Col cols={12} md={4}>
      {#if !active}
        <div class={centerClass + 'pa-4'} style="width: 100%">
          <form
            in:send={{ key: CROSSFADE_KEY }}
            out:receive={{ key: CROSSFADE_KEY }}
            class="rounded elevation-2 pa-5 "
            style={`width: 100%`}
            on:submit|preventDefault={handleSubmit}>
            <h2 class="mb-10 text-center">Add Todo</h2>
            <TextField
              class="mt-2 mb-2"
              counter={maxLength}
              rules={[() => value.length < maxLength || `Length must be less than ${maxLength}`]}
              bind:value>
              Add Todo
            </TextField>
            <div>
              <Button type="submit" class="primary-color" block>
                Add
                <Icon path={mdiPlusCircle} style="cursor:pointer" />
              </Button>
            </div>
          </form>

        </div>
      {/if}
    </Col>
    <Col cols={12} md={4}>
      <Todos {handleEdit} />
    </Col>
    <Col cols={12} md={4}>
      <CompleteTodos />
    </Col>
  </Row>

  <!-- Edit Overlay -->
  <Overlay {active}>
    <form
      in:send={{ key: CROSSFADE_KEY }}
      out:receive={{ key: CROSSFADE_KEY }}
      on:submit|preventDefault={() => handleClose(editTodo)}
      class={`white pa-4 rounded elevation-4 ${$theme === 'light' ? 'white' : 'grey darken-4'}`}
      style="width: 25rem; max-width: 100%; ">
      <div in:send={{ key: editTodo.id }} out:receive={{ key: editTodo.id }}>
        <TextField
          counter={maxLength}
          rules={[() => editTodo.todo.length < maxLength || `Length must be less than ${maxLength}`]}
          class="mt-2 mb-2"
          bind:value={editTodo.todo}>
          Edit Todo
        </TextField>

      </div>

      <Button class="primary-color" type="submit">Edit</Button>

    </form>
  </Overlay>
{/if}
