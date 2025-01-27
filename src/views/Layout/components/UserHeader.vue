<script setup>
import { useUserStore } from "@/stores/UserStore";
import { computed } from 'vue';
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

// 计算属性，用于判断用户是否登录以及获取用户信息
const isLoggedIn = computed(() => !!userStore.userProfile?.firstName);
const userName = computed(() => `${userStore.userProfile?.firstName} ${userStore.userProfile?.lastName}`);
const userAvatar = computed(() => userStore.userProfile.value?.avatar || 'https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/oca9b9DDvAfKr2NkAv5KvogEnbADeAApYCAlrI~noop.jpeg?biz_tag=pcweb_cover&card_type=303&column_n=0&from=327834062&lk3s=138a59ce&s=PackSourceEnum_SEARCH&se=false&x-expires=1739095200&x-signature=e0SjgnMAQcLIK7Zm3Iljtzjwu7Q%3D');
const isAdmin = userStore.isAdmin;

const logout = () => {
  userStore.clearUserInfo(); // 清空用户信息
  router.push("/login"); // 跳转到登录页面
};

const goToAdminPanel = () => {
    router.push('/admin/home');
};
const disciplineList = () => {
  router.replace('/faculty/direction/group/discipline');
};
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <RouterLink to="/">
          <h1 class="logo">Team2 Work</h1>
        </RouterLink>
        <div class="entry">
          <template v-if="isLoggedIn">
<!--            <div class="welcome">-->
<!--              <img :src="userAvatar" alt="Avatar" class="avatar" />-->
<!--              <span>{{ userName }}</span>-->
<!--            </div>-->
            <div class="welcome">
              <!-- Avatar and name link to profile -->
              <router-link to="/profile" class="user-info">
                <img
                    :src="'src/assets/images/avatar.jpg'"
                    alt="Avatar"
                    class="avatar"
                />
                <span class="username">{{ userStore.userProfile.firstName }} {{ userStore.userProfile.lastName }}</span>
              </router-link>

            </div>
            <button v-if="isAdmin" class="admin-panel-btn" @click="goToAdminPanel">Admin Panel</button>
            <button class="admin-panel-btn" @click="logout">Logout</button>
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
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .entry {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;

    .link {
      text-decoration: none;
      transition: color 0.3s;
    }

    .welcome {
      display: flex;
      align-items: center;
      gap: 10px;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .admin-panel-btn {
      padding: 5px 20px;
      background-color: #000;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #000;
      }
    }
  }
}
</style>
