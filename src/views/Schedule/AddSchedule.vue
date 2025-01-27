<script setup>
import { ref, watch, onMounted } from 'vue';
import { ShowFacultyApi } from '@/apis/Faculty';
import { ShowGroupApi } from '@/apis/Group';
import { ShowDirectionApi } from '@/apis/Direction';
import { ShowDisciplineByGroupApi, ShowCourseTeacherListAPI } from '@/apis/Discipline';
import { AddScheduleAPI } from '@/apis/schedule';

// 表单数据
const form = ref({
  faculty: "",
  direction: "",
  group: "",
  discipline: "",
  format: "",
  day: "",
  location: "",
  classNumber: "",
  teacher: ""
});

// 选项数据
const facultyOptions = ref([]);
const directionOptions = ref([]);
const groupOptions = ref([]);
const disciplineOptions = ref([]);
const teacherOptions = ref([]);

const formats = ref(["Online", "Offline"]);
const daysOfWeek = ref([
  { value: 0, label: "Monday" },
  { value: 1, label: "Tuesday" },
  { value: 2, label: "Wednesday" },
  { value: 3, label: "Thursday" },
  { value: 4, label: "Friday" },
  { value: 5, label: "Saturday" },
  { value: 6, label: "Sunday" },
]);

// 获取学院列表
const loadFaculty = async () => {
  try {
    const response = await ShowFacultyApi();
    facultyOptions.value = response;
  } catch (error) {
    console.error("Failed to fetch faculty data:", error);
  }
};

// 根据学院 ID 获取方向列表
const loadDirection = async (facultyId) => {
  try {
    const response = await ShowDirectionApi(facultyId);
    directionOptions.value = response;
  } catch (error) {
    console.error("Failed to fetch direction data:", error);
  }
};

// 根据方向 ID 获取组列表
const loadGroup = async (directionId) => {
  try {
    const response = await ShowGroupApi(directionId);
    groupOptions.value = response;
  } catch (error) {
    console.error("Failed to fetch group data:", error);
  }
};

// 根据组 ID 获取课程列表
const loadDiscipline = async (groupId) => {
  try {
    const response = await ShowDisciplineByGroupApi(groupId);
    disciplineOptions.value = response;
  } catch (error) {
    console.error("Failed to fetch discipline data:", error);
  }
};

const loadDisciplineTeacher = async (disciplineId) => {
  try {
    const response = await ShowCourseTeacherListAPI(disciplineId);
    teacherOptions.value = response;
  } catch (error) {
    console.error("Failed to fetch discipline teacher data:", error);
  }
};

// 监听学院变化
watch(() => form.value.faculty, (newValue) => {
  form.value.direction = "";
  form.value.group = "";
  form.value.discipline = "";
  form.value.teacher = "";
  directionOptions.value = [];
  groupOptions.value = [];
  disciplineOptions.value = [];
  teacherOptions.value = [];
  if (newValue) {
    loadDirection(newValue);
  }
});

// 监听方向变化
watch(() => form.value.direction, (newValue) => {
  form.value.group = "";
  form.value.discipline = "";
  form.value.teacher = "";
  groupOptions.value = [];
  disciplineOptions.value = [];
  teacherOptions.value = [];
  if (newValue) {
    loadGroup(newValue);
  }
});

// 监听组变化
watch(() => form.value.group, (newValue) => {
  form.value.discipline = "";
  form.value.teacher = "";
  disciplineOptions.value = [];
  teacherOptions.value = [];
  if (newValue) {
    loadDiscipline(newValue);
  }
});

watch(() => form.value.discipline, (newValue) => {
  form.value.teacher = "";
  teacherOptions.value = [];
  if (newValue) {
    loadDisciplineTeacher(newValue);
  }
});

// 初始化加载学院列表
onMounted(() => {
  loadFaculty();
});

// 提交表单并调用 API
const displaySchedule = async () => {
  try {
    const schedule = {
      classTime: form.value.day,
      location: form.value.format === "Offline" ? form.value.location : null,
      classNumber: form.value.format === "Offline" ? form.value.classNumber : null,
      format: form.value.format,
      teacherId: form.value.teacher,
      courseId: form.value.discipline,
      groupsId: form.value.group,
    };

    await AddScheduleAPI(schedule);
    ElMessage.success("add schedule success");
  } catch (error) {
    console.error("Failed to add schedule:", error);
    alert("Failed to add schedule. Please try again.");
  }
};

