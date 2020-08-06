<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-input v-model="input" placeholder="请输入用户名/姓名"></el-input>
      </el-col>
      <el-col :span="2"></el-col>
      <el-button icon="el-icon-search" circle @click="fetchData()"></el-button>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="5"><el-button type="primary" size="small"  @click="dialogVisible = true">增加</el-button> </el-col>
    </el-row>
    <div style="margin-top:20px">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
       
      >
        <el-table-column prop="username" label="用户名" :resizable="false"></el-table-column>
        <el-table-column prop="realname" label="姓名" :resizable="false"></el-table-column>
        <el-table-column prop="phone" label="手机" :resizable="false"></el-table-column>
        <el-table-column prop="department" label="单位" :resizable="false"></el-table-column>
        <el-table-column prop="unit" label="部门" :resizable="false"></el-table-column>
        <el-table-column prop="remark" label="备注" :resizable="false"></el-table-column>
        <el-table-column label="操作" :resizable="true">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
               @click="update(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="open(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="70px" :model="formLabelAlign">
        <!-- <el-form-item label="用户名">
          <el-row>
            <el-col :span="10">
              <el-input v-model="formLabelAlign.username"></el-input>
            </el-col>
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="4">不可以修改</el-col>
          </el-row>
        </el-form-item> -->
        <el-form-item label="用户名">
           <el-input v-model="formLabelAlign.username" ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.realname"></el-input>
        </el-form-item>
           <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="formLabelAlign.department"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="formLabelAlign.unit"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formLabelAlign.remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(formLabelAlign)">确 定</el-button>
      </span>
    </el-dialog>






 <el-dialog title="修改" :visible.sync="dialogVisibleupdate" width="40%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="70px" :model="formLabelAlignupdate">
        <!-- <el-form-item label="用户名">
          <el-row>
            <el-col :span="10">
              <el-input v-model="formLabelAlignupdate.username"></el-input>
            </el-col>
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="4">不可以修改</el-col>
          </el-row>
        </el-form-item> -->

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
        <el-button @click="dialogVisibleupdate = false">取 消</el-button>
        <el-button type="primary" @click="submitupdate">确 定</el-button>
      </span>
    </el-dialog>












  </div>
</template>

<script>
import { getlist, deleteuser, insertuser ,updateuser} from "@/api/login";
import { Message, MessageBox } from "element-ui";
export default {
  data() {
    return {
      input: "",
      list: "",
      tableData: [],
      dialogVisible: false,
      dialogVisibleupdate:false,
      formLabelWidth: "70px",
      labelPosition: "right",
    
      formLabelAlign: {
    
        username: "",
        realname: "",
        phone: "",
        department: "",
        unit: "",
        remark: "",
        password:""
      },
      formLabelAlignupdate: {
        id:"",
        username: "",
        realname: "",
        phone: "",
        department: "",
        unit: "",
        remark: "",
        password:""
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getlist(this.input).then((response) => {
        this.tableData = response.data.list;
        console.log(response);
        this.listLoading = false;
        //this.loading=false;
      });
    },
    handleClose(done) {
     MessageBox.confirm("确认关闭", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submit(formLabelAlign) {
      this.dialogVisible = false;
      // let requestData = JSON.stringify({
      //   username: this.formLabelAlign.username,
      //   realname:this. formLabelAlign.realname,
      //   phone: this.formLabelAlign.phone,
      //   department:this. formLabelAlign.department,
      //   unit: this.formLabelAlign.unit,
      //   remark:this. formLabelAlign.remark,
      // });
      //console.log(requestData)
      insertuser(formLabelAlign).then((response) => {
        Message({
            type: "success",
            message: "添加成功!",
          });
          this.fetchData();
      });
    },
    submitupdate(){
    
      updateuser(this.formLabelAlignupdate).then((response) => {
        Message({
            type: "success",
            message: "修改成功!",
          });
          this.fetchData();
             this.dialogVisibleupdate = false;
      });
    },
    update(data){
        this.formLabelAlignupdate=data
          console.log(this.formLabelAlignupdate)
         this.dialogVisibleupdate = true;
         
    },
    open(id) {
      MessageBox.confirm("是否删除此用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.listLoading = true;
          deleteuser(id).then((response) => {
            this.fetchData();
            this.listLoading = false;
          });

          Message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
div{
  font-size: 12px;
}
</style>

