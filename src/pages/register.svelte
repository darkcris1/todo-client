<script>
  import jm from 'json-msg'
  import { metatags, goto } from '@roxi/routify'
  import { Button, Overlay, Divider, Alert, Card } from 'svelte-materialify'
  import { mdiAccount, mdiKey } from '@mdi/js'
  import { send, receive } from '../crossfade'
  import { loginUser } from '../services/auth'
  import { theme, user } from '../store'
  import http from '../http'
  import { tick } from 'svelte'
  import Input from '../Components/Input.svelte'

  metatags.title = 'Register • Todo App'
  metatags.description = 'Register to get started'

  $: $user && $goto('/todo')

  let errorMsg = ''
  let isRegistering = false
  let inputs = {
    username: '',
    password: '',
    confirmPassword: '',
  }
  let errors = {
    username: '',
    password: '',
    confirmPassword: '',
  }
  const registerSchema = {
    username: jm.str({ min: 4, alphanum: true, max: 50, label: 'Username' }),
    password: jm.str({ min: 4, max: 50, label: 'Password' }),
    confirmPassword: jm.sameAs('password'),
  }
  async function handleSubmit() {
    const errorsMsg = jm.validate(inputs, registerSchema, { abortEarly: false })
    errors = {}
    errorMsg = ''
    await tick()
    if (errorsMsg) {
      errors = errorsMsg
      return
    }
    try {
      isRegistering = true
      const res = await http.post('/auth/register', inputs)
      loginUser(res)
    } catch (error) {
      if (error.response.status !== 500) {
        errorMsg = error.response.data.message
      } else {
        errorMsg = 'Unexpected Error Occured'
      }
    } finally {
      isRegistering = false
    }
  }
  const centerClass = 'd-flex justify-center align-center '
  $: background = $theme === 'light' ? 'white' : 'grey darken-4'
</script>

{#if !$user}
  <Overlay>

    <div class={centerClass + 'pa-4'}>
      <form
        in:send={{ key: 'PAGETRANSITION', duration: 1000 }}
        out:receive={{ key: 'PAGETRANSITION' }}
        style={`max-width: 100%;`}
        on:submit|preventDefault={handleSubmit}>
        <Card
          style="width: 25rem;"
          class={`rounded elevation-2 ${background}`}
          disabled={isRegistering}
          loading={isRegistering}>
          <div class={`pa-4`}>

            <h2 class="mb-10 text-center">Register</h2>
            {#if errorMsg}
              <Alert class="error-color" dense>{errorMsg}</Alert>
            {/if}
            <Input
              bind:value={inputs.username}
              clearable
              outlined
              error={errors.username}
              label="Username"
              icon={mdiAccount} />
            <Input
              bind:value={inputs.password}
              error={errors.password}
              type="password"
              outlined
              icon={mdiKey}
              label="Password" />
            <Input
              bind:value={inputs.confirmPassword}
              outlined
              icon={mdiKey}
              type="password"
              error={errors.confirmPassword}
              label="Confirm Password" />

            <Button
              block
              disabled={isRegistering}
              size="large"
              type="submit"
              class="primary-color"
              rounded>
              Register
            </Button>
            <Divider class="mt-2 mb-2" />

            <a href="/">
              <Button
                block
                size="large"
                type="submit"
                class="primary-color"
                rounded>
                Already have an account ?
              </Button>
            </a>
          </div>
        </Card>
      </form>
    </div>
  </Overlay>
{/if}
