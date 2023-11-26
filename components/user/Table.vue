<script setup lang="ts">
import { useUsersStore } from '~/stores/user'
const user = useUsersStore()


onMounted(()=>{
  fetTchData()
})

const fetTchData=async ()=>{
  const { value }  = await user.fetchUsers();
  user.listTable.data =  value?.data || []
}

const columns = ref([
  {
    name: 'name',
    label: 'NAME',
    field: 'name' ,
    align: 'left',
  },{
    name: 'email',
    label: 'EMAIL',
    field: 'email',
    align: 'left',
  },{
    name: 'action',
    label: 'ACTION',
    field: '_id',
    align: 'center',
    headerStyle: 'width: 200px',
  },
])

</script>

<template>
  <div class="q-pa-lg">
    <q-card class="my-card">
      <q-card-section>
        <q-table
          :rows="user.listTable.data"
          row-key="name"
          table-header-class="text-white bg-blue"
          virtual-scroll
          flat bordered
          :columns="columns">
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="row justify-between">
                <q-btn size="xs"  rounded color="primary" icon="edit" label="Edit" />
                 <q-btn size="xs"  rounded color="red-14" icon="delete" label="Delete"  />
              </div>
            </q-td>
          </template>
       </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>

::v-deep .q-card__section--vert{
  padding:0
}
</style>
