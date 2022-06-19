<template>
  <div class="pagination">
    <button 
      :disabled="pageNo === 1" 
      @click="$emit('getPageNo', pageNo-1)"
    >
      上一页
    </button>
    <button v-if="pageArr[0] >1" @click="$emit('getPageNo', pageNo)">1</button>
    <button v-if="pageArr[0] >1">···</button>
    
    <button 
      v-for="(page, index) in pageArr" 
      :key="index"
      @click="$emit('getPageNo', page)"
      :class="{active: pageNo === page}"
    >
      {{page}}
    </button>
    

    <button v-if="pageArr[continues-1] < totalPage">···</button>
    <button 
      v-if="pageArr[continues-1] < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{totalPage}}
    </button>
    <button 
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo+1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total/this.pageSize)
    },
    //计算出连续页码的起始和结束
    pageArr() {
      const { continues, pageNo, totalPage } = this
      //定义两个变量存储起始数字和结束数字
      let start = 0, end = 0
      //当连续页的数量不大于页码总数
      if(continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } 
      //连续页的数量大于页码总数
      else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if(start < continues / 2) {
          start = 1
          end = continues
        }
        if(end > totalPage) {
          start = totalPage - 4
          end = totalPage
        }
      }
      let arr = []
      for(let i = start; i <= end; i++) arr.push(i)
      return arr
    },
    
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(225, 37, 27);
      color: #fff;
    }
  }
}
</style>