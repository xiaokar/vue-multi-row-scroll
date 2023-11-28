<template>
  <div class="container">
    <h1>vue多行滚动</h1>
    <vue-multi-row-scroll
      class="MultiRowSwiper"
      :screenObj="screenObj"
      :reversalArr="['scroll2']"
      :propScrollList="scrollList"
      :speed="10"
      :imgWidth="clientWidth/2/3"
      :isHoverStop="true"
    />
  </div>
</template>

<script>
import VueMultiRowScroll from "@/components/VueMultiRowScroll.vue";

export default {
  name: "HomeView",
  components: {
    VueMultiRowScroll,
  },
  data() {
    return {
      screenObj: {},
      scrollList: {
        scroll1: [
          [
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg")
          ],
        ],
        scroll2: [
          [
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg")
          ],
        ],
        scroll3: [
          [
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg"),
            require("@/assets/demo.jpg")
          ],
        ],
      },
      clientWidth: 0,
    };
  },
  mounted() {
    // 监听页面尺寸变化
    const that = this;
    window.onresize = () => {
      that.screenObj = {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
      this.clientWidth = this.screenObj.width || document.body.clientWidth;
    };
    this.clientWidth = this.screenObj.width || document.body.clientWidth;
  },
};
</script>
<style lang="less" scoped>
.container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 0 120px;
  margin: 0 auto;
  position: relative;
  h1{
    color: white;
    font-size: 70px;
    position: relative;
    z-index: 2;
  }
  
}
@media screen and (max-width: 1440px) {
  h1{
    width: 100%;
    text-align: center;
    pointer-events: none;
  }
  .MultiRowSwiper{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
