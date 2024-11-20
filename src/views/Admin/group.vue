<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

// Sample Data
const selectedDirection = ref({ id: null, name: "" });
const groups = ref([]);

// Mock API calls
const fetchGroups = async (directionId) => {
  // Replace this with an actual API call
  return [
    { id: 1, groupNumber: "Group 101" },
    { id: 2, groupNumber: "Group 102" },
    { id: 3, groupNumber: "Group 103" }
  ];
};

const addGroup = () => {
  ElMessage({
    message: "Add Group button clicked!",
    type: "info"
  });
};

const editGroup = (group) => {
  ElMessage({
    message: `Editing ${group.groupNumber}`,
    type: "info"
  });
};

const deleteGroup = (group) => {
  groups.value = groups.value.filter((g) => g.id !== group.id);
  ElMessage({
    message: `${group.groupNumber} has been deleted.`,
    type: "success"
  });
};

// Route Handling
const route = useRoute();

onMounted(async () => {
  // Get direction ID and name from route parameters
  const directionId = route.params.directionId;
  const directionName = route.params.directionName;

  selectedDirection.value = {
    id: directionId,
    name: directionName
  };

  // Fetch groups for the direction
  groups.value = await fetchGroups(directionId);
});
</script>


<template>
  <div class="groups-page">
    <header>
      <h1>Groups under {{ selectedDirection.name }}</h1>
      <el-button type="primary" @click="addGroup">Add Group</el-button>
    </header>
    <section>
      <el-table :data="groups" style="width: 100%">
        <el-table-column prop="groupNumber" label="Group Number" />
        <el-table-column label="Actions" width="180">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editGroup(scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteGroup(scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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

