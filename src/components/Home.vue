<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/homeLogo.jpg" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="returnLogin">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <!-- 高度不能写死了  否则折叠起来会有问题 -->
      <el-aside :width="isCollapse? '64px' : '200px'">
          <!-- 折叠区域 -->
          <div class="toggle-button" @click="toggleCollapse()">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF"
        :unique-opened='true' :collapse='isCollapse' :collapse-transition='false' :router='true'
        :default-active='activePath'>
          <!-- 一级菜单 -->
          <!-- 变成index动态绑定，就是点啥开啥，不影响别人 -->
          <el-submenu :index="item.id + ''" v-for='item in leftMenuList' :key='item.id'>
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>
                  {{item.authName}}
              </span>
            </template>
            <!-- 二级菜单 -->
            <!-- 二次循环 -->
            <!-- 用 :index='"/" + itemChild.path'来指定点击二级列表时页面跳转地址-->
            <el-menu-item @click="saveNavStatus('/'+itemChild.path)" :index='"/" + itemChild.path' v-for='itemChild in item.children' :key='itemChild.id'>
                <!-- 二级菜单模板区 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{itemChild.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边主题 -->
      <el-main>
          <!-- welcome的占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data(){
        return {
            // 左侧菜单
            leftMenuList:[
                // 第一个
                {
                    "id":101,
                    "authName":"用户管理",
                    'path':'usermanage',
                    "children":[{
                         "id":106,
                         "authName":"用户列表",
                         'path':'users',
                    }]
                },
                // 第二个
                {
                    "id":102,
                    "authName":"权限管理",
                    'path':'authority',
                    "children":[
                        {
                         "id":107,
                         "authName":"角色列表",
                         'path':"roles",
                       },
                       {
                         "id":108,
                         "authName":"权限列表",
                         'path':"list",
                       }
                    ]
                },
                // 第三个
                {
                    "id":103,
                    "authName":"商品管理",
                    'path':"shopmanage",
                    "children":[
                    {
                         "id":109,
                         "authName":"商品列表",
                         'path':"shoplist",
                    },
                     {
                         "id":110,
                         "authName":"分类参数",
                         'path':"sortnum",
                       },
                        {
                         "id":111,
                         "authName":"商品分类",
                         'path':"shopsort",
                       }
                    ]
                },
                // 第四个
                {
                    "id":104,
                    "authName":"订单管理",
                    'path':"ordermanage",
                    "children":[{
                         "id":112,
                         "authName":"订单列表",
                         'path':"orderlist",
                    }]
                },
                 // 第五个
                {
                    "id":105,
                    "authName":"数据统计",
                    'path':'datacount',
                    "children":[{
                         "id":113,
                         "authName":"数据列表",
                         'path':"datalist",
                    }]
                }
                
            ],
            // 添加一级的icon
            iconList:{
                '101':'iconfont icon-yonghuguanli',
                '102':'iconfont icon-quanxianguanli',
                '103':'iconfont icon-xiazai',
                '104':'iconfont icon-dingdanguanli',
                '105':'iconfont icon-shujutongji',
            },
            // 是否折叠  false不折叠  true折叠
            isCollapse:false,
            // 被激活的链接地址
            activePath:''
        }
    },
    methods:{
        returnLogin(){
            this.$router.push('/login');
            this.$message.success('退出成功！')
        },
        // 切换菜单折叠与展开   有一个Menu属性collapse可以折叠与展开
        toggleCollapse(){
            // :collapse-transition='false'在menu上写这个去掉折叠的动画效果  使其更流畅
           this.isCollapse = !this.isCollapse;
        },
        // 保存链接的激活状态
        saveNavStatus(activePath){
            window.sessionStorage.setItem('activePath',activePath)
        }
    },
    created(){
        this.activePath = window.sessionStorage.getItem('activePath')
    }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
//  这几个名字在style中是类选择器
.el-header {
  background-color: #373d41;
  display: flex;
  // 左右贴边对其
  justify-content: space-between;
  // logo靠左无缝隙
  padding-left: 0;
  // button是上下贴边的，不让其上下贴边
  align-items: center;
  color: #fff;
  font-size: 20px;
  // 嵌套
  > div {
    display: flex;
    // 纵向上居中对齐
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      height: 60px;
      border-radius: 50%;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    //   aside右边若隐若现有一个没有对齐的数线，去掉
      border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
    margin-right: 10px;
}
.toggle-button {
    background-color: #4a5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
