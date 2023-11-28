# vue-multi-row-scroll

> 基于 Vue2 的多行滚动组件

Demo：https://xiaokar.gitee.io/vue-multi-row-scroll

## Preview

![](https://sd-web-live-teacher-assistant.oss-cn-hangzhou.aliyuncs.com/other/fenxiang/scroll.gif)

## Install

```
npm install vue-multi-row-scroll
```

## Usage

```
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
```

## Attributes

| 参数           | 说明                                                         | 类型    | 格式/案例                                   | 默认值 | 必须  |
| -------------- | ------------------------------------------------------------ | ------- | ------------------------------------------- | ------ | ----- |
| screenObj      | 屏幕宽高变化自适应，使用父组件传入的方式防止多组件时监听冲突 | Object  | {width:0,height:0}                          | {}     | false |
| propScrollList | 需要显示的图片对象数组                                       | Object  | {key1:[['img1','img2']],key2:[['img1','img2']]} | {}     | true  |
| reversalArr    | 需要反向滚动的数组（对象key String）                         | Array   | [key1,key2]                                 | []     | false |
| speed          | 滚动速度（数值越小速度越快,建议1-100）                       | Number  | 10                                          | 10     | false |
| imgWidth       | 图片宽度（可自己外部实现适配,会在原基础上自动增加左右各8px的边距） | Number  | clientWidth/2/3                             | 200    | false |
| isHoverStop    | 是否鼠标移入暂停                                             | Boolean | true                                        | true   | false |

## 完整案例参考

```
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
import VueMultiRowScroll from "vue-multi-row-scroll";

export default {
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

```

## 讨论与反馈

QQ：8048117423

作者：xiaokar

博客：https://xiaokar.gitee.io

如有问题可以给本项目 [提交 issue](https://gitee.com/xiaokar/vue-multi-row-scroll/issues)

如果vue-multi-row-scroll帮助到了你，欢迎 [star](https://gitee.com/xiaokar/vue-multi-row-scroll)，你的 star 是我改 BUG 的动力 ヾ(*ゝω・*)ノ