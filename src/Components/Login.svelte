<script>
  import { Alert, Button, Divider, Card } from 'svelte-materialify'
  import { mdiAccount, mdiKey } from '@mdi/js'
  import { send, receive } from '../crossfade'
  import Input from './Input.svelte'
  import http from '../http'
  import jm from 'json-msg'
  import { tick } from 'svelte'
  import { loginUser } from '../services/auth'
  import { goto } from '@roxi/routify'
  let errorMsg = ''
  let isSigning = false

  let inputs = {
    username: '',
    password: '',
  }
  let errors = {
    username: '',
    password: '',
  }
  const loginSchema = {
    username: jm.str({ min: 4, alphanum: true, max: 50, label: 'Username' }),
    password: jm.str({ min: 4, max: 50, label: 'Password' }),
  }
  async function handleSubmit() {
    const errorsMsg = jm.validate(inputs, loginSchema, { abortEarly: false })
    errors = {}
    errorMsg = ''
    await tick()
    if (errorsMsg) {
      errors = errorsMsg
      return
    }
    try {
      isSigning = true
      const res = await http.post('/auth/login', inputs)
      loginUser(res)
      $goto('/todo')
    } catch (error) {
      const status = error.response?.status
      if (status >= 400 && status < 500) {
        errorMsg = error.response.data.message
      }
    } finally {
      isSigning = false
    }
  }
  const centerClass = 'd-flex justify-center align-center '
</script>

<div class={centerClass + 'pa-4'}>
  <form
    in:send={{ key: 'PAGETRANSITION' }}
    out:receive={{ key: 'PAGETRANSITION' }}
    style={`max-width: 100%`}
    on:submit|preventDefault={handleSubmit}>
    <Card
      disabled={isSigning}
      style="width: 25rem; max-width: 100%; "
      class="rounded elevation-3"
      loading={isSigning}>
      <div class="pa-4">
        <h2 class="mb-10 text-center">Login</h2>
        {#if errorMsg}
          <Alert class="error-color" dense>{errorMsg}</Alert>
        {/if}
        <Input
          clearable
          outlined
          error={errors.username}
          bind:value={inputs.username}
          label="Username"
          icon={mdiAccount} />

        <Input
          clearable
          outlined
          type="password"
          error={errors.password}
          bind:value={inputs.password}
          label="Password"
          icon={mdiKey} />

        <div>
          <Button
            block
            size="large"
            type="submit"
            class="primary-color"
            rounded>
            Login
          </Button>
        </div>
        <Divider class="mt-2 mb-2" />
        <a href="/register">
          <Button
            block
            size="large"
            type="submit"
            class="primary-color"
            rounded>
            No Account Yet ?
          </Button>
        </a>
      </div>
    </Card>
  </form>
</div>
