<script setup>

</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">Team2 Work</h1>
        <div class="entry">
          <RouterLink to="/login" class="link">login</RouterLink>
          <RouterLink to="/register" class="link">register</RouterLink>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  height: 80px; /* 固定高度 */

  .container {
    height: 100%; /* 继承父容器的高度 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: space-between; /* 左右对齐 */
  }

  .logo {
    font-size: 24px; /* 字体大小 */
    font-weight: bold; /* 加粗 */
    color: #333; /* 字体颜色 */
  }

  .entry {
    display: flex;
    gap: 20px; /* 登录和注册之间的间距 */
    font-size: 16px;

    .link {
      text-decoration: none; /* 去掉下划线 */
      transition: color 0.3s;
    }
  }
}
</style>
