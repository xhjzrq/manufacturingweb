<template>
  <el-dialog title="修改" :visible.sync="dialogVisibleupdate" width="40%" :before-close="handleClose">
    <el-form :label-position="labelPosition" label-width="70px" :model="formLabelAlignupdate">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlignupdate.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlignupdate.realname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlignupdate.password"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="formLabelAlignupdate.phone"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="formLabelAlignupdate.department"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="formLabelAlignupdate.unit"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formLabelAlignupdate.remark"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closee">取 消</el-button>
      <el-button type="primary" @click="submitupdate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getlist, deleteuser, insertuser, updateuser } from "@/api/login";
import { Message, MessageBox } from "element-ui";
import getters from '@/store/getters'
export default {
  data() {
    return {
      tableData: [],
      dialogVisibleupdate: false,
      formLabelWidth: "70px",
      labelPosition: "right",

      formLabelAlignupdate: {
        id: "",
        username: "",
        realname: "",
        phone: "",
        department: "",
        unit: "",
        remark: "",
        password: "",
      },
    };
  },
  created() {
    console.log(this.$store.getters.info);
  },
  mounted() {
    //this.formLabelAlignupdate=JSON.parse(this.$store.getters.info)
  },
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    flagg: {
      type: String,
      default: "",
    },
  },
  watch: {
    flag: {
      handler(newvalue, old) {
        console.log("1");
        this.dialogVisibleupdate = newvalue;
      },
    },
    flagg: {
      handler(newvalue, old) {
        console.log("2");
        console.log(newvalue);
        //this.dialogVisibleupdate=newvalue
        this.formLabelAlignupdate = JSON.parse(newvalue);
      },
    },
  },
  methods: {
    close() {
      this.dialogVisibleupdate = false;

      this.$emit("a", false);
    },
    closee() {
      this.dialogVisibleupdate = false;

      this.$emit("a", false);
    },
    handleClose() {
       MessageBox.confirm("确认关闭", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((_) => {
          this.dialogVisibleupdate = false;

          this.$emit("a", false);
          done();
        })
        .catch((_) => {});

        
    },
    submitupdate() {
         updateuser(this.formLabelAlignupdate).then((response) => {
        Message({
            type: "success",
            message: "修改成功 请重新登录!",
          });
              this.dialogVisibleupdate = false;

          this.$emit("a", false);
          this.logout()

      });
    },
     logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

