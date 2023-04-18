<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="email"
      class="mb-3"
      type="email"
      :label="t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
      @mousedown="
        () => {
          emailErrors = []
        }
      "
    />

    <va-input
      v-model="password"
      class="mb-3"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
      @mousedown="
        () => {
          passwordErrors = []
        }
      "
    />

    <div class="auth-layout__options d-flex align-center justify-space-between">
      <div></div>
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
        t('auth.recover_password')
      }}</router-link>
    </div>

    <div class="d-flex justify-center mt-3">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import service from '../../../../src/auth/service'
  import { ToastPosition, useToast } from 'vuestic-ui'
  const { t } = useI18n()

  const email = ref('')
  const password = ref('')
  const keepLoggedIn = ref(false)
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const router = useRouter()

  const { init } = useToast()
  const toastText = ref('Login Successful!')
  const toastDuration = ref(2500)
  const toastPosition = ref<ToastPosition>('top-right')

  const formReady = computed(() => !emailErrors.value.length && !passwordErrors.value.length)

  const setLogin = new service()
  function onsubmit() {
    if (email.value !== '' && password.value !== '') {
      var data = JSON.stringify({
        email: email.value,
        password: password.value,
        deviceToken: '123',
      })
      setLogin
        .login(data)
        .then((response) => {
          localStorage.setItem('accessToken', JSON.stringify(response.data.data.token))
          localStorage.setItem('isUser', 'true')

          init({
            message: toastText.value,
            position: toastPosition.value,
            duration: Number(toastDuration.value),
            color: 'primary',
          })

          return router.push({ name: 'dashboard' })
        })
        .catch((error) => {
          console.log(error.response)
          emailErrors.value = ['Invalid Credentials']
          passwordErrors.value = ['Invalid Credentials']
        })
    } else {
      emailErrors.value = email.value ? [] : ['Email is required']
      passwordErrors.value = password.value ? [] : ['Password is required']
      return
    }
  }
</script>
