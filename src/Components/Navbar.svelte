<script>
  import { AppBar, Menu, List, ListItem, Icon } from 'svelte-materialify'
  import ButtonIcon from './ButtonIcon.svelte'
  import {
    mdiAccount,
    mdiWeatherNight,
    mdiWeatherSunny,
    mdiLogout,
    mdiPlusBox,
  } from '@mdi/js'
  import { user, theme, todos, todoStatus, error } from '../store'
  import http from '../http'
  function toggleTheme() {
    theme.update((prev) => {
      if (prev === 'light') return 'dark'
      return 'light'
    })
  }
  async function handleLogout() {
    // Reset the stores
    try {
      await http.get('/auth/logout')
      user.set(null)
      todos.set([])
      todoStatus.set({ error: false, isLoading: false })
    } catch (err) {
      error.set('Connection Error while signing out')
    }
  }
</script>

<AppBar>
  <a slot="title" href="/" class="text--primary">
    ETodos
    <Icon path={mdiPlusBox} />
  </a>

  <div style="flex-grow:1" />
  {#if $user}
    <div>{$user.username}</div>
    <Menu hover right>
      <div slot="activator">
        <ButtonIcon aria-label="avatar icon" icon={mdiAccount} />
      </div>
      <List>
        <ListItem on:click={handleLogout}>
          <Icon path={mdiLogout} class="ma-0" />
          Logout
        </ListItem>
      </List>
    </Menu>
  {/if}
  <ButtonIcon
    aria-label="change theme"
    icon={$theme === 'light' ? mdiWeatherNight : mdiWeatherSunny}
    on:click={toggleTheme} />
</AppBar>
