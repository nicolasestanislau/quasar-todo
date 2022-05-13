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
    <div v-if="user">
        <p class="col-12 text-h5 text-center margin-top text-body1">Olá, {{user.user_metadata.name}}</p>
    </div>

  </q-page>
</template>

<script>
import useAuthUser from "src/composables/useAuthUser";

export default {
  setup() {
    const { user } = useAuthUser();

    return {
        user,
    };
  },
};
</script>
