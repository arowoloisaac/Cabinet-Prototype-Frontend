<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { AdminShowCourseByIdAPI, GetDisciplineDetailApi } from '@/apis/Discipline';
import { getTeacherListAPI } from '@/apis/User';
import { ShowFacultyApi } from '@/apis/Faculty';
import { ShowGroupApi } from '@/apis/Group';
import { ShowDirectionApi } from '@/apis/Direction';
import { UpdateDisciplineAPI } from '@/apis/Discipline';
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isAdmin); // 判断是否为 Admin


// 路由参数
const route = useRoute();

// 表单数据
const formData = ref({
  id: '',
  name: '',
  description: '',
  literature: '',
  reading: '',
  year: '',
  semester: '',
  teachers: [],
  faculty: '',
  direction: '',
  group: ''
});

// 教师列表
const teacherOptions = ref([]);

// 获取教师列表
const fetchTeachers = async () => {
  try {
    const res = await getTeacherListAPI();
    teacherOptions.value = res;
  } catch (error) {
    console.error('failed get course list:', error);
  }
};

// 学院、方向、组的选项
const facultyOptions = ref([]);
const directionOptions = ref([]);
const groupOptions = ref([]);

// 获取学院列表
const loadFaculty = async () => {
  try {
    const response = await ShowFacultyApi();
    facultyOptions.value = response;
  } catch (error) {
    console.error('failed get faculty list:', error);
  }
};

// 根据学院 ID 获取方向列表
const loadDirection = async (facultyId) => {
  try {
    const response = await ShowDirectionApi(facultyId);
    directionOptions.value = response;
  } catch (error) {
    console.error('failed get direction list:', error);
  }
};

// 根据方向 ID 获取组列表
const loadGroup = async (directionId) => {
  try {
    const response = await ShowGroupApi(directionId);
    groupOptions.value = response;
  } catch (error) {
    console.error('failed get group list:', error);
  }
};

// 获取课程详情
const fetchDisciplineDetail = async (id) => {
  try {
    const response = isAdmin.value
      ? await AdminShowCourseByIdAPI(id)
      : await GetDisciplineDetailApi(id);
    formData.value = {
      id: response.courseId,
      name: response.name,
      description: response.description,
      literature: response.literature,
      reading: response.reading,
      year: response.year,
      semester: response.semester === 0 ? 'Autumn' : 'Spring',
      teachers: response.courseTeachers.map((teacher) => teacher.teacherId),
      faculty: response.facultyId,
      direction: response.directionId,
      group: response.groupId
    };
  } catch (error) {
    console.error('failed get course detail:', error);
  }
};

// 提交表单
const submitForm = async () => {
  try {
    const payload = {
      name: formData.value.name,
      description: formData.value.description,
      literature: formData.value.literature,
      reading: formData.value.reading,
      year: formData.value.year,
      semester: formData.value.semester === 'Autumn' ? 0 : 1,
      groupId: formData.value.group,
      courseTeachers: formData.value.teachers.map((teacherId) => ({
        teacherId
      }))
    };
    await UpdateDisciplineAPI(formData.value.id,payload);
    ElMessage.success('success update displine');
  } catch (error) {
    console.error('failed get displine:', error);
  }
};

// 监听学院变化
watch(
  () => formData.value.faculty,
  (newValue) => {
    formData.value.direction = '';
    formData.value.group = '';
    directionOptions.value = [];
    groupOptions.value = [];
    if (newValue) {
      loadDirection(newValue);
    }
  }
);

// 监听方向变化
watch(
  () => formData.value.direction,
  (newValue) => {
    formData.value.group = '';
    groupOptions.value = [];
    if (newValue) {
      loadGroup(newValue);
    }
  }
);

// 初始化加载数据
onMounted(() => {
  const courseId = route.params.id;
  fetchDisciplineDetail(courseId);
  fetchTeachers();
  loadFaculty();
});
</script>

<template>
  <div class="create-discipline container">
    <div style="padding: 3%;">
      <h2>Edit Discipline</h2>
    </div>
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
          <QuillEditor v-model:content="formData.description" contentType="html" theme="snow" placeholder="Write the description of the course here" class="form-control" />
        </div>
      </div>
      <div class="col-12">
        <label for="Literature" class="form-label">Literature</label>
        <div style="height: 160px; padding-bottom: 5%;">
          <QuillEditor v-model:content="formData.literature" contentType="html" theme="snow" placeholder="Write the literature about the course here" class="form-control" id="Literature" />
        </div>
      </div>
      <div class="col-12">
        <label for="Reading" class="form-label">Reading</label>
        <div style="height: 160px; padding-bottom: 5%;">
          <QuillEditor v-model:content="formData.reading" contentType="html" theme="snow" placeholder="Write the reading about the course here" class="form-control" id="Reading" />
        </div>
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
        <label for="Faculty" class="form-label">Faculty</label>
        <select v-model="formData.faculty" id="Faculty" class="form-select">
          <option disabled selected>Choose...</option>
          <option v-for="faculty in facultyOptions" :key="faculty.facultyId" :value="faculty.facultyId">{{ faculty.name }}</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="Direction" class="form-label">Direction</label>
        <select v-model="formData.direction" id="Direction" class="form-select">
          <option disabled selected>Choose...</option>
          <option v-for="direction in directionOptions" :key="direction.directionId" :value="direction.directionId">{{ direction.name }}</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="Group" class="form-label">Group</label>
        <select v-model="formData.group" id="Group" class="form-select">
          <option disabled selected>Choose...</option>
          <option v-for="group in groupOptions" :key="group.groupId" :value="group.groupId">{{ group.groupNumber }}</option>
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
