<template>
  <q-page class="bg-grey-3 q-pa-lg">
    <div class="imgHover absolute-top q-pa-lg">
      <img
        src="https://istoe.com.br/wp-content/themes/tema_istoe/assets/svg/logo-istoe.svg"
      />
      <!--       <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/13/LOGO_OF_LOGO.svg"
      /> -->
    </div>
    <div class="tableContainer">
      <q-btn @click="showModal" color="primary" label="Novo Anúncio" />
    </div>
    <div class="q-pt-md">
      <q-table
        class="text-left"
        :rows="currencyData"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="primary"
              @click="editRow(props)"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="negative"
              @click="deleteRow(props)"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="show_dialog">
      <q-card class="mobileModal" style="width: 600px; max-width: 80vw">
        <q-card-section>
          <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
            v-close-popup
          ></q-btn>
          <div class="text-h6">Editar Anúncio</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nome</q-item-label>
                  <q-input dense outlined v-model="editedItem.name" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Provedor</q-item-label>
                  <q-input dense outlined v-model="editedItem.provider" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Script</q-item-label>
                  <q-input
                    type="textarea"
                    dense
                    outlined
                    v-model="editedItem.script"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Metadados</q-item-label>
                  <q-input dense outlined v-model="editedItem.metadata" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Tipo de Cobrança</q-item-label>
                  <q-input dense outlined v-model="editedItem.charge_type" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Faturamento</q-item-label>
                  <q-input
                    type="number"
                    dense
                    outlined
                    v-model="editedItem.billing_value"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Posição</q-item-label>
                  <q-input dense outlined v-model="editedItem.position" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancelar"
              color="negative"
              dense
              v-close-popup
            ></q-btn>
            <q-btn
              flat
              label="OK"
              color="primary"
              dense
              v-close-popup
              @click="updateRow"
            ></q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- modal add -->
    <q-dialog v-model="show_add_dialog">
      <q-card style="width: 600px; max-width: 80vw">
        <q-card-section>
          <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
            v-close-popup
          ></q-btn>
          <div class="text-h6">Novo Anúncio</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nome</q-item-label>
                  <q-input
                    ref="nameRef"
                    lazy-rules
                    :rules="nameRules"
                    dense
                    outlined
                    v-model="addedItem.name"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Provedor</q-item-label>
                  <q-input
                    ref="providerRef"
                    lazy-rules
                    :rules="providerRules"
                    dense
                    outlined
                    v-model="addedItem.provider"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Script</q-item-label>
                  <q-input
                    ref="scriptRef"
                    lazy-rules
                    :rules="scriptRules"
                    type="textarea"
                    dense
                    outlined
                    v-model="addedItem.script"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Metadados</q-item-label>
                  <q-input
                    ref="metadataRef"
                    lazy-rules
                    :rules="metadataRules"
                    dense
                    outlined
                    v-model="addedItem.metadata"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Tipo de Cobrança</q-item-label>
                  <q-input
                    ref="charge_typeRef"
                    lazy-rules
                    :rules="charge_typeRules"
                    dense
                    outlined
                    v-model="addedItem.charge_type"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Faturamento</q-item-label>
                  <q-input
                    ref="billing_valueRef"
                    lazy-rules
                    :rules="billing_valueRules"
                    type="number"
                    dense
                    outlined
                    v-model="addedItem.billing_value"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Posição</q-item-label>
                  <q-input
                    ref="positionRef"
                    lazy-rules
                    :rules="positionRules"
                    dense
                    outlined
                    v-model="addedItem.position"
                  />
                </q-item-section>
              </q-item>
              <q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cancelar"
                    color="negative"
                    dense
                    v-close-popup
                  ></q-btn>
                  <q-btn
                    flat
                    label="Cadastrar"
                    color="primary"
                    dense
                    type="submit"
                  ></q-btn>
                </q-card-actions>
              </q-card-section>
            </q-list>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    let show_add_dialog = ref(false);
    let show_dialog = ref(false);
    const $q = useQuasar();
    const defaultItem = ref({
      name: "",
      provider: "",
      script: "",
      metadata: "",
      charge_type: "",
      billing_value: "",
      position: "",
    });
    const columns = ref([
      {
        name: "name",
        label: "Nome",
        field: "name",
        sortable: true,
        align: "left",
      },
      {
        name: "provider",
        label: "Provedor",
        field: "provider",
        align: "left",
      },
      { name: "script", label: "Script", field: "script", align: "left" },
      {
        name: "metadata",
        label: "Metadados",
        field: "metadata",
        align: "left",
      },
      {
        name: "charge_type",
        label: "Tipo de Cobrança",
        field: "charge_type",
        align: "left",
      },
      {
        name: "billing_value",
        label: "Faturamento",
        field: "billing_value",
        align: "left",
      },
      {
        name: "position",
        label: "Posição",
        field: "position",
        align: "left",
      },
      {
        name: "action",
        label: "Ações",
        field: "action",
        align: "left",
      },
    ]);
    const rows = ref([
      {
        name: "ad1",
        provider: "google",
        script: "some script",
        metadata: "metadados",
        charge_type: "cobrança 1",
        billing_value: 50,
        position: "top",
      },
      {
        name: "ad2",
        provider: "google",
        script: "some script",
        metadata: "metadados",
        charge_type: "cobrança 1",
        billing_value: 50,
        position: "top",
      },
      {
        name: "ad3",
        provider: "google",
        script: "some script",
        metadata: "metadados",
        charge_type: "cobrança 1",
        billing_value: 50,
        position: "top",
      },
    ]);
    const nameRef = ref(null);
    const providerRef = ref(null);
    const scriptRef = ref(null);
    const metadataRef = ref(null);
    const charge_typeRef = ref(null);
    const billing_valueRef = ref(null);
    const positionRef = ref(null);
    const editedItem = ref(defaultItem);
    const addedItem = ref(defaultItem);
    const editedIndex = ref(-1);
    const currencyData = ref(rows);
    return {
      defaultItem,
      columns,
      rows,
      editedItem,
      addedItem,
      editedIndex,
      currencyData,
      show_add_dialog,
      show_dialog,

      nameRef,
      nameRules: [(val) => (val && val.length > 0) || "Por favor, digite algo"],

      providerRef,
      providerRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],

      scriptRef,
      scriptRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],

      metadataRef,
      metadataRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],

      charge_typeRef,
      charge_typeRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],

      billing_valueRef,
      billing_valueRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],

      positionRef,
      positionRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],

      /* function */
      editRow(item) {
        this.editedIndex = this.currencyData.findIndex(
          (v, i) => v.name === item.key
        );
        this.editedItem = Object.assign({}, item.row);
        this.show_dialog = true;
      },
      updateRow() {
        console.log(currencyData)
        currencyData.value.splice(editedIndex.value, 1, editedItem.value);
        $q.notify({
          type: "positive",
          message: `Item '${editedItem.value.name}' atualizado.`,
        });
      },
      deleteRow(item) {
        $q.dialog({
          title: item.key,
          message: "Quer excluir este anúncio?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          this.currencyData.splice(item.rowIndex, 1);
          $q.notify({
            type: "negative",
            message: "anúncio excluído",
          });
        });
      },

      close() {
        let defaultItemAdd = {
          name: "",
          provider: "",
          script: "",
          metadata: "",
          charge_type: "",
          billing_value: "",
          positions: "",
        };
        this.addedItem = defaultItemAdd;
        show_add_dialog.value = false;
      },
      /*       cancel() {
        let defaultItemAdd = {
          name: "",
          provider: "",
          script: "",
          metadata: "",
          charge_type: "",
          billing_value: "",
          positions: "",
        };
        this.addedItem = defaultItemAdd;
      }, */
      showModal() {
        /*         let defaultItemAdd = {
          name: "",
          provider: "",
          script: "",
          metadata: "",
          charge_type: "",
          billing_value: "",
          positions: "",
        };
        addedItem = defaultItemAdd */

        console.log(addedItem.value);
        addedItem.value.name = null;
        addedItem.value.provider = null;
        addedItem.value.script = null;
        addedItem.value.metadata = null;
        addedItem.value.charge_type = null;
        addedItem.value.billing_value = null;
        addedItem.value.position = null;
        show_add_dialog.value = true;
      },
      addRow() {
        this.currencyData.push(this.addedItem);

        $q.notify({
          type: "positive",
          message: `Item '${this.addedItem.name}' cadastrado.`,
        });
        this.close();
      },
      onSubmit() {
        nameRef.value.validate();
        providerRef.value.validate();
        scriptRef.value.validate();
        metadataRef.value.validate();
        charge_typeRef.value.validate();
        billing_valueRef.value.validate();
        positionRef.value.validate();

        if (
          nameRef.value.hasError ||
          providerRef.value.hasError ||
          scriptRef.value.hasError ||
          metadataRef.value.hasError ||
          charge_typeRef.value.hasError ||
          billing_valueRef.value.hasError ||
          positionRef.value.hasError
        ) {
          // form has error
        } else {
          this.addRow();
        }
      },
    };
  },
};
</script>

<style lang="scss">
.imgHover {
  img {
    height: 78px;
    transition: ease-in all 0.3s;
  }
  padding-bottom: 6px;
}
.imgHover {
  img:hover {
    height: 84px;
    transition: ease-in all 0.3s;
  }
}

@media screen and (max-width: 600px) {
  .imgHover {
    display: flex;
    justify-content: center;
  }
  .mobileModal {
    max-width: 80vw;
  }
}
.tableContainer {
  margin-top: 106px;

  display: flex;
  justify-content: flex-end;
}
</style>
