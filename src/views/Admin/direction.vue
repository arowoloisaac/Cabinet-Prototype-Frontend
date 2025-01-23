<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { ShowDirectionApi, AddDirectionApi, EditDirectionApi, DeleteDirectionApi } from '@/apis/Direction';
import { ShowFacultyByIdApi } from '@/apis/Faculty';
import { useRouter } from "vue-router";

// Sample Data
const selectedFaculty = ref({});
const directions = ref([]);

// Route Handling
const route = useRoute();

const ShowFacultyName = async (facultyId) =>{
  const res = await ShowFacultyByIdApi(facultyId);
  selectedFaculty.value = res;

}

const ShowDirection =  async (facultyId) =>{
  const res = await ShowDirectionApi(facultyId);
  directions.value = res;

}
onMounted(()=>{
  ShowDirection(route.params.id)
  ShowFacultyName(route.params.id)
});

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
  name: '',
  facultyId: '',
})

form.value.facultyId = route.params.id; 

const addDirection = async() => {
  try {
    await AddDirectionApi(form.value);
    ElMessage({
      message: "Direction added successfully!",
      type: "success",
    });
    dialogFormVisible.value = false; 
    form.value = { 
      name: "",
      buildingNumber: "",
    };
    await ShowDirection(route.params.id);
  } catch (error) {
    console.error("Error adding Direction:", error);
    ElMessage({
      message: "Failed to add Direction. Please try again.",
      type: "error",
    });
  }
};

//edit direction
const editdialog = ref(false)

const editForm = ref({
  facultyId: '',
  name: '',
})

const handleEditClick = (row) => {
  editdialog.value = true;
  editForm.value = {
    directionId: row.directionId,
    name: row.name,
    facultyId: route.params.id,
  };
};

const editDirection = async() => {
  try {
    await EditDirectionApi(editForm.value.directionId, editForm.value);
    ElMessage({
      message: "Direction edit successfully!",
      type: "success",
    });
    editdialog.value = false; 
    editForm.value = { 
      name: '',
      facultyId: '',
    };
    await ShowDirection(route.params.id);
  } catch (error) {
    console.error("Error editing Direction:", error);
    ElMessage({
      message: "Failed to edit Direction. Please try again.",
      type: "error",
    });
  }
};


//delete direction
const deleteDirection = async(id) => {
  try {
    await DeleteDirectionApi(id);
    ElMessage({
      message: "Direction delete successfully!",
      type: "success",
    });
    await ShowDirection(route.params.id);
  } catch (error) {
    console.error("Error delete Direction:", error);
    ElMessage({
      message: "Failed to delete Direction. Please try again.",
      type: "error",
    });
  }
};

const router = useRouter();

const handleGroupClick = (row) => {
  router.push(`/admin/faculty/direction/group/${row.directionId}`);
};

</script>


<template>
  <div class="directions-page">
    <header>
      <h1>Directions under {{ selectedFaculty.name }}</h1>
      <el-button type="primary" plain @click="dialogFormVisible = true">Add Direction</el-button>
    </header>
    <section>
      <el-table :data="directions" style="width: 100%">
         <el-table-column label="Direction Name">
          <template #default="scope">
            <a
              href="javascript:;"
              @click="handleGroupClick(scope.row)"
              class="direction-name-link"
            >
              {{ scope.row.name }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="180">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              plain @click="handleEditClick(scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteDirection(scope.row.directionId)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- Add Direction Dialog -->
      <el-dialog v-model="dialogFormVisible" title="Add Direction" width="500">
        <el-form :model="form">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder="Please enter direction name"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addDirection">Confirm</el-button>
          </div>
        </template>
      </el-dialog>


      <el-dialog v-model="editdialog" title="Edit Direction" width="500">
        <el-form :model="editForm">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" placeholder="Please enter direction name"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="editdialog = false">Cancel</el-button>
            <el-button type="primary" @click="editDirection">Confirm</el-button>
          </div>
        </template>
      </el-dialog>

    </section>
  </div>
</template>


<style scoped>
.directions-page {
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
