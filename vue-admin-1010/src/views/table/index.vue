<template>
  <div class="app-container">
    <el-container>
      <el-header style="height:40px" class="aaaa">

        <el-row>
    <!-- <div>
      <pdf src="C:\Users\xhj\Desktop\511BMP133PM.pdf"></pdf>
    </div> -->
        </el-row>
        <el-row  :gutter="50">
          <el-col :span="15">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="工程编号">
             <el-input v-model="input" placeholder="工程编号"></el-input>
            </el-form-item>
            <el-form-item label="制作图号">
              <el-input v-model="tuhao" placeholder="制作图号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" circle @click="fetchData()" size="medium"></el-button>
            </el-form-item>
          </el-form>
</el-col>
        
          <el-col :span="9" style="text-align: right;" > <el-button type="primary" size="small"  @click="aaa">导出EXCEL</el-button> </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="15">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</el-col>
        </el-row> -->
        <!-- <el-col :span="8">&nbsp;</el-col>
          <el-col :span="2"> <el-button type="primary" size="small"  @click="aaa">导出EXCEL</el-button> </el-col>
        </el-row>-->
        <!-- <el-row>
          
        </el-row>-->
      </el-header>
      <el-container>
        <el-aside width="200px" style="margin-top: 21px; height:796px">
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
              <el-table-column prop="project" label="工程编号" width="100"  align="center"></el-table-column>
               <el-table-column prop="drawingno" label="制作图号" width="120"  align="center"></el-table-column>
              <el-table-column prop="tribonModule" label="分段" width="80"  align="center"></el-table-column>
              <el-table-column prop="pipeNo" label="部件号" width="150"  align="center"></el-table-column>
             
              <el-table-column prop="inTreatment" label="内表面处理" width="90"  align="center"></el-table-column>
              <el-table-column prop="outTreatment" label="外表面处理" width="90"  align="center"></el-table-column>
              <el-table-column prop="inPaintCode" label="内涂装代码" width="90"  align="center"></el-table-column>
              <el-table-column prop="outPaintCode" label="外涂装代码" width="90"  align="center"></el-table-column>
              <el-table-column prop="iArea" label="内表面积"  align="center"></el-table-column>
              <el-table-column prop="outArea" label="外表面积"  align="center"></el-table-column>
              <el-table-column prop="pressure" label="压力Mpa"  align="center"></el-table-column>
              <el-table-column prop="pipeWeight" label="重量Kg"  align="center"></el-table-column>
              <el-table-column prop="page" label="页码"  align="center"></el-table-column>
              <el-table-column prop="page" label="页码"  align="center">

                <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
               @click="update(scope.row)"
            ></el-button>
          </template>
              </el-table-column>
              <el-table-column prop="users" label="设计人员" align="center"></el-table-column>
              <el-table-column prop="createDate" label="建立时间" :show-overflow-tooltip="true" align="center"></el-table-column>
              <el-table-column prop="modifyDate" label="修改时间" :show-overflow-tooltip="true" align="center"></el-table-column>
              <el-table-column prop="pipeLineCode" label="生产线编码" align="center"></el-table-column>
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
             <el-table-column prop="project" label="工程编号" width="100"  align="center"></el-table-column>
              <el-table-column prop="drawingNo" label="制作图号" width="120"  align="center"></el-table-column>
              <el-table-column prop="tribonModule" label="分段" width="80"  align="center"></el-table-column>
              <el-table-column prop="pipeNo" label="部件号" width="150"  align="center"></el-table-column>
              <el-table-column prop="mtrlPos" label="材料序号" align="center"></el-table-column>
              <el-table-column prop="mtrlFlag" label="标识" align="center"></el-table-column>
              <el-table-column prop="mtrlName" label="名称" align="center"></el-table-column>
              <el-table-column prop="mtrlGG" label="规格" align="center"></el-table-column>
              <el-table-column prop="mtrlXHCZ" label="型号材质" align="center"></el-table-column>
              <el-table-column prop="mtrlQuantity" label="数量" align="center"></el-table-column>
              <el-table-column prop="mtrlUnit" label="单位" align="center"></el-table-column>
              <el-table-column prop="mtrlBuildLength" label="制造长度mm" align="center"></el-table-column>
              <el-table-column prop="mtrlWeight" label="重量Kg" align="center"></el-table-column>
            </el-table>

            <div style="margin-top:15px"></div>
            <span style="font-weight:bold;">制作图部件加工数据</span>
            <el-table
              :data="tableThree"
              border
              style="width: 100%;"
              height="250"
              :header-cell-style="{background:'#eef1f6',color:'#606266',padding:'0px'}"
              :row-style="iRowStyle"
              :cell-style="iCellStyle"
            >
            <el-table-column prop="project" label="工程编号"  width="100"  align="center"></el-table-column>
              <el-table-column prop="drawingNo" label="制作图号" width="120"  align="center"></el-table-column>
              
              <el-table-column prop="tribonModule" label="分段" width="80"  align="center"></el-table-column>
              <el-table-column prop="pipeNo" label="部件号" width="150"  align="center"></el-table-column>
              <el-table-column prop="jGXH" label="加工序号" align="center"></el-table-column>
              <el-table-column prop="jGFlag" label="标识" align="center"></el-table-column>

              <el-table-column prop="startBend" label="起弯点" align="center"></el-table-column>
              <el-table-column prop="straightPipe" label="直管段" align="center"></el-table-column>
              <el-table-column prop="pipeLine" label="身长" align="center"></el-table-column>
              <el-table-column prop="zJBend" label="转角" align="center"></el-table-column>
              <el-table-column prop="qJTurn" label="曲角" align="center"></el-table-column>
              <el-table-column prop="inclination" label="夹角" align="center"></el-table-column>
              <el-table-column prop="gLExcess" label="割量" align="center"></el-table-column>
              <el-table-column prop="radius" label="弯模" align="center"></el-table-column>
              <el-table-column prop="preTurn" label="预转角" align="center"></el-table-column>
              <el-table-column prop="accConnection" label="附件连接" align="center"></el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { export_json_to_excel_sheet } from "@/utils/excel";
