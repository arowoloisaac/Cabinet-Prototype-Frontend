<script setup>
import {ref} from 'vue';
import router from "@/router";
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css';
const form = ref({
    email:'',
})

const rules = {
  email: [
    {required: true, message: 'must type email',trigger: 'blur'}
  ]
}

const formRef = ref(null);

</script>


<template>
  <div>
    <section class="ResetPassword-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">Reset password page</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="0px">
              <el-form-item prop="email">
                <el-input
                  v-model="form.email"
                  placeholder="E-mail"
                />
              </el-form-item>
              <div class="ResetPassword-actions">
                <el-button size="large" class="subBtn" @click="doResetPassword">Reset Password</el-button>
                <div class="links-row">
                  <RouterLink to="/register" class="link">Regishter</RouterLink>
                  <RouterLink to="/forgot_password" class="link">Forgot your password?</RouterLink>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.ResetPassword-section {
  position: relative;

  .wrapper {
    width: 600px;
    position: absolute;
    left: 25%;
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

.ResetPassword-actions {
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

