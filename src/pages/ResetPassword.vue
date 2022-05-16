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
      <p class="col-12 text-h5 text-center margin-top">Redefinir senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input
          ref="newpasswordRef"
          lazy-rules
          :rules="newpasswordRules"
          label="Nova senha"
          outlined
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
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
            label="Redefinir"
            color="primary"
            class="full-width"
            type="submit"
          />
        </div>
      </div>
    </form>
  </q-page>
</template>

<script>
import { ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const newpasswordRef = ref(null);
    const router = useRouter();
    const route = useRoute();
    const token = route.query.token;
    const { resetPassword } = useAuthUser();
    const password = ref(null);

    const handlePasswordReset = async () => {
      newpasswordRef.value.validate();
      if (newpasswordRef.value.hasError) {
        // form has error
      } else {
        await resetPassword(token, password.value);
        router.push({ name: "login" });
      }
    };
    return {
      isPwd: ref(true),
      handlePasswordReset,
      password,
      newpasswordRef,
      newpasswordRules: [
        (val) => (val && val.length > 0) || "Por favor, digite a senha",
        (val) =>
          (val && val.length > 5) || "A senha deve ter pelo menos 6 caracteres",
      ],
    };
  },
};
</script>
