<script>
  import Login from '../Components/Login.svelte'
  import Todo from '../Components/todo.svelte'
  import { user } from '../store'
  import { metatags } from '@roxi/routify'

  metatags.title = 'My Todo App • Svelte'
  metatags.description = 'A simple realtime todo lists'
</script>

{#if !$user}
  <Login />
{:else}
  <Todo />
{/if}
