<script>
  import { user } from '../store'
  import { goto, metatags } from '@roxi/routify'
  import Login from '../Components/Login.svelte'

  metatags.title = 'Login • Etodos'
</script>

{#if !$user}
  <Login />
{:else}{$goto('/todo')}{/if}
