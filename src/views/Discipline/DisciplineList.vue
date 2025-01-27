<script setup>
import { useUserStore } from "@/stores/UserStore";
import { computed, ref, watch, onMounted } from "vue";
import { StudentListDisciplineAPI, TeacherListDisciplineAPI } from "@/apis/Discipline";
import router from "@/router/index.js";

const userStore = useUserStore();
const isTeacher = computed(() => userStore.isTeacher); // 判断是否为 Teacher
const isStudent = computed(() => userStore.isStudent); // 判断是否为 Student
const isAdmin = computed(() => userStore.isAdmin); // 判断是否为 Student

// 所有类别列表
const allCategories = ["Autumn", "Spring", "Own Disciplines"];
const selectedCategory = ref(""); // 默认值为空

// 动态过滤类别列表
const categories = computed(() => {
  if (isTeacher.value && isStudent.value) {
    return allCategories; // 同时是老师和学生，显示全部
  }
  if (isTeacher.value) {
    return allCategories.filter((category) => category === "Own Disciplines"); // 仅是老师
  }
  if (isStudent.value) {
    return allCategories.filter((category) => category !== "Own Disciplines"); // 仅是学生
  }
  return [];
});

// 设置默认的类别
const setDefaultCategory = () => {
  if (isStudent.value && !isTeacher.value) {
    selectedCategory.value = "Autumn";
  } else if (isTeacher.value && !isStudent.value) {
    selectedCategory.value = "Own Disciplines"; 
  } else if (isTeacher.value && isStudent.value) {
    selectedCategory.value = "Autumn";
  }
};

// 课程数据
const disciplines = ref([]);

// 根据类别加载课程数据
const loadDisciplines = async () => {
  try {
    if (isStudent.value && ["Autumn", "Spring"].includes(selectedCategory.value)) {
      const semester = selectedCategory.value === "Autumn" ? 0 : 1; // 0: Autumn, 1: Spring
      const response = await StudentListDisciplineAPI(semester);
      disciplines.value = response;
    }
    if (isTeacher.value && selectedCategory.value === "Own Disciplines") {
      const response = await TeacherListDisciplineAPI();
      disciplines.value = response;
    }
  } catch (error) {
    console.error("Error loading disciplines:", error);
  }
};
const createDiscipline = () =>{
  router.replace("/admin/faculty/direction/discipline/create");
}
// 页面初始化时设置默认类别并加载课程
onMounted(() => {
  setDefaultCategory(); // 设置默认类别
  loadDisciplines(); // 加载课程数据
});

// 监听类别变化，重新加载课程数据
watch(selectedCategory, loadDisciplines);
</script>

<template>
  <div class="discipline-page" style="padding: 2% 7% 3% 7%;">
    <!-- 顶部分类栏 -->
    <div class="category-bar">
      <button
        v-for="category in categories"
        :key="category"
        :class="['category-button', { active: category === selectedCategory }]"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- 学科列表部分 -->
    <div class="discipline-list">
      <div class="flex">
        <h2>{{ selectedCategory }} Disciplines</h2>
        <button v-if="isAdmin" @click="createDiscipline">Create Discipline</button>
      </div>
      <ul>
        <li v-for="discipline in disciplines" :key="discipline.courseId">
          <strong><router-link :to="`/discipline/display/${discipline.courseId}`">
            {{ discipline.name }}
          </router-link></strong>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* General Page Styling */
.discipline-page {
  padding: 1rem;
  font-family: Arial, sans-serif;
}

/* Category Bar Styling */
.category-bar {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  background-color: #f8f8f8;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-button {
  border: none;
  background: transparent;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.category-button.active {
  background-color: #007bff;
  color: white;
}

.category-button:hover {
  background-color: #dceeff;
}

/* Discipline List Styling */
.discipline-list {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.discipline-list h2 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
}

.discipline-list ul {
  list-style: none;
  padding: 0;
}

.discipline-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.discipline-list li:last-child {
  border-bottom: none;
}
</style>
