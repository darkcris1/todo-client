<script>
  import { Button, MaterialApp, Snackbar } from 'svelte-materialify'
  import { theme, error } from '../store'
  import { session } from '../services/auth'
  import Serviceworker from '../Serviceworker.svelte'
  import Navbar from '../Components/Navbar.svelte'
  import { metatags } from '@roxi/routify'

  metatags.description = 'A simple realtime todo lists'
</script>

<Snackbar bind:active={$error} right top class="error-color" timeout={4000}>
  {$error}
  <Button class="ma-0" text on:click={() => error.set(false)}>Close</Button>
</Snackbar>
<Serviceworker />
<MaterialApp theme={$theme}>
  <Navbar />
  {#await session() then _}
    <main style="position: relative;width: 100%">
      <slot />

    </main>
  {/await}
</MaterialApp>
