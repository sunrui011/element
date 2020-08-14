<template>
  <div class="login_container">
    <div class="login-box">
        <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域  记住按需导入   在plugins中的element文件中-->
      <!-- 这个80px就是为label文本保留的，不要文本的就把这个也删掉  0也行 -->
      <!-- el-form有一个属性是数据绑定  :model='form'   那么form是一个数据对象，他被定义在data区域 -->
      <!-- ref的值就是我们的表单实例对象 -->
      <el-form  ref="loginFormRef" label-width="0px" class="login-form" :model="loginForm" :rules='loginRules'>
          <!-- 表单用户行 label是提示文本 -->
          <el-form-item prop='username'>
              <!-- prefix-icon给表单前边加icon -->
              <!-- 有了el-form的数据绑定  接下来在文本输入框中就可以绑定我们的数据了-->
            <el-input  prefix-icon="iconfont icon-seeuser" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码行 -->
           <el-form-item prop='password'>
            <el-input  prefix-icon="iconfont icon-wodemima" v-model="loginForm.password" type='password'></el-input>
          </el-form-item>
          <!-- 登录重置行 -->
           <el-form-item class="btns"> 
             <!-- 表单的预验证 validate函数 返回一个 -->
            <el-button type='primary' @click="login()">登录</el-button>
            <!-- 重置有一个表单方法   resetfields-->
            <el-button type='info' @click="resetLoginForm()">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>


<script>
export default {
    data(){
      return {
        //这是登陆表单的数据对象
        loginForm:{
            username:'test',
            password:'123456'
        },
        //表单的验证规则
        loginRules:{
           username:[
            //  required表示这是一个必填项 message表示错误的消息 trigger表示鼠标失去焦点的时候触发验证
              {required:true,message:'请输入登录名称',trigger:'blur'},
              {min:3,max:15,message:'长度在3到10个字符',trigger:'blur'}
           ],
           password:[
               {required:true,message:'请输入登录密码',trigger:'blur'},
               {min:6,max:15,message:'长度在6到15个字符',trigger:'blur'}
           ]
        }
      }
    },
    methods:{
      // 点击重置按钮   重置表单
      resetLoginForm(){
        // 引用对象就是对象的实例   引用对象就是this.loginFormRef
        // console.log(this);
        // loginFormRef就是el-form中定义的ref值   this.$refs固定写法
        this.$refs.loginFormRef.resetFields();
      },
      login(){
        // validate接收一个回调函数 第一个形参是一个布尔值，一般叫valid
        //  this.$refs.loginFormRef  叫拿到表单的引用对象
        this.$refs.loginFormRef.validate(async (valid) =>{
            // console.log(valid)
            // if(!valid) return;表示如果valid如果为false，就不发起请求
            // 在这儿要发起请求了，还没配axios，在main.js中进行axios的全局配置
            // 这个请求的请求路径是login，请求方法是post，并且携带两个参数username和password
            //本来this.$http.post('login',{username，password})
            // {data:res}解构赋值
            // const {data : res} = await this.$http.post('login',this.loginForm);
            // console.log(res)
            // axios.get('http://www.shop.com/login').then((res)=>{
            //   console.log(res.data)
            // })
            // console.log('登陆成功')
            // 弹框效果   在element.js中引入才能用
            // return this.$message.success('登陆成功！')
            // 编程式导航
            this.$router.push('/home');
            return this.$message.success('登陆成功！');

        });
      }
    }
};
</script>

<style lang="less" scoped>
//加一个全局样式表    在main.js中导入
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
//给盒子加样式并放置页面正中间
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    //让边框向外扩散10px阴影
    box-shadow: 0 0 10px #ddd;
    //摆正盒子
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
    //居右对其，横轴     尾部对齐
    display: flex;
    justify-content: flex-end;
}
.login-form {
    //让整个的文本框距离底部对齐
    position: absolute;
    bottom: 0;
    //横向满
    width: 100%;
    //加点padding
    padding: 0 20px;
    //此时发现盒子左边有20px，但是右边就出来了  这是因为这个form表单默认是box-sizing::content
    // 改成box-sizing:border-box就行
    box-sizing:border-box;
}
</style>
