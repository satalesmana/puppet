<script setup lang="ts">
import { Notify, Loading, QSpinnerFacebook } from 'quasar';

definePageMeta({
  layout: 'empty',
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});
const email = ref('');
const password = ref('');
const { signIn } = useAuth();

const submitLogin = async (e) => {
  try {
    e.preventDefault();
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading fetch data...',
    });

    await signIn(
      { username: email.value, password: password.value },
      { callbackUrl: '/' },
    );
  } catch (error) {
    Notify.create({
      color: 'negative',
      message: 'Sign in failed. Check the details you provided are correct.',
    });
  } finally {
    Loading.hide();
  }
};
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="email"
              dense
              outlined
              label="Email Address"
            ></q-input>
            <q-input
              v-model="password"
              dense
              outlined
              class="q-mt-md"
              type="password"
              label="Password"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="Sign in"
              no-caps
              class="full-width"
              @click="submitLogin"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Don't have an account yet?
              <a
                href="#"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Sign up.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
