<script setup lang="ts">
import { useUsersStore } from '~/stores/user'
const user = useUsersStore()

const onSubmit =async ()=>{
  const formInput = user.getFormInput
  await user.submitUser(formInput);
  user.clearFormInput()
  fetTchData()
}

const fetTchData=async ()=>{
  const { value }  = await user.fetchUsers();
  user.setListData(value?.data)
}

</script>

<template>
  <div class="q-pa-lg">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Users Account</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div class="row q-mb-sm items-center">
            <div class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <label>
                <b>Name</b>
              </label>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <span class="custom-input-32">
                <q-input
                  v-model="user.formInput.name"
                  outlined
                  dense
                  filled
                  hide-bottom-space
                  requird
                />
              </span>
            </div>
          </div>

          <div class="row q-mb-sm items-center">
            <div class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <label>
                <b>Email</b>
              </label>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <span class="custom-input-32">
                <q-input
                  outlined
                  dense
                  v-model="user.formInput.email"
                  filled
                  hide-bottom-space
                  requird
                />
              </span>
            </div>
          </div>

          <div class="row q-mb-sm items-center">
            <div class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <label>
                <b>Password</b>
              </label>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <span class="custom-input-32">
                <q-input
                  outlined
                  dense
                  filled
                  v-model="user.formInput.password"
                  hide-bottom-space
                  requird
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn  color="red">Cancel</q-btn>
        <q-btn color="primary" @click="onSubmit">Submit</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
