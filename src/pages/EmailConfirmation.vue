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
    <p class="col-12 text-h5 text-center margin-top text-body1">Obrigado por se cadastrar!</p>
    <p class="col-12 text-h6 text-center text-body1" style="font-weight: 400;">por favor confirme seu email para finalizar o cadastro: <strong>{{$route.query.email}}</strong></p>
  </q-page>
</template>

