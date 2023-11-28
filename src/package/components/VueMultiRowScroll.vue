<template>
    <!-- czw多行滚动组件 -->
    <div class="scrollBoxPosition" :style="{width:(imgWidth+16)*listLength+'px'}">
        <div class="scrollContainer" ref="scrollContainer" v-if="isShowContainer">
            <div
                v-for="(rowItem, rowIndex) in scrollList"
                :key="rowIndex"
                :class="rowIndex"
                :ref="rowIndex"
            >
            <!-- index:scroll1 -->
                <div class="box"  v-for="(boxItem,boxIndex) in rowItem" :key="'box-'+rowIndex+'-'+boxIndex" :ref="'box-'+rowIndex">
                    <!-- index:0 -->
                    <div
                        class="item"
                        v-for="(item, index) in boxItem"
                        :key="'item-' + boxIndex + '-'+index"
                        :style="{
                            'background-image': 'url(' + item + ')',
                            height: imgHeight + 'px',
                        }"
                        @mouseenter="mouseenterM(rowIndex)"
                        @mouseleave="mouseleaveM(rowIndex)"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "vue-multi-row-scroll",
    computed: {},
    directives: {},
    props: {
        // 传入-屏幕变化（多个window.onresize会失效，所以改成传入的方式）
        screenObj: {
            type: Object,
            required: false,
            default: ()=>{},

        },
        // 传入-需要显示的图片对象数组(propScrollList:{key:[[],[],[]]})
        propScrollList: {
            type: Object,
            required: true,
            default:()=>{},
        },
        // 传入-需要反向滚动的数组（对象key）
        reversalArr: {
            type: Array,
            required: false,
            default:()=>[]
        },
        // 传入-滚动速度（数值越小速度越快,建议1-100）
        speed: {
            type: Number,
            required: false,
            default: 10
        },
        // 传入-图片宽度（可自己外部实现适配,会在原基础上自动增加左右各8px的边距）
        imgWidth: {
            type: Number,
            required: false,
            default: 200 
        },
        // 传入-是否鼠标移入暂停
        isHoverStop: {
            type: Boolean,
            required: false,
            default: true 
        }
    },
    watch: {
        // 监听父组件window.onresize变化-自动按比例修改图片高度，参数（screenObj:{width:n,height:n}）
        // 参考写法：
        // const that = this;
        // window.onresize = () => {
        //     that.screenObj = {
        //         width: document.body.clientWidth,
        //         height: document.body.clientHeight,
        //     };
        // };
        screenObj: {
            handler() {
                this.initSwiperImgHeight();
            },
            deep: true,
            immediate: false,
        },
    },
    data() {
        return {
            scrollList: {},
            listLength: 0,
            // 容器显示，用于渲染或逻辑刷新
            isShowContainer: false,
            // 单图高度
            imgHeight: 0,
            // 滚动相关
            timerObj: {},
            calcDistanceObj: {},
            // 防抖timer
            debounceTimer: null,
        };
    },
    methods: {
        // 初始化
        initSwiperImgHeight() {
            for(let key in this.timerObj){
                clearInterval(this.timerObj[key])
            }
            if(this.debounceTimer) clearTimeout(this.debounceTimer)
            this.debounceTimer = setTimeout(() => {
                this.isShowContainer = false;
                // 图片比例：280*365
                this.imgHeight = Math.floor((this.imgWidth * 365) / 280);

                this.$nextTick(() => {
                    this.isShowContainer = true;
                    // 滚动处理
                    this.$nextTick(() => {
                        for(let key in this.scrollList){
                            // 初始滚动位置
                            const boxHeight = this.$refs['box-'+key][0].clientHeight
                            const scrollContainerHeight = this.$refs['scrollContainer'].clientHeight;
                            if(this.reversalArr.includes(key)) this["calcDistance_" + key] = ((2*boxHeight-scrollContainerHeight)*-1)
                            else this["calcDistance_" + key] = 0
                            this.$refs[key][0].style.transform = `translate3d(0px, ${this["calcDistance_" + key]}px, 0px)`;
                            // 滚动
                            this.scrollM(key);
                        }
                    });
                });
            }, this.imgHeight?200:0);
        },
        // 滚动封装方法（key:scroll1、scroll2、scroll3）,是否反转滚动（默认向下）
        scrollM(key) {
            const boxHeight = this.$refs['box-'+key][0].clientHeight;
            const scrollContainerHeight = this.$refs['scrollContainer'].clientHeight;
            if (
                this.$refs[key] &&
                this.$refs[key][0] &&
                this.$refs[key][0].style
            ) {
                this.timerObj['timer_'+key] = setInterval(() => {
                    if(this.reversalArr.includes(key)) this.calcDistanceObj["calcDistance_" + key] += 0.5;
                    else this.calcDistanceObj["calcDistance_" + key] -= 0.5;

                    this.$refs[key][0].style.transform = `translate3d(0px, ${this.calcDistanceObj["calcDistance_" + key]}px, 0px)`;
                    // 恢复初始位置和数组逻辑处理
                    if(this.reversalArr.includes(key)){
                        if (Math.abs(this.calcDistanceObj["calcDistance_" + key]) <= (boxHeight-scrollContainerHeight)) {
                            this.scrollList[key].pop()
                            this.scrollList[key].unshift(this.scrollList[key][0])
                            this.calcDistanceObj["calcDistance_" + key] -= boxHeight
                            this.$refs[key][0].style.transform = `translate3d(0px, ${this.calcDistanceObj["calcDistance_" + key]}px, 0px)`;
                        }
                    }else{
                        if (Math.abs(this.calcDistanceObj["calcDistance_" + key]) >= (boxHeight)) {
                            this.scrollList[key].shift()
                            this.calcDistanceObj["calcDistance_" + key] = 0
                            this.$refs[key][0].style.transform = `translate3d(0px, ${this.calcDistanceObj["calcDistance_" + key]}px, 0px)`;
                            this.scrollList[key].push(this.scrollList[key][0])
                        }
                    }
                }, this.speed);
            }
        },
        // 鼠标移入移出交互
        mouseenterM(key) {
            if(!this.isHoverStop) return
            clearInterval(this.timerObj['timer_'+key])
        },
        mouseleaveM(key) {
            if(!this.isHoverStop) return
            this.scrollM(key);
        },
        // 增加多一组数据用于无缝轮播衔接
        initCopyItem(){
            for(let key in this.scrollList){
                this.scrollList[key].push(this.scrollList[key][0])
            }
        },
        // 获取对象长度
        getObjLength(obj){
            let count = 0; 
            for(let key in obj){// eslint-disable-line no-unused-vars 
                count++;
            } 
            return count; 
        }
    },
    created(){
        this.scrollList = JSON.parse(JSON.stringify(this.propScrollList))
        this.listLength = this.getObjLength(this.scrollList)
        for(let i = 0;i<this.listLength;i++){
            this.timerObj['timer_scroll'+(i+1)] = null;
            this.calcDistanceObj['calcDistance_scroll'+(i+1)] = 0;
        }
        this.initCopyItem()
    },
    mounted() {
        // 保证ref存在
        this.initSwiperImgHeight();
    },
};
</script>

<style lang="less" scoped>
.scrollBoxPosition {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    .scrollContainer {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        
        .scroll1,
        .scroll2,
        .scroll3 {
            width: 33.33%;
            height: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: 0 8px;
            .box{
                width: 100%;
                .item {
                    box-sizing: border-box;
                    width: 100%;
                    flex-shrink: 0;
                    background-size: cover;
                    background-repeat: no-repeat;
                    object-fit: cover;
                    transition: 0.3s;
                    border-radius: 14px;
                    border: 3px solid #ffffff;
                    position: relative;
                    margin: 8px 0;
                    display: inline-block;//修复margin之间的距离影响
                    cursor: grab;
                    &:hover {
                        transform: scale(1.05);
                    }
                }
            }
        }
    }
}
</style>