</script>

<template>
  <div class="schedule-page">
    <h1>Add Schedule Page</h1>

    <form>
      <!-- Faculty Dropdown -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="faculty" class="form-label">Faculty:</label>
          <select id="faculty" v-model="form.faculty" class="form-select">
            <option value="" disabled>Select Faculty</option>
            <option v-for="faculty in facultyOptions" :key="faculty.facultyId" :value="faculty.facultyId">
              {{ faculty.name }}
            </option>
          </select>
        </div>

        <div class="col-md-6">
          <!-- Direction Dropdown -->
          <label for="direction" class="form-label">Direction:</label>
          <select id="direction" v-model="form.direction" class="form-select" :disabled="!form.faculty">
            <option value="" disabled>Select Direction</option>
            <option v-for="direction in directionOptions" :key="direction.directionId" :value="direction.directionId">
              {{ direction.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <!-- Group Dropdown -->
          <label for="group" class="form-label">Group:</label>
          <select id="group" v-model="form.group" class="form-select" :disabled="!form.direction">
            <option value="" disabled>Select Group</option>
            <option v-for="group in groupOptions" :key="group.groupId" :value="group.groupId">
              {{ group.groupNumber }}
            </option>
          </select>
        </div>

        <div class="col-md-6">
          <!-- Discipline Dropdown -->
          <label for="discipline" class="form-label">Discipline:</label>
          <select id="discipline" v-model="form.discipline" class="form-select" :disabled="!form.group">
            <option value="" disabled>Select Discipline</option>
            <option v-for="discipline in disciplineOptions" :key="discipline.courseId" :value="discipline.courseId">
              {{ discipline.courseName }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <!-- Discipline Dropdown -->
          <label for="teacher" class="form-label">Teacher:</label>
          <select id="teacher" v-model="form.teacher" class="form-select" :disabled="!form.discipline">
            <option value="" disabled>Select Teacher</option>
            <option v-for="teacher in teacherOptions" :key="teacher.teacherId" :value="teacher.teacherId">
              {{ teacher.fullname }}
            </option>
          </select>
        </div>

      </div>

      

      <!-- Format Dropdown -->
      <div class="mb-3">
        <label for="format" class="form-label">Format:</label>
        <select id="format" v-model="form.format" class="form-select">
          <option value="" disabled>Select Format</option>
          <option v-for="format in formats" :key="format" :value="format">
            {{ format }}
          </option>
        </select>
      </div>

      <!-- Offline-specific Fields -->
      <div v-if="form.format === 'Offline'" class="row mb-3">
        <div class="col-md-6">
          <label for="location" class="form-label">Location:</label>
          <input id="location" v-model="form.location" class="form-control" placeholder="Enter location" />
        </div>
        <div class="col-md-6">
          <label for="classNumber" class="form-label">Class Number:</label>
          <input id="classNumber" v-model="form.classNumber" class="form-control" placeholder="Enter class number" />
        </div>
      </div>

      <!-- Day of the Week Dropdown -->
      <div class="mb-3">
        <label for="day" class="form-label">Day of the Week:</label>
        <select id="day" v-model="form.day" class="form-select">
          <option value="" disabled>Select Day</option>
          <option v-for="day in daysOfWeek" :key="day.value" :value="day.value">
            {{ day.label }}
          </option>
        </select>
      </div>

      <!-- Display Button -->
      <button type="button" class="btn btn-primary" @click="displaySchedule">Display Schedule</button>
    </form>

    <!-- Display Schedule -->
    <div v-if="showSchedule" class="schedule-display mt-4">
      <h2>Schedule Details</h2>
      <p><strong>Faculty:</strong> {{ form.faculty }}</p>
      <p><strong>Direction:</strong> {{ form.direction }}</p>
      <p><strong>Group:</strong> {{ form.group }}</p>
      <p><strong>Discipline:</strong> {{ form.discipline }}</p>
      <p><strong>Format:</strong> {{ form.format }}</p>
      <p v-if="form.format === 'Offline'">
        <strong>Location:</strong> {{ form.location }}<br />
        <strong>Class Number:</strong> {{ form.classNumber }}
      </p>
      <p><strong>Day:</strong> {{ daysOfWeek.find(day => day.value === form.day)?.label }}</p>
    </div>
  </div>
</template>




<style scoped>
.schedule-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #007bff;
}

label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

select,
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.schedule-display {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
