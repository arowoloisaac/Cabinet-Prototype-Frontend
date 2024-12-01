<!-- Layout/Components/UserHeader.vue -->

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import { ElButton } from 'element-plus';

const userStore = useUserStore();
const router = useRouter();

// Computed property to check if the user is logged in
const isLoggedIn = computed(() => !!userStore.userInfo.token);

// Computed property to get the user's profile information
const userProfile = computed(() => userStore.userInfo.profile || {});

// Logout function
const logout = () => {
  userStore.clearUserInfo();
  router.push('/login');
};
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container">
        <h1 class="logo">Team2 Work</h1>
        <div class="entry">
          <!-- Conditionally render based on login status -->
          <template v-if="isLoggedIn">
            <div class="user-section">
              <!-- Avatar and name link to profile -->
              <router-link to="/profile" class="user-info">
                <img
                    :src="userProfile.avatar || 'src/assets/images/default-avatar.jpg'"
                    alt="Avatar"
                    class="avatar"
                />
                <span class="username">{{ userProfile.firstName }} {{ userProfile.lastName }}</span>
              </router-link>
              <!-- Logout button -->
              <el-button type="text" @click="logout" class="logout-button">Logout</el-button>
            </div>
          </template>
          <template v-else>
            <RouterLink to="/login" class="link">Login</RouterLink>
            <RouterLink to="/register" class="link">Register</RouterLink>
          </template>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  height: 80px;

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .entry {
    display: flex;
    align-items: center;

    .link {
      text-decoration: none;
      color: #333;
      margin-left: 20px;
      transition: color 0.3s;

      &:hover {
        color: #27ba9b;
      }
    }

    .user-section {
      display: flex;
      align-items: center;

      .user-info {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #333;

        &:hover {
          color: #27ba9b;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
          object-fit: cover;
        }

        .username {
          font-weight: bold;
        }
      }

      .logout-button {
        margin-left: 20px;
        color: #333;

        &:hover {
          color: #e26237;
        }
      }
    }
  }
}
</style>
