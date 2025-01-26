<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {getTeacherListAPI} from '@/apis/User'
import {AddDiscipline} from '@/apis/Discipline'
import { QuillEditor } from '@vueup/vue-quill';

// 定义表单数据
const formData = ref({
  name: '',
  description: '',
  literature: '',
  reading: '',
  year: '',
  semester: '',
  teachers: [] // 教师的 ID 列表
});

// 教师列表
const teacherOptions = ref([]);

// 获取教师列表
const fetchTeachers = async () => {
  try {
    const res = await getTeacherListAPI();
    teacherOptions.value = res;
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
};

// 提交表单的函数
const submitForm = async () => {
  try {
    // 构造请求数据
    const payload = {
      name: formData.value.name,
      description: formData.value.description,
      literature: formData.value.literature,
      reading: formData.value.reading,
      year: formData.value.year,
      semester: formData.value.semester === 'Autumn' ? 0 : 1,
      groupId: '56c627e4-aac8-4de5-ad13-ddb5caa9f6ed', //样式，后续需要修改
      courseTeachers: formData.value.teachers.map((teacherId) => ({
        teacherId: teacherId
      }))
    };

    // 发送 POST 请求
    console.log(payload)
    const res = await AddDiscipline(payload);
    console.log('Success:', res.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// 初始化时获取教师列表
onMounted(() => {
  fetchTeachers();
});
</script>

<template>
  <div style="padding: 3%;">
    <h2>Create Discipline</h2>
  </div>
  <div class="create-discipline container">
    <form class="row g-3" @submit.prevent="submitForm">
      <div class="col-md-6">
        <label for="course-name" class="form-label">Course Name</label>
        <input v-model="formData.name" placeholder="course name" class="form-control" id="course-name" />
      </div>
      <div class="col-md-6">
        <label for="year" class="form-label">Year</label>
        <input v-model="formData.year" placeholder="2010 - 2011" class="form-control" id="year" />
      </div>
      <div class="col-12">
        <label for="Description" class="form-label">Description</label>
        <div style="height: 180px; padding-bottom: 5%;">
          <QuillEditor class="form-control" v-model="formData.description" placeholder="   Write the description of the course here"  />
        </div>
      </div>
      <div class="col-12">
        <label for="Literature" class="form-label">Literature</label>
        <div style="height: 160px; padding-bottom: 5%;"><QuillEditor v-model="formData.literature" placeholder="    Write the literature about the course here" class="form-control" id="Literature"   /></div>
      </div>
      <div class="col-12">
        <label for="Reading" class="form-label">Reading</label>
         <div style="height: 160px; padding-bottom: 5%;"><QuillEditor v-model="formData.reading" placeholder="    Write the reading about the course here" class="form-control" id="Reading"  /></div>
      </div>
      <div class="col-md-6">
        <label for="Semester" class="form-label">Semester</label>
        <select v-model="formData.semester" id="Semester" class="form-select">
          <option disabled selected>Choose...</option>
          <option value="Autumn">Autumn</option>
          <option value="Spring">Spring</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="Teachers" class="form-label">Teachers</label>
        <select v-model="formData.teachers" id="Teachers" class="form-select" multiple>
          <option v-for="teacher in teacherOptions" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
        </select>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Create Discipline</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}
</style>
