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
    <form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center margin-top">Recuperação de senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input
          ref="emailRef"
          lazy-rules
          :rules="emailRules"
          label="E-mail"
          type="email"
          outlined
          v-model="email"
        >
        </q-input>
        <div class="full-width">
          <q-btn
            label="enviar e-mail de redefinição"
            color="primary"
            class="full-width"
            type="submit"
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Voltar"
            color="negative"
            class="full-width"
            :to="{ name: 'login' }"
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
    const emailRef = ref(null);
    const router = useRouter();
    const { sendPasswordRestEmail } = useAuthUser();
    const email = ref(null);
    const handlePasswordReset = async () => {
      emailRef.value.validate();
      if (emailRef.value.hasError) {
        // form has error
      } else {
        await sendPasswordRestEmail(email.value);
        alert(`e-mail de redefinição de senha enviado para:${email.value}`)
/*         router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        }); */
      }
    };
    return {
      handlePasswordReset,
      email,
      emailRef,
      emailRules: [
        (val) => (val && val.length > 0) || "Por favor, digite o email",
      ],
    };
  },
};
</script>
