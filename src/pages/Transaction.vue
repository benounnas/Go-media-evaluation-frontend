<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <!--  <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="url" :props="props">
            {{ props.row.url }}
          </q-td>

          <q-td key="actions" :props="props">
            <q-btn
              @click="editItem(props.row)"
              class="q-mr-sm"
              round
              color="primary"
              icon="edit"
            />
            <q-btn
              @click="deleteItem(props.row)"
              round
              color="primary"
              icon="delete"
            />
          </q-td> 
        </q-tr>
      </template>-->
      <template v-slot:top>
        <!-- <q-btn
          color="primary"
          :disable="loading"
          label="Add API"
          @click="editItem()"
        /> -->
        <div class="text-h5">Transaction log</div>

        <q-space />
        <q-input
          class="q-ml-md"
          dense
          placeholder="Search"
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <!--
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ formTitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="save" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="editedItem.name"
              label="API name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />

            <q-input
              filled
              v-model="editedItem.url"
              label="API name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" @click="save" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently going to delete this item, do you want to
            continue?.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            @click="deleteItemConfirm"
            flat
            label="confirm"
            color="red"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    -->
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dialogDelete: false,
      dialog: false,
      loading: false,
      filter: "",
      editedIndex: -1,
      editedItem: {
        id: ""
      },
      defaultItem: {
        id: ""
      },
      rowCount: 10,
      columns: [
        {
          name: "id",

          label: "#",
          align: "left",
          field: "id",
          sortable: true
        },
        {
          name: "action",

          label: "log",
          align: "left",
          field: "action",
          sortable: true
        },
        {
          name: "user",

          label: "By",
          align: "left",
          field: row => row.user.first_name + " " + row.user.last_name,
          sortable: true
        },
        {
          name: "date",

          label: "Date/Time",
          align: "left",
          field: "created_at",
          format: val => this.parseDate(val),
          sortable: true
        }

        /* {
          name: "actions",
          align: "center",
          label: "Actions",
          field: "actions"
        }*/
      ]
    };
  },

  created() {
    this.fetchTransactions();
  },
  computed: {
    ...mapState({
      data: state => state.transaction.logs
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapActions("transaction", ["fetchTransactions"]),
    parseDate(date) {
      const formated = new Date(date);
      return `${formated.getDay()}/${formated.getMonth()}/${formated.getFullYear()} at ${formated.getHours()}:${formated.getMinutes()}`;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close();
    },
    deleteItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
};
</script>
