<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { ShowDirectionByIdApi } from '@/apis/Direction';
import { ShowGroupApi, AddGroupApi, EditGroupApi, DeleteGroupApi } from "@/apis/Group";

// Sample Data
const selectedDirection = ref({});
const groups = ref([]);

// Route Handling
const route = useRoute();

const ShowDirectionName = async (directionId) =>{
  const res = await ShowDirectionByIdApi(directionId);
  selectedDirection.value = res;

}

const ShowGroup = async (directionId) =>{
  const res = await ShowGroupApi(directionId);
  groups.value = res;

}
onMounted(()=>{
  ShowDirectionName(route.params.id)
  ShowGroup(route.params.id)
});

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
  groupNumber: '',
  directionId: '',
})

form.value.directionId = route.params.id; 

const addGroup = async() => {
  try {
    await AddGroupApi(form.value);
    ElMessage({
      message: "group added successfully!",
      type: "success",
    });
    dialogFormVisible.value = false; 
    form.value = { 
      groupNumber: "",
      buildingNumber: "",
    };
    await ShowGroup(route.params.id);
  } catch (error) {
    console.error("Error adding group:", error);
    ElMessage({
      message: "Failed to add group. Please try again.",
      type: "error",
    });
  }
};

//edit direction
const editdialog = ref(false)

const editForm = ref({
  directionId: '',
  groupNumber: '',
})

const handleEditClick = (row) => {
  editdialog.value = true;
  editForm.value = {
    groupId: row.groupId,
    groupNumber: row.groupNumber,
    directionId: route.params.id,
  };
};

const editGroup = async() => {
  try {
    await EditGroupApi(editForm.value.groupId, editForm.value);
    ElMessage({
      message: "Group edit successfully!",
      type: "success",
    });
    editdialog.value = false; 
    editForm.value = { 
      groupNumber: '',
      directionId: '',
    };
    await ShowGroup(route.params.id);
  } catch (error) {
    console.error("Error editing group:", error);
    ElMessage({
      message: "Failed to edit group. Please try again.",
      type: "error",
    });
  }
};


//delete direction
const deleteGroup = async(id) => {
  try {
    await DeleteGroupApi(id);
    ElMessage({
      message: "Group delete successfully!",
      type: "success",
    });
    await ShowGroup(route.params.id);
  } catch (error) {
    console.error("Error group Direction:", error);
    ElMessage({
      message: "Failed to delete group. Please try again.",
      type: "error",
    });
  }
};

</script>


<template>
  <div class="groups-page">
    <header>
      <h1>Groups under {{ selectedDirection.name }}</h1>
      <el-button type="primary" plain @click="dialogFormVisible = true">Add Group</el-button>
    </header>
    <section>
      <el-table :data="groups" style="width: 100%">
        <el-table-column prop="groupNumber" label="Group Number" />
        <el-table-column label="Actions" width="180">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditClick(scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteGroup(scope.row.groupId)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- Add Group Dialog -->
      <el-dialog v-model="dialogFormVisible" title="Add Group" width="500">
        <el-form :model="form">
          <el-form-item label="GroupNumber" :label-width="formLabelWidth">
            <el-input v-model="form.groupNumber" placeholder="Please enter group number"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addGroup">Confirm</el-button>
          </div>
        </template>
      </el-dialog>

      <!-- Edit Group Dialog -->
      <el-dialog v-model="editdialog" title="Edit Group" width="500">
        <el-form :model="editForm">
          <el-form-item label="GroupNumber" :label-width="formLabelWidth">
            <el-input v-model="editForm.groupNumber" placeholder="Please enter direction name"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="editdialog = false">Cancel</el-button>
            <el-button type="primary" @click="editGroup">Confirm</el-button>
          </div>
        </template>
      </el-dialog>

    </section>
  </div>
</template>


<style scoped>
.groups-page {
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

section {
  margin-top: 20px;
}
</style>

