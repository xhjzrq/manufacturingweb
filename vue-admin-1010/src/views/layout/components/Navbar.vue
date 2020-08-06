<template>
<div>
   <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
        {{xhjnpm}}
        <!-- <i class="el-icon-caret-bottom"/> -->
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
       <!-- <router-link class="inlineBlock" to="/"> -->
          <el-dropdown-item>
            <span @click="open">修改</span>
          </el-dropdown-item>
        <!-- </router-link> -->
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
  <!-- <edit :flag.sync=" dialog_info"></edit> -->

  <edit :flag="uinfo"  :flagg="info"  @a="a" />
</div>
 
  <!-- <edit></edit> -->
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import edit from '@/views/form/edit'
import getters from '@/store/getters'
import { getToken, setToken, removeToken,removeUserName, setUserName, getUserName,setinfo,getinfo,removeinfo  } from '@/utils/auth'
export default {

  data(){
        return{
      //  xhjnpm:""
      uinfo:false,
      info: ''
        }

    },
    created(){
        console.log( this.$store.getters.info)
                      
    },
  components: {
    Breadcrumb,
    Hamburger,
    edit
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
 
        xhjnpm(newvalue,oldvulae){
          return this.$store.getters.name
        }
    
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/dashboard')
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    open(){
     
      this.uinfo=true
     

      this.info=getinfo()
    },
    a(){
        this.uinfo=false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      line-height: 45px;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

