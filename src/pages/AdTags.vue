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
          <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nome</q-item-label>
                  <q-input
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
                    lazy-rules
                    :rules="billing_value"
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
                    lazy-rules
                    :rules="position"
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
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

const defaultItem = {
  name: "",
  provider: "",
  script: "",
  metadata: "",
  charge_type: "",
  billing_value: "",
  positions: "",
};
const rows = [
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
];
export default defineComponent({
  data() {
    return {
      show_dialog: false,
      show_add_dialog: false,
      editedItem: defaultItem,
      addedItem: defaultItem,
      editedIndex: -1,
      currencyData: rows,
      columns: [
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
      ],
      nameRules: [(val) => (val && val.length > 0) || "Por favor, digite algo"],
      providerRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],
      scriptRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],
      metadataRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],
      charge_typeRules: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],
      billing_value: [
        (val) => (val && val.length > 0) || "Por favor, digite algo",
      ],
      position: [(val) => (val && val.length > 0) || "Por favor, digite algo"],
    };
  },

  methods: {
    editRow(item) {
      this.editedIndex = this.currencyData.findIndex(
        (v, i) => v.name === item.key
      );
      this.editedItem = Object.assign({}, item.row);
      this.show_dialog = true;
    },
    updateRow() {
      this.currencyData.splice(this.editedIndex, 1, this.editedItem);
      this.$q.notify({
        type: "positive",
        message: `Item '${this.editedItem.name}' atualizado.`,
      });
    },
    deleteRow(item) {
      this.$q
        .dialog({
          title: item.key,
          message: "Quer excluir este anúncio?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.currencyData.splice(item.rowIndex, 1);
          this.$q.notify({
            type: "negative",
            message: "anúncio excluído",
          });
        });
    },
    showModal() {
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
      this.show_add_dialog = true;
    },
    close() {
      this.show_add_dialog = false;
    },
    addRow() {
      this.currencyData.push(this.addedItem);

      this.$q.notify({
        type: "positive",
        message: `Item '${this.addedItem.name}' cadastrado.`,
      });
      this.close();
    },
    onSubmit() {
      this.addRow();
    },
  },
});
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
