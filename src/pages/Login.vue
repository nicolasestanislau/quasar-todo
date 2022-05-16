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
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <div id="divError" style="display: none" class="text-center">
          <span></span>
          <q-icon name="error" />
        </div>
        <q-input
          ref="emailRef"
          lazy-rules
          :rules="emailRules"
          label="E-mail"
          type="email"
          v-model="form.email"
          outlined
        >
        </q-input>
        <q-input
          ref="passwordRef"
          lazy-rules
          :rules="passwordRules"
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
        <div class="full-width">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            type="submit"
          />
        </div>
        <div class="full-width q-mt-md">
          <q-btn
            label="Cadastrar"
            color="primary"
            class="full-width"
            :to="{ name: 'register' }"
            outline
            dense
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Esqueceu sua senha?"
            color="primary"
            class="full-width"
            :to="{ name: 'forgotpassword'}"
            flat
            size="sm"
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
    const emailRef = ref(null);
    const passwordRef = ref(null);
    const router = useRouter();
    const { login } = useAuthUser();
    const form = ref({
      email: "",
      password: "",
    });
    const handleLogin = async () => {
      emailRef.value.validate();
      passwordRef.value.validate();
      if (emailRef.value.hasError || passwordRef.value.hasError) {
        // form has error
      } else {
        try {
          await login(form.value);
          router.push({ name: "me" });
        } catch (error) {
          if (error.status == 400) {
            document.getElementById("divError").childNodes[0].innerHTML =
              "Credenciais de login inválidas";
            document.getElementById("divError").style.display = "flex";
          }
        }
      }
    };
    return {
      isPwd: ref(true),
      handleLogin,
      form,
      emailRef,
      emailRules: [
        (val) => (val && val.length > 0) || "Por favor, digite o email",
      ],
      passwordRef,
      passwordRules: [
        (val) => (val && val.length > 0) || "Por favor, digite a senha",
        (val) =>
          (val && val.length > 5) || "A senha deve ter pelo menos 6 caracteres",
      ],
    };
  },
};
</script>