import { getList, getA, getexcel } from "@/api/table";
import { Message, MessageBox } from "element-ui";
import pdf from 'vue-pdf'

export default {
  data() {
    return {
      tableOne: [],
      tableTwo: [],
      tableThree: [],
      drawingno: "",
      // formInline:{
      //     input:"",
      //     tuhao:""
      // },
      input: "C10K-1",
      tuhao: "",
      inputt: "",
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
      tree: [],
      defaultProps: {
        children: "pipeSketchLists",
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
      this.drawingno = data.drawingno;
      if (data.drawingno == "") {
        Message({
          //  message: res.message,
          message: "请输入正确船支编号",
          type: "error",
          duration: 5 * 1000,
        });
      }

      getA(this.inputt, data.drawingno).then((response) => {
        this.tableOne = response.data.list;
        this.tableTwo = response.data.list1;
        this.tableThree = response.data.list2;
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
        retrun
      }

      getList(this.input, this.tuhao)
        .then((response) => {
          this.treedata = [];
          this.inputt = this.input;
          //this.treedata=response.data.list;
          console.log(response.data.list);
          this.treedata.push(response.data.list);
          //console.log(this.treedata)
        })
        .catch(() => {
          console.log("aa");

          // this.treedata[0].children=[]
          // this.$set(this.treedata[0],0,'')
          //  console.log(this.treedata[0])
          //  this.treedata[0].drawingno=''
          //  this.$forceUpdate()
        });
    },
    aaa() {
      getexcel(this.inputt, this.drawingno).then((response) => {
        console.log(response.data);
        const link = document.createElement("a");
        let blob = new Blob([response], { type: "application/vnd.ms-excel" });
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);

        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = "管系生产设计数据管理.xlsx"; //下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    update(data){
      alert(data.drawingno);
      let routeData = this.$router.resolve({ path: '/pdf' ,query: {
          page: data.page,
          name: data.drawingno
        }});
      window.open(routeData.href, '_blank');
    }
  },
  components: {
    pdf
  }
};
</script>


 <style lang ="scss" scoped>
div {
  font-size: 12px;
}
.label-wrap {
  label {
    float: left;
    line-height: 40px;
    width: 100px;
  }
  .warp-content {
    margin-left: 60px;
  }
}
</style>