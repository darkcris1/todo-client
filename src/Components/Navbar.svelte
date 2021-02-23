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
  import { user, theme } from '../store'
  import { logoutUser } from '../services/auth'

  function toggleTheme() {
    theme.update((prev) => {
      if (prev === 'light') return 'dark'
      return 'light'
    })
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
        <ListItem on:click={logoutUser}>
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
