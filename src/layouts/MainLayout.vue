<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img
        src="../assets/nepal-mountains.jpg"
        class="header-image absolute-top"
      />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item :to="{ name: 'todo' }" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> Todo </q-item-section>
          </q-item>

          <q-item :to="{ name: 'adtags' }" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="article" />
            </q-item-section>

            <q-item-section> Anúncios </q-item-section>
          </q-item>
          <q-item :to="{ name: 'help' }" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Ajuda </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="../assets/nepal-mountains.jpg"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar
            @click="handleProfile"
            size="56px"
            class="q-mb-sm cursor-pointer"
          >
            <img
              src="https://avatars.githubusercontent.com/nicolasestanislau"
            />
          </q-avatar>

          <div @click="handleProfile" class="text-weight-bold cursor-pointer">
            {{ user.user_metadata.name }}
          </div>
          <div
            @click="handleLogout"
            class="text-weight-bold q-mt-sm cursor-pointer"
          >
            Sair
          </div>
        </div>
      </q-img>
    </q-drawer>

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
import useAuthUser from "src/composables/useAuthUser";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { date, useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { user, logout } = useAuthUser();
    const leftDrawerOpen = ref(false);

    const handleLogout = async () => {
      $q.dialog({
        title: "Sair",
        message: "você realmente quer sair?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        router.replace({ name: "login" });
      });
    };

    const handleProfile = async () => {
      router.push({ name: "me" });
    };

    return {
      user,
      leftDrawerOpen,
      handleLogout,
      handleProfile,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
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
