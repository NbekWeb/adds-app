<script setup>
import IconUserEdit from '@/components/icons/IconUserEdit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import { ref } from 'vue'
import useCore from '@/store/core.pinia.js'
import useUser from '@/store/user.pinia.js'
import { storeToRefs } from 'pinia'
defineProps({
  users: {
    type: Object,
    required: true
  }
})
const corePinia = useCore()
const userPinia = useUser()
const { userList, loading } = storeToRefs(userPinia)
const columns = ref([
  {
    title: 'fullName',
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'balance',
    dataIndex: 'balance',
    key: 'balance'
  },
  {
    title: 'role',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions'
  }
])

const confirmDelete = (id) => {
  console.log(id)
}
</script>

<template>
  {{ loading }}
  <a-table
    :columns="columns"
    :data-source="users"
    :pagination="false"
    :loading="loading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'actions'">
        <a-space class="actions">
          <a-button
            class="edit-btn"
            size="middle"
            @click="corePinia.redirect(`/dashboard/user/edit/${record.id}`)"
          >
            <template #icon> <icon-user-edit /> </template>
          </a-button>

          <a-popconfirm
            placement="topRight"
            :title="$t('DO_YOU_WANT_TO_DELETE_THE_USER')"
            :ok-text="$t('YES')"
            :cancel-text="$t('NO')"
            @confirm="confirmDelete(record.id)"
          >
            <a-button danger size="middle">
              <template #icon> <icon-trash /> </template>
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
//:deep(.ant-table-row) {
//  cursor: pointer;
//}

:deep(.ant-table-tbody) tr td {
  border-color: transparent;
}
:deep(.ant-table-row) {
  border-bottom: 2px solid #ffffff;
}
:deep(.ant-table-cell):first-child {
  border-radius: 4px 0 0 4px;
}
:deep(.ant-table-cell):last-child {
  border-radius: 0 4px 4px 0;
}
:deep(.ant-table-row-level-0) {
  border-radius: 4px;
}
:deep(.ant-table-cell-row-hover) {
  background: $light !important;
}

.actions {
  width: 100%;
  justify-content: flex-end;
}
//.edit-btn {
//  color: rgb($warning, 0.7);
//  border-color: rgb($warning, 0.7);
//  &:hover {
//    color: $warning;
//    border-color: $warning;
//  }
//}
</style>
