<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <!-- 一行两列 一列占多宽用:span,列于列之间的空隙用:gutter -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable=""
          >
            <!-- 搜索功能没有实现  因为直接调用后台返回数据的那个axios请求函数就可以 我没有 -->
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <!-- stripe隔行变色 -->
      <el-table :data="userlist" border stripe>
        <!-- 索引列 只需加一个 type='index' -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!--  slot-scope="scope"这一行  作用于插槽  scope.row是这一行对应的数据-->
          <template slot-scope="scope">
            <!-- v-model="scope.row.mg_state"渲染状态 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog()"
            >
            </el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页效果 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 4, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框  -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%"  @close="showEditDialogClosed">
       <el-form ref="editFormRef" :model="editForm" label-width="80px" :rules='editFormRules'>
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop='mobile'>
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span> 
    </el-dialog> 
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的校验规则
    // var checkEmail = (rule, value, cb) => {
    //  通过正则实现校验
    // const regEmail = /^([a-zA-Z0-9_-])+@(
    // [a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

    // if(regEmail.test(value)){
    //合法的邮箱
    // return cb()
    // }
    // cb(new Error('请输入合法的邮箱'))
    // }

    // 验证手机号的校验规则
    // var checkMobile = (rule,value,cb) => {
    //  验证手机号的正则表达式
    // const regMobile = /^(0|86|17951)?(13[0-9]|15
    // [0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

    // if(regMobile.test(value)){
    //合法的邮箱
    // return cb()
    // }
    // cb(new Error('请输入合法的手机号'))
    // }

    return {
      userlist: [
        {
          id: 25,
          role_name: "超级管理员",
          username: "王阳",
          created_time: 148672024858,
          mobile: "15332489652",
          email: "wangyang@qq.com",
          mg_state: true,
        },
        {
          id: 26,
          role_name: "一级管理员",
          username: "李晓乐",
          created_time: 158964589625,
          mobile: "15369856245",
          email: "lixiaole@qq.com",
          mg_state: false,
        },
        {
          id: 27,
          role_name: "一级管理员",
          username: "胖虎",
          created_time: 14526985632,
          mobile: "15369856245",
          email: "panghu@qq.com",
          mg_state: true,
        },
        {
          id: 28,
          role_name: "二级管理员",
          username: "可乐",
          created_time: 17756235874,
          mobile: "15369856245",
          email: "kele@qq.com",
          mg_state: false,
        },
      ],
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 4,
      },
      total: 4,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加表单的规则验证
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3-10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度在6-15个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          //  {validator:checkEmail,trigger:'blur'}
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
          //  {validator:checkMobile,trigger:'blur'}
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm:{
        username:'',
        email:'',
        mobile:''
      },
      editFormRules:{
        username:[
          {min:3,max:15,message:'您输入的用户名不正确',trigger:'blur'},
          {required:true,message:'请输入用户名',trigger:'blur'}
        ],
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'}
        ],
        mobile:[
          {min:11,max:11,message:'您输入的手机号码不正确',trigger:'blur'},
          {required:true,message:'请输入手机号码',trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    // 监听pagesize改变的事件（就是每页显示多少条）
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize;
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage;
    },
    // 监听switch开关状态的改变
    userStateChanged(userInfo) {
      // userInfo.mg_state = !userInfo.mg_state;
      // 要修改状态，要将状态值保存在后台数据库中才可以刷新不改变
      this.userlist.mg_state = !this.userlist.mg_state;
    },
    // 监听添加用户对话框的关闭事件   取消之后点开表单重置了
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 监听编辑对话框的关闭事件   取消之后点开表单重置了
    showEditDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 点击按钮 添加新用户
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        this.addDialogVisible = false;
        // 应该用v-model动态绑定的
        this.userlist.push({
          username: "test1",
          password: "125896",
          email: "admin1@qq.com",
          mobile: 18596585492,
        });
      }
      )
    },
    // 编辑用户的对话框
    showEditDialog() {
      this.editDialogVisible = true;
      // 发起请求 来修改用户信息
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
