<script setup>
import { ref, onMounted } from 'vue';
import { ShowCourseTeacherListAPI } from '@/apis/Discipline';
import { AddScheduleAPI, GetScheduleByIdApi, EditScheduleAPI } from '@/apis/schedule';
import { useRoute, useRouter } from 'vue-router';

// 路由参数获取 ID
const route = useRoute();
const router = useRouter();

// 表单数据
const form = ref({
  id: "",
  courseId: "",
  format: "",
  day: "",
  location: "",
  classNumber: "",
  teacher: "",
  course: "",
  groups: "",
});

// 教师选项
const teacherOptions = ref([]);

// 格式选项和星期选项
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

// 加载教师列表
const loadDisciplineTeacher = async (disciplineId) => {
  try {
    const response = await ShowCourseTeacherListAPI(disciplineId);
    teacherOptions.value = response;
  } catch (error) {
    console.error("Failed to fetch discipline teacher data:", error);
  }
};

// 获取并初始化课程表详情
const fetchschedule = async (id) => {
  try {
    const response = await GetScheduleByIdApi(id);
    form.value = {
      id: response.scheduleId,
      courseId: response.courseId,
      format: response.format,
      day: response.classTime, // 保留 0-6 对应值
      location: response.location || "",
      classNumber: response.classNumber || "",
      teacher: response.teacherId || "",
      course: response.courseId || "",
      group: response.groupsId || "",
    };
    // 加载教师选项
    await loadDisciplineTeacher(response.courseId);
  } catch (error) {
    console.error('Failed to fetch schedule details:', error);
  }
};

// 提交表单并调用 API
const EditSchedule = async () => {
  try {
    const schedule = {
      scheduleId: route.params.id,
      classTime: form.value.day,
      location: form.value.format === "Offline" ? form.value.location : null,
      classNumber: form.value.format === "Offline" ? form.value.classNumber : null,
      format: form.value.format,
      teacherId: form.value.teacher,
      courseId: form.value.course,
      groupsId: form.value.group
    };

    await EditScheduleAPI(schedule);
    ElMessage.success("edit schedule success");
  } catch (error) {
    console.error("Failed to update schedule:", error);
    alert("Failed to update schedule. Please try again.");
  }
};

// 初始化
onMounted(() => {
  const id = route.params.id;
  if (id) fetchschedule(id);
});
</script>

<template>
  <div class="schedule-page">
    <h1>Edit Schedule Page</h1>

    <form>

      <div class="mb-3">
          <!-- Teacher Dropdown -->
          <label for="teacher" class="form-label">Teacher:</label>
          <select id="teacher" v-model="form.teacher" class="form-select" >
            <option value="" disabled>Select Teacher</option>
            <option v-for="teacher in teacherOptions" :key="teacher.teacherId" :value="teacher.teacherId">
              {{ teacher.fullname }}
            </option>
          </select>
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
      <button type="button" class="btn btn-primary" @click="EditSchedule">Display Schedule</button>
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
