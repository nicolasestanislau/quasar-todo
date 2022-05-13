<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img
        src="../assets/nepal-mountains.jpg"
        class="header-image absolute-top"
      />
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { date } from "quasar";

export default defineComponent({
  name: "MainLogin",

  setup() {
    return {};
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    },
  },
});
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>
