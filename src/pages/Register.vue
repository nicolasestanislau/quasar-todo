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
    <form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center margin-top">Cadastro</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input
          ref="nameRef"
          lazy-rules
          :rules="nameRules"
          label="Nome"
          outlined
          v-model="form.name"
        >
        </q-input>
        <q-input
          ref="emailRef"
          lazy-rules
          :rules="emailRules"
          label="E-mail"
          type="email"
          outlined
          v-model="form.email"
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
            label="Cadastrar"
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
    const nameRef = ref(null);
    const emailRef = ref(null);
    const passwordRef = ref(null);
    const router = useRouter();
    const { register } = useAuthUser();
    const form = ref({
      name: "",
      email: "",
      password: "",
    });
    const handleRegister = async () => {
      nameRef.value.validate();
      emailRef.value.validate();
      passwordRef.value.validate();
      if (
        emailRef.value.hasError ||
        nameRef.value.hasError ||
        passwordRef.value.hasError
      ) {
        // form has error
      } else {
        try {
          await register(form.value);
          router.push({
            name: "emailconfirmation",
            query: { email: form.value.email },
          });
        } catch (error) {
          /* essa parte posso remover */
          if (error.status == 422 && form.value.password == "") {
            alert("O cadastrado requer uma senha válida");
          } else if (
            error.message == "Password should be at least 6 characters"
          ) {
            alert("A senha deve ter pelo menos 6 caracteres");
          }
        }
      }
    };
    return {
      isPwd: ref(true),
      handleRegister,
      form,
      nameRef,
      nameRules: [
        (val) => (val && val.length > 0) || "Por favor, digite o nome",
      ],
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
