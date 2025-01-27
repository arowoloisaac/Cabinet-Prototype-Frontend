<script setup>
import { computed, ref, onMounted } from 'vue';
import { GetDisciplineDetailApi, AdminShowCourseByIdAPI, DeleteDisciplineAPI } from '@/apis/Discipline';
import { useRoute, useRouter } from 'vue-router';
import { GetScheduleByCourseApi, DeleteScheduleApi } from '@/apis/schedule';
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isAdmin); // 判断是否为 Admin
const isTeacher = computed(() => userStore.isTeacher); // 判断是否为 Student

// 学科详情数据
const disciplineDetail = ref(null);
const scheduleDetail = ref(null);

// 路由参数获取 ID（假设使用 Vue Router）
const route = useRoute();
const router = useRouter();

// 获取学科详情的方法
const fetchDisciplineDetail = async (id) => {
  try {
    if(isAdmin.value)
    {
      const response = await AdminShowCourseByIdAPI(id);
      disciplineDetail.value = response; 
    }
    else
    {
      const response = await GetDisciplineDetailApi(id);
      disciplineDetail.value = response; 
    }
    
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
const disid = route.params.id;

const goEdit = () => {
  router.push(`/admin/faculty/direction/discipline/edit/${disid}`); 
};

const goDelete = async () => {
  try {
    const response = await DeleteDisciplineAPI(disid);
    router.replace('/faculty/direction/group/discipline'); 
  } catch (error) {
    console.error('Failed to fetch schedule details:', error);
  }
};

const navigateToEditSchedule = (scheduleId) => {
  router.push(`/edit-schedule/${scheduleId}`);
};

const deleteSchedule = async (scheduleId) => {
  try {
    const response = await DeleteScheduleApi(scheduleId);
    await fetchschedule(disid);
  } catch (error) {
    console.error('Failed to fetch schedule details:', error);
  }
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
        <!-- 跳转链接 -->
        <span class="edit-link" @click="navigateToEditSchedule(schedule.scheduleId)" style="margin-left: 30px">
          <a href="javascript:void(0)">Edit</a>
        </span>
        <span class="edit-link" @click="deleteSchedule(schedule.scheduleId)" style="margin-left: 15px">
          <a href="javascript:void(0)">Delete</a>
        </span>
      </li>
    </ul>

    <!-- Back Button -->
    <button @click="goBack">Back to Discipline List</button>
    <button @click="goEdit" style="margin-left: 20px" v-if="isAdmin || isTeacher">Edit Displine</button>
    <button @click="goDelete" style="margin-left: 20px" v-if="isAdmin">Delete Displine</button>
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
