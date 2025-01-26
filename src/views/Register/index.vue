<script setup>
import {ref, watch} from 'vue';
import router from "@/router";
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css';
import { ShowFacultyApi } from '@/apis/Faculty';
import { ShowGroupApi } from '@/apis/Group';
import { ShowDirectionApi } from '@/apis/Direction';

const form = ref({
  name: '',
  birthdate: '',
  email: '',
  phone: '',
  avatar: '',
  usertype: '',
  faculty: '',
  direction: '',
  group: ''
});

const rules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  birthdate: [{ required: true, message: 'Birthdate is required', trigger: 'change' }],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Email is invalid', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: 'Phone number is required', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: 'Phone must be numbers only', trigger: 'blur' }
  ],
  avatar: [{ required: true, message: 'Avatar is required', trigger: 'blur' }],
  usertype: [{ required: true, message: 'User type is required', trigger: 'change' }],
  faculty: [{ required: true, message: 'Faculty is required', trigger: 'change' }],
  direction: [{ required: true, message: 'Direction is required', trigger: 'change' }],
  group: [{ required: true, message: 'Group is required', trigger: 'change' }]
};

const formRef = ref(null);

const facultyOptions = ref([]);
const directionOptions = ref([]);
const groupOptions = ref([]);

// get Faculty 
const loadFaculty = async () => {
  try {
    const response = await ShowFacultyApi();
    facultyOptions.value = response;
  } catch (error) {
    console.error('Failed to fetch faculty data:', error);
  }
};

// get Direction
const loadDirection = async (facultyId) => {
  try {
    const response = await ShowDirectionApi(facultyId);
    directionOptions.value = response;
  } catch (error) {
    console.error('Failed to fetch direction data:', error);
  }
};

// get Group
const loadGroup = async (directionId) => {
  try {
    const response = await ShowGroupApi(directionId);
    groupOptions.value = response;
  } catch (error) {
    console.error('Failed to fetch group data:', error);
  }
};

// Monitor changes in Faculty, clear Direction and Group and load new Direction
watch(
  () => form.value.faculty,
  (newValue) => {
    form.value.direction = '';
    form.value.group = '';
    directionOptions.value = [];
    groupOptions.value = [];
    if (newValue) {
      loadDirection(newValue);
    }
  }
);

// Monitor Direction changes, clear Groups and load new Groups
watch(
  () => form.value.direction,
  (newValue) => {
    form.value.group = '';
    groupOptions.value = [];
    if (newValue) {
      loadGroup(newValue);
    }
  }
);

loadFaculty();

const doRegister = async () => {
  try {
    const payload = {
      name: form.value.name,
      birthdate: form.value.birthdate,
      email: form.value.email,
      phone: form.value.phone,
      avatar: form.value.avatar,
      usertype: form.value.usertype,
      faculty: form.value.usertype === 'Student' ? form.value.faculty : null,
      direction: form.value.usertype === 'Student' ? form.value.direction : null,
      group: form.value.usertype === 'Student' ? form.value.group : null,
      subject: form.value.usertype === 'Teacher' ? form.value.subject : null
    };

    const response = await axiosInstance.post('https://localhost:7055/api/user/register', payload);

    // Handle successful registration
    if (response.data.success) {
      ElMessage({
        message: 'Registration successful!',
        type: 'success'
      });
      // Redirect or reset form if needed
      form.value = {
        name: '',
        birthdate: '',
        email: '',
        phone: '',
        avatar: '',
        usertype: '',
        faculty: '',
        direction: '',
        group: '',
        subject: ''
      };
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    // Handle errors
    ElMessage({
      message: error.response?.data?.message || 'An error occurred during registration.',
      type: 'error'
    });
  }
};

console.log(form)
</script>


<template>
  <div>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">Registration</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
              <el-form-item label="Name" prop="name">
                <el-input v-model="form.name" placeholder="Enter your name" />
              </el-form-item>
              <el-form-item label="Birthdate" prop="birthdate">
                <el-date-picker
                  v-model="form.birthdate"
                  type="date"
                  placeholder="Select your birthdate"
                  style="width: 100%;"
                />
              </el-form-item>
              <el-form-item label="E-mail" prop="email">
                <el-input v-model="form.email" placeholder="Enter your email" />
              </el-form-item>
              <el-form-item label="Phone" prop="phone">
                <el-input v-model="form.phone" placeholder="Enter your phone number" />
              </el-form-item>
              <el-form-item label="Avatar" prop="avatar">
                <el-input v-model="form.avatar" placeholder="Enter your avatar URL" />
              </el-form-item>
              <el-form-item label="User Type" prop="usertype">
                <el-radio-group v-model="form.usertype">
                  <el-radio label="Student">Student</el-radio>
                  <el-radio label="Teacher">Teacher</el-radio>
                </el-radio-group>
              </el-form-item>

              <!-- Conditional Fields for Student -->
              <template v-if="form.usertype === 'Student'">
                <el-form-item label="Faculty" prop="faculty">
                  <el-select v-model="form.faculty" placeholder="Select your faculty">
                    <el-option
                      v-for="faculty in facultyOptions"
                      :key="faculty.facultyId"
                      :label="faculty.name"
                      :value="faculty.facultyId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Direction" prop="direction">
                  <el-select v-model="form.direction" placeholder="Select your direction">
                    <el-option
                      v-for="direction in directionOptions"
                      :key="direction.directionId"
                      :label="direction.name"
                      :value="direction.directionId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Group" prop="group">
                  <el-select v-model="form.group" placeholder="Select your group">
                    <el-option
                      v-for="group in groupOptions"
                      :key="group.groupId"
                      :label="group.groupNumber"
                      :value="group.groupId"
                    />
                  </el-select>
                </el-form-item>
              </template>

              <div class="login-actions">
                <el-button size="large" class="subBtn" @click="doRegister">Register</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped lang="scss">
.login-section {
  position: relative;

  .wrapper {
    width: 600px;
    position: absolute;
    left: 30%;
    top: 54px;
    transform: translate3d(100px, 0, 0);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 30px;
        position: relative;
        text-align: center;
        font-weight: 1000;
      }
    }
  }
}

.account-box {
  .form {
    padding: 0 20px 20px 20px;

    .el-form-item {
      margin-bottom: 20px;
    }

    .el-input {
      position: relative;

      &.input-error input {
        border-color: #cf4444 !important;
      }

      input {
        padding: 10px 15px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        width: 100%;
        box-sizing: border-box;
      }

      &.input-error {
        input:focus {
          border-color: #cf4444 !important;
        }
      }
    }

    .error-message {
      font-size: 12px;
      color: #cf4444;
      margin-top: 5px;
    }
  }
}

.subBtn {
  background: #000000;
  width: 100%;
  color: #fff;
}

.login-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.links-row {
  display: flex; 
  margin-top: 20px; 
}

.link:not(:last-child) {
  margin-right: 20px;
}
</style>

