<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:body="props">
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
      </template>

      <template v-slot:top>
        <div class="text-h5">API list</div>
        <q-space />
        <q-btn
          color="primary"
          :disable="loading"
          label="Add API"
          @click="editItem()"
        />

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
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ formTitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="save" class="q-gutter-md">
            <q-input
              filled
              v-model="editedItem.name"
              label="API name *"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
            <q-input
              filled
              v-model="editedItem.url"
              label="API url *"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn flat label="Cancel" v-close-popup />
            </div>
          </q-form>
        </q-card-section>

        <!--
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" type="submit" v-close-popup />
        </q-card-actions>
        -->
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
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogDelete: false,
      dialog: false,
      loading: false,
      filter: "",
      editedIndex: -1,
      editedItem: {
        id: "",
        name: "",
        url: ""
      },
      defaultItem: {
        id: "",
        name: "",
        url: ""
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
          name: "name",
          align: "left",
          label: "Name",
          field: "name",
          sortable: true
        },
        {
          name: "url",
          align: "left",
          label: "Url",
          field: "url",
          sortable: true
        },
        {
          name: "actions",
          align: "center",
          label: "Actions",
          field: "actions"
        }
      ]
    };
  },

  computed: {
    ...mapState({
      data: state => state.apilist.apilist
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
  created() {
    this.init();
  },

  methods: {
    ...mapActions("apilist", [
      "deleteApilist",
      "fetchApilist",
      "createApilist",
      "updateApilist"
    ]),

    init() {
      this.fetchApilist();
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
        //statically
        // Object.assign(this.data[this.editedIndex], this.editedItem);
        //
        /**Dynamically */
        this.updateApilist({
          apilist: this.editedItem,
          index: this.editedIndex
        }).then(() => {
          this.$q.notify({
            message: "Updated successfully",
            icon: "thumb_up",
            color: "teal"
          });
        });
      } else {
        //statically
        // this.data.push(this.editedItem);
        this.createApilist({ apilist: this.editedItem }).then(() => {
          this.$q.notify({
            message: "Created successfully",
            icon: "thumb_up",
            color: "teal"
          });
        });
      }
      this.close();
    },
    deleteItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //statically
      // this.data.splice(this.editedIndex, 1);
      /** Dynamically **/
      this.deleteApilist({
        apilist: this.editedItem,
        index: this.editedIndex
      }).then(() =>
        this.$q.notify({
          message: "Deleted!",
          icon: "thumb_up",
          color: "teal"
        })
      );
      /** */
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
