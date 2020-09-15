<template>
  <div class="pdf" v-show="fileType === 'pdf'">
    <pdf
      ref="pdf"
      :src="pdfUrl"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler">
    </pdf>

    <div class="bottom-btn" >
      <p class="arrow">
        <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
        {{currentPage}} / {{pageCount}}
        <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</span>
      </p>
    </div>
  </div>

</template>
<script >
import pdf from "vue-pdf";
export default {
      components:{
      pdf
  },
  data() {
    return {
      pdfUrl:'',// pdf文件地址
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      page:0,
      name:''
　 } 
  },
  mounted(){
    // const toast = this.$toast.loading({
    //   duration: 0,
    //   message: '加载中...',
    //   forbidClick: true,
    //   loadingType: 'spinner',
    // });
    //这里给pdfUrl赋值
    // this.pdfUrl = "../../src/images/511BMP133PM.pdf";
    
    console.log("进来了")
 
    // this.currentPage=this.$route.params.name

  },
  created(){
  
    console.log("进来了create")
       this.page=this.$route.query.page
       this.name=this.$route.query.name
       console.log(this.name)
       this.name='511BMP133PM'
         this.pdfUrl=`../../src/images/${this.name}.pdf`;
         console.log( this.pdfUrl)
          this.pdfUrl='C:\\Users\\xhj\\Desktop\\511BMP133PM.pdf'
        this.pdfUrl = pdf.createLoadingTask(this.pdfUrl)
  },
  methods:{
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage (val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },
    loadPdfHandler(e){
      // this.$toast.clear();
      console.log( this.page)
      this.currentPage = Number( this.page) // 加载的时候先加载第一页
    }
  }
};
</script>