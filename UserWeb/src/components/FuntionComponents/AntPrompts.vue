<template>
    <div>
        <transition name="slide-fade">
            <Prompts
                v-if="show"
                :title="props.title"
                :items="items"
                wrap 
                vertical
                @item-click="handleItemClick"
            />
        </transition>
    </div>
</template>

<script setup>  
import { Prompts } from 'ant-design-x-vue'
import { ref, onMounted } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '✨例如你可以问下面问题：' 
  }
})

const items = [
  {
    label: '不支持对话记忆！',
  },
  {
    label: '不支持历史对话找回请及时复制内容！',
  },
  {
    label: '离开此页面对话内容将清空！',
  },
]
const emit = defineEmits(['userpromptsubmit'])
const handleItemClick = (item) => {
    emit('userpromptsubmit', item.data.label)
}
const show = ref(false)
onMounted(() => {
    setTimeout(() => {
        show.value = true
    }, 100) // 添加微小延迟确保过渡效果
})
</script>

<style scoped>
/* 更流畅的动画效果 */
.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
</style>