<template>
  <div>
    <div style="height: 100vh" class="row justify-center items-center">
      <div class="col-md-6">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h4">Login</div>
          </q-card-section>
          <q-card-section v-if="error !== null">
            <q-banner class="bg-red text-white">
              <template v-slot:avatar>
                <q-icon name="warning" color="white" />
              </template>
              {{ error }}
            </q-banner>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="form.email"
                label="Email"
                hint="Email to connect"
                lazy-rules
                :rules="[
                  val =>
                    (val !== null && val !== '') || 'Please type your email'
                ]"
              />

              <q-input
                filled
                type="password"
                v-model="form.password"
                label="Your password "
                lazy-rules
                :rules="[
                  val =>
                    (val !== null && val !== '') || 'Please type your password'
                ]"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    error() {
      return this.$store.state.auth.error;
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("auth/login", this.form);
    },

    onReset() {
      this.form.email = null;
      this.form.password = null;
    }
  }
};
</script>
<style></style>
