<script setup>
import {ref} from 'vue';
import router from "@/router";
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css';
import{useUserStore} from "@/stores/UserStore";
const userStore = useUserStore();

const form = ref({
    email:'',
    password:'',
})

const rules = {
  email: [
    {required: true, message: 'must type email',trigger: 'blur'}
  ],
  password: [
    {required: true, message: 'must type password',trigger: 'blur'},
    {min: 6, message: 'password is not less than 6 numbers',trigger: 'blur'}
  ]
}

const formRef = ref(null);

const doLogin = () =>{
    formRef.value.validate(async (valid)=>{
        if(valid){
            const{email,password}=form.value;
            await userStore.getUserInfo({email,password});
            ElMessage({type:'success',message:'login success'})
            const preLoginRoute = sessionStorage.getItem('preLoginRoute') || '/';
            router.replace(preLoginRoute);
            localStorage.removeItem('redirectRoute'); // Clear the saved route
        }
        
    })
}

</script>


<template>
  <div>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">Login the account</a>
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
              <el-form-item prop="password">
                <el-input
                  v-model="form.password"
                  type="password"
                  placeholder="password"
                />
              </el-form-item>
              <div class="login-actions">
                <el-button size="large" class="subBtn" @click="doLogin">Login</el-button>
                <div class="links-row">
                  <RouterLink to="/register" class="link">Regishter</RouterLink>
                  <RouterLink to="/reset-pasword" class="link">Forgot your password?</RouterLink>
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
.login-section {
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

