<script>
  import { user } from '../store'
  import { goto, metatags } from '@roxi/routify'
  import Login from '../Components/Login.svelte'

  metatags.title = 'Login • Etodos'

  $: if ($user) $goto('/todo')
</script>

{#if !$user}
  <Login />
{/if}
