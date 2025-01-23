<!-- views/Profile/Profile.vue -->

<template>
  <div class="profile-page">
    <el-form :model="profile" :rules="rules" ref="profileForm" label-width="120px">
      <el-form-item label="First Name" prop="firstName">
        <el-input v-model="profile.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastName">
        <el-input v-model="profile.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Birthdate" prop="birthDate">
        <el-date-picker v-model="profile.birthDate" type="date" placeholder="Select date"></el-date-picker>
      </el-form-item>
      <el-form-item label="Phone" prop="phoneNumber">
        <el-input v-model="profile.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="Avatar URL" prop="avatar">
        <el-input v-model="profile.avatar"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
        <el-button @click="onReset">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/UserStore";
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

const userStore = useUserStore();

const profile = ref({
  firstName: '',
  lastName: '',
  birthDate: '',
  phoneNumber: '',
  avatar: '',
});

const rules = {
  firstName: [{ required: true, message: 'Please input first name', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Please input last name', trigger: 'blur' }],
  birthDate: [{ required: true, message: 'Please select birthdate', trigger: 'change' }],
  phoneNumber: [{ required: true, message: 'Please input phone number', trigger: 'blur' }],
};

const profileForm = ref(null);

const fetchProfile = async () => {
  await userStore.fetchUserProfile();
  const userProfile = userStore.userInfo.profile;
  if (userProfile) {
    profile.value.firstName = userProfile.firstName;
    profile.value.lastName = userProfile.lastName;
    profile.value.birthDate = userProfile.birthDate;
    profile.value.phoneNumber = userProfile.phoneNumber;
    profile.value.avatar = userProfile.avatar;
  }
};

onMounted(() => {
  fetchProfile();
});

const onSubmit = () => {
  profileForm.value.validate(async (valid) => {
    if (valid) {
      try {
        const profileData = { ...profile.value };
        await userStore.updateUserProfile(profileData);
        ElMessage.success('Profile updated successfully');
      } catch (error) {
        ElMessage.error('Failed to update profile');
      }
    }
  });
};

const onReset = () => {
  fetchProfile();
};
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>