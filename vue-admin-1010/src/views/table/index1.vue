<template>
  <div class="app-container">
    <el-container>
      <el-header style="height:40px" class="aaaa">
        <el-row >
          <el-col :span="15">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="船只编号">
             <el-input v-model="input" placeholder="船只编号"></el-input>
            </el-form-item>
            <el-form-item label="制作图号">
              <el-input v-model="tuhao" placeholder="制作图号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" circle @click="fetchData()" size="medium"></el-button>
            </el-form-item>
          </el-form>
</el-col>
         <el-col :span="7">&nbsp;</el-col>
          <el-col :span="2"> <el-button type="primary" size="small"  @click="aaa">导出EXCEL</el-button> </el-col>
        </el-row>
        <!-- <el-col :span="8">&nbsp;</el-col>
          <el-col :span="2"> <el-button type="primary" size="small"  @click="aaa">导出EXCEL</el-button> </el-col>
        </el-row>-->
        <!-- <el-row>
          
        </el-row>-->
      </el-header>
      <el-container>
        <el-aside width="200px" style="margin-top: 21px; height:526px;">
        
          <!-- <span style="font-weight:bold;">船支制作图</span> -->
          <!-- <a-tree show-line :default-expanded-keys="['0-0-0']" :tree-data="treeData"  @select="onSelect">
    <a-icon slot="switcherIcon" type="down" />
          </a-tree>-->

          <el-tree
            :data="treedata"
            :props="defaultProps"
            @node-click="handleNodeClick"
            node-key="id"
           
          ></el-tree>
          
        </el-aside>

        <el-main >
          <div class="zz">
          <span style="font-weight:bold;">制作图部件数据</span>
          <el-table
            :data="tableOne"
            border
            style="width: 100%;"
            height="250"
            :header-cell-style="{background:'#eef1f6',color:'#606266',padding:'0px'}"
            :row-style="iRowStyle"
            :cell-style="iCellStyle"
          >
            <el-table-column prop="project" label="工程编号"></el-table-column>
            <el-table-column prop="module" label="分段"></el-table-column>
            <el-table-column prop="drawingno" label="制作图号"></el-table-column>
            <el-table-column prop="zzjbh" label="部件号" width="120"></el-table-column>
            <el-table-column prop="zzjmc" label="部件名称"></el-table-column>
            <el-table-column prop="zzjxh" label="型号"></el-table-column>
            <el-table-column prop="zzjgg" label="规格"></el-table-column>
            <el-table-column prop="zzjcz" label="材质"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
            <el-table-column prop="weight" label="重量kg"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="paintarea" label="面积"></el-table-column>
            <el-table-column prop="paintcode" label="涂装代码"></el-table-column>
            <el-table-column prop="dept" label="设计科室设计人员"></el-table-column>
            <el-table-column prop="createdate" label="建立时间" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        <div style="margin-top:15px"></div>
         <span style="font-weight:bold;">制作图部件材料数据</span>
         <el-table
            :data="tableTwo"
            border
            style="width: 100%;"
            height="250"
            :header-cell-style="{background:'#eef1f6',color:'#606266',padding:'0px'}"
            :row-style="iRowStyle"
            :cell-style="iCellStyle"
          >
            <el-table-column prop="project" label="工程编号"></el-table-column>
             <el-table-column prop="drawingno" label="制作图号"></el-table-column>
            <el-table-column prop="zjbh" label="部件号"></el-table-column>
            <el-table-column prop="compdh" label="标准" ></el-table-column>
            <el-table-column prop="compmc" label="材料名称"></el-table-column>
            <el-table-column prop="compcz" label="材质"></el-table-column>
            <el-table-column prop="compweight" label="重量kg"></el-table-column>
            <el-table-column prop="compcount" label="数量"></el-table-column>
            <el-table-column prop="area" label="面积"></el-table-column>
            <el-table-column prop="page" label="页码"></el-table-column>
            <el-table-column prop="users" label="设计人员"></el-table-column>
           
          </el-table>

        </div>
           
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {export_json_to_excel_sheet} from '@/utils/excel'
import { getTXList, getATx,getTXexcel } from "@/api/table";
import { Message, MessageBox } from "element-ui";



export default {
  data() {
    return {
      tableOne: [],
      tableTwo:[],
      tableThree:[],
      drawingno:"",
      input: "T308K-5",
      tuhao:"",
      inputt:"",
      treedata: [
        // {
          
        //    drawingno: "",

        //   children: [
        //     //  { drawingno: '二级 '},
        //     //   { drawingno: '二级 '},
        //     //    { drawingno: '二级 '},
        //     //     { drawingno: '二级 '},
        //   ],
        // }
        ],
      tree:[],
      defaultProps: {
        children: "outfTxjListList",
        label: "drawingno",
      },
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    gernerateId: function (index) {
      return "0-0-" + index;
      console.log("0-0-" + index);
    },
    handleNodeClick(data) {
      console.log(data);
      this.drawingno=data.drawingno
      if (data.drawingno == "") {
        Message({
          //  message: res.message,
          message: "请输入正确船支编号",
          type: "error",
          duration: 5 * 1000,
        });
      }

      getATx(this.inputt, data.drawingno).then((response) => {
        this.tableOne = response.data.list;
        this.tableTwo=response.data.list1
        
      });
      console.log(this.tableOne);
    },

    iRowStyle: function ({ row, rowIndex }) {
      return "height:30px";
    },
    iHeaderRowStyle: function ({ row, rowIndex }) {
      return "height:30px";
    },
    iCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },

    fetchData() {
    //  this.$set(this.treedata[0].children,0,"")
              if (this.input == "") {
        Message({
          //  message: res.message,
          message: "请输入正确船支编号",
          type: "error",
          duration: 5 * 1000,
        });
        return
      }

      getTXList(this.input,this.tuhao).then((response) => {
         this.treedata=[]
        this.inputt=this.input
         //this.treedata=response.data.list;
         console.log(response.data.list)
         this.treedata.push(response.data.list)
         //console.log(this.treedata)
      }).catch(() => {
        console.log("aa")
     
        // this.treedata[0].children=[]
        // this.$set(this.treedata[0],0,'')
        //  console.log(this.treedata[0])
        //  this.treedata[0].drawingno=''
        //  this.$forceUpdate()
      });
    },
    aaa(){
       
         getTXexcel(this.inputt, this.drawingno).then((response) => {
              console.log(response.data)
     const link = document.createElement('a')
        let blob = new Blob([response], {type: 'application/vnd.ms-excel'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
 
        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = '铁舾生产设计数据.xlsx' //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

      });
    }
  },
};
</script>

<style  scoped>
div {
  font-size: 12px;
}

</style>
 