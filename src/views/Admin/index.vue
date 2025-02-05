<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { ShowFacultyApi, AddFacultyApi } from '@/apis/Faculty';
import { useRouter } from 'vue-router'; 
import { getRegisterRequestApi, AddUserApi, DenyUserApi } from '@/apis/Admin';

// Dummy data for demonstration
const faculties = ref([]);
const pendingUsers = ref([]); // 存储用户列表

// 获取用户列表
const fetchPendingUsers = async () => {
  try {
    const response = await getRegisterRequestApi();
    pendingUsers.value = response.map(user => ({
      id: user.id,
      name: user.email, // 使用 email 作为用户名称展示
    }));
  } catch (error) {
    console.error("Error fetching pending users:", error);
    ElMessage({
      message: "Failed to fetch pending users.",
      type: "error",
    });
  }
};

// 在组件挂载时调用
onMounted(() => {
  fetchPendingUsers();
});

//show faculty list
const showFaculty = async() =>{
  const res = await ShowFacultyApi()
  faculties.value = res
}
onMounted(()=>showFaculty());

const router = useRouter();
//click faculty to edit direction
const goToDirections = (faculty) => {
  router.push(`/admin/faculty/direction/${faculty.facultyId}`);
};

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
  name: '',
  buildingNumber: '',
})

// Add faculty function
const addFaculty = async () => {
  try {
    await AddFacultyApi(form.value);
    ElMessage({
      message: "Faculty added successfully!",
      type: "success",
    });
    dialogFormVisible.value = false; 
    form.value = { 
      name: "",
      buildingNumber: "",
    };
    await showFaculty();
  } catch (error) {
    console.error("Error adding faculty:", error);
    ElMessage({
      message: "Failed to add faculty. Please try again.",
      type: "error",
    });
  }
};

// Function to accept a user
const acceptUser = async (user) => {
  try {
    await AddUserApi(user.id); 
    ElMessage({
      message: `${user.name} has been accepted.`,
      type: "success",
    });
    await fetchPendingUsers();
  } catch (error) {
    console.error("Error accepting user:", error);
    ElMessage({
      message: "Failed to accept user.",
      type: "error",
    });
  }
};

// Function to reject a user
const rejectUser = async (user) => {
  try {
    await DenyUserApi(user.id); 
    ElMessage({
      message: `${user.name} has been rejected.`,
      type: "success",
    });
    await fetchPendingUsers(); 
  } catch (error) {
    console.error("Error rejecting user:", error);
    ElMessage({
      message: "Failed to reject user.",
      type: "error",
    });
  }
};
</script>


<template>
  <div class="admin-dashboard">
    <!-- Left Sidebar -->
    <aside class="left-sidebar">
      <ul>
        <li><a href="#faculty">Faculty</a></li>
        <li><a href="/faculty/direction/group/discipline">Manage Discipline</a></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <section id="faculty">
        <h1>Faculties</h1>
        <el-table :data="faculties" style="width: 100%">
            <el-table-column label="Faculty Name">
                <template #default="scope">
                    <a
                    href="javascript:;"
                    @click="goToDirections(scope.row)"
                    class="faculty-name"
                    >
                    {{ scope.row.name }}
                    </a>
                </template>
            </el-table-column>
        </el-table>
        
        
        <!-- <el-table :data="faculties" style="width: 100%">
          <el-table-column prop="name" label="Faculty Name" />
        </el-table> -->
        <el-button type="primary" plain @click="dialogFormVisible = true">Add Faculty</el-button>

        <!-- Add Faculty Dialog -->
        <el-dialog v-model="dialogFormVisible" title="Add Faculty" width="500">
          <el-form :model="form">
            <el-form-item label="Name" :label-width="formLabelWidth">
              <el-input v-model="form.name" placeholder="Please enter faculty name"/>
            </el-form-item>
            <el-form-item label="Building Number" :label-width="formLabelWidth">
              <el-input v-model="form.buildingNumber" placeholder="Please enter building number"/>
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="addFaculty">Confirm</el-button>
            </div>
          </template>
        </el-dialog>

      </section>
    </main>

    <!-- Right Sidebar -->
    <aside class="right-sidebar">
      <h2>Pending Users</h2>
      <el-table :data="pendingUsers" style="width: 100%">
        <el-table-column prop="name" label="Email" />
        <el-table-column label="Actions">
          <template #default="scope">
            <el-button
              size="mini"
              type="success"
              @click="acceptUser(scope.row)"
              >Accept</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="rejectUser(scope.row)"
              >Reject</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </aside>
  </div>
</template>


<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
}

.left-sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 10px;
  border-right: 1px solid #ddd;
}

.left-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.left-sidebar li {
  margin: 10px 0;
}

.left-sidebar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.right-sidebar {
  width: 400px;
  background-color: #f9f9f9;
  padding: 10px;
  border-left: 1px solid #ddd;
}
</style>
