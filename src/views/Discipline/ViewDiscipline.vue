<script setup>
import { ref, onMounted } from 'vue';
import { GetDisciplineDetailApi } from '@/apis/Discipline';
import { useRoute, useRouter } from 'vue-router';
import { GetScheduleByCourseApi } from '@/apis/schedule';

// 学科详情数据
const disciplineDetail = ref(null);
const scheduleDetail = ref(null);

// 路由参数获取 ID（假设使用 Vue Router）
const route = useRoute();
const router = useRouter();

// 获取学科详情的方法
const fetchDisciplineDetail = async (id) => {
  try {
    const response = await GetDisciplineDetailApi(id);
    disciplineDetail.value = response; 
  } catch (error) {
    console.error('Failed to fetch discipline details:', error);
  }
};

const fetchschedule = async (id) => {
  try {
    const response = await GetScheduleByCourseApi(id);
    scheduleDetail.value = response; 
  } catch (error) {
    console.error('Failed to fetch schedule details:', error);
  }
};

// 返回上一页
const goBack = () => {
  router.push('/faculty/direction/group/discipline'); 
};

// 在组件加载时获取数据
onMounted(() => {
  const id = route.params.id;
  if (id) {
    fetchDisciplineDetail(id);
    fetchschedule(id);
  }
});

const getDayLabel = (classTime) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[classTime] || "Unknown Day";
};
</script>

<template>
  <div class="subject-details" v-if="disciplineDetail">
    <!-- Title -->
    <h1>{{disciplineDetail.name}}</h1>
    <p>{{disciplineDetail.year}}</p>

    <!-- Description -->
    <h2>Description</h2>
    <div v-html="disciplineDetail.description"></div>

    <!-- Literature List -->
    <h2>Literature List</h2>
    <div v-html="disciplineDetail.literature"></div>

    <!-- Reading -->
    <h2>Reading</h2>
    <div v-html="disciplineDetail.reading"></div>

    <!-- Teachers -->
    <h2>Teachers</h2>
    <ul>
      <li v-for="teacher in disciplineDetail.courseTeachers" :key="teacher.teacherId">
        {{ teacher.firstName }} {{ teacher.lastName }}
      </li>
    </ul>

    <!-- Schedule -->
    <h2>Schedule</h2>
    <ul>
      <li v-for="schedule in scheduleDetail" :key="schedule.scheduleId">
        <strong>{{ getDayLabel(schedule.classTime) }}</strong>:
        <span v-if="schedule.format === 'Offline'">
          Offline at {{ schedule.location }}, Room {{ schedule.classNumber }}
        </span>
        <span v-else>
          Online
        </span>
      </li>
    </ul>

    <!-- Back Button -->
    <button @click="goBack">Back to Discipline List</button>
  </div>

  <div v-else>
    <p>Loading discipline details...</p>
  </div>
</template>

<style scoped>
/* Page Layout */
.subject-details {
  padding: 1rem;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  border-radius: 10px;
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Title Styling */
.subject-details h1 {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 1rem;
}

/* Section Headings */
.subject-details h2 {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #333;
}

/* Lists */
.subject-details ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}

.subject-details li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.subject-details li:last-child {
  border-bottom: none;
}

/* Back Button */
.subject-details button {
  margin-top: 2rem;
  padding: 0.7rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.subject-details button:hover {
  background-color: #0056b3;
}
</style>
