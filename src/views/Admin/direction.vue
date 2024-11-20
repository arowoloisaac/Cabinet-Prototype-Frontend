<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

// Sample Data
const selectedFaculty = ref({ id: null, name: "" });
const directions = ref([]);

// Mock API calls
const fetchDirections = async (facultyId) => {
  // Replace this with an actual API call
  return [
    { id: 1, name: "Direction A" },
    { id: 2, name: "Direction B" },
    { id: 3, name: "Direction C" }
  ];
};

const addDirection = () => {
  ElMessage({
    message: "Add Direction button clicked!",
    type: "info"
  });
};

const editDirection = (direction) => {
  ElMessage({
    message: `Editing ${direction.name}`,
    type: "info"
  });
};

const deleteDirection = (direction) => {
  directions.value = directions.value.filter((d) => d.id !== direction.id);
  ElMessage({
    message: `${direction.name} has been deleted.`,
    type: "success"
  });
};

// Route Handling
const route = useRoute();

onMounted(async () => {
  // Get faculty ID and name from route parameters
  const facultyId = route.params.facultyId;
  const facultyName = route.params.facultyName;

  selectedFaculty.value = {
    id: facultyId,
    name: facultyName
  };

  // Fetch directions for the faculty
  directions.value = await fetchDirections(facultyId);
});
</script>


<template>
  <div class="directions-page">
    <header>
      <h1>Directions under {{ selectedFaculty.name }}</h1>
      <el-button type="primary" @click="addDirection">Add Direction</el-button>
    </header>
    <section>
      <el-table :data="directions" style="width: 100%">
        <el-table-column prop="name" label="Direction Name" />
        <el-table-column label="Actions" width="180">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editDirection(scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteDirection(scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
