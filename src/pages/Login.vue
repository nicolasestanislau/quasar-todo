<template>
  <q-page class="bg-grey-3 q-pa-lg">
    <div class="imgHover absolute-top q-pa-lg">
      <!--       <img
        src="https://istoe.com.br/wp-content/themes/tema_istoe/assets/svg/logo-istoe.svg"
      /> -->
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/13/LOGO_OF_LOGO.svg"
      />
    </div>
    <form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center margin-top">
        Gerenciador de anúncios
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="E-mail" type="email" v-model="form.email" outlined> </q-input>
        <q-input
          label="Senha"
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          outlined
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="full-width q-pt-md">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            type="submit"
            outline
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Cadastrar"
            color="primary"
            class="full-width"
            to="/register"
            flat
          />
        </div>
      </div>
    </form>
  </q-page>
</template>

<script>
import { ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const { login } = useAuthUser();
    const form = ref({
      email: "",
      password: "",
    });
    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({ name: "me" });
      } catch (error) {
        alert(error.message);
      }
    };
    return {
      isPwd: ref(true),
      handleLogin,
      form,
    };
  },
};
</script>

