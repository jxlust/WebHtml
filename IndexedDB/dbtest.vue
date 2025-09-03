<template>
  <div>
    <el-button @click="deleteClick">删除</el-button>
    <el-button @click="updateVersion">升级</el-button>
    <el-button @click="addClick">测试add</el-button>
    <el-button @click="queryClick">测试查询</el-button>
    <el-button @click="clearFruit">清除水果表</el-button>
    <el-button @click="updateFruit">更新水果3</el-button>
    <el-button @click="updateDataClick">更新数据</el-button>
    <el-button @click="transClick">事务更新</el-button>

    <div class="grid">
      <div class="grid-item" v-for="fruit in myFruits" :key="fruit.id">
        {{ fruit.name }}-{{ fruit.id }} 价格：{{ fruit.price }}
      </div>
    </div>
    <div class="grid">
      <div class="item2" v-for="friend in myFriends" :key="friend.id">
        {{ friend.name }}
        {{ friend.id }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onUnmounted, ref, watch, watchEffect } from 'vue'
import { liveQuery, type Observable } from 'dexie'
import { from, useObservable } from '@vueuse/rxjs'
import { db, type Friend, type Fruit } from './db'

const addClick = async () => {
  await db.fruits.add({ name: '苹果', color: '红色' })
  await db.fruits.add({ name: '香蕉', color: '黄色' })
  await db.fruits.add({ name: '橙子', color: '橙色' })
  await db.fruits.add({ name: '葡萄', color: '紫色' })
}

const queryClick = () => {
  db.fruits
    .where({ color: '红色' })
    .toArray()
    .then((res) => {
      console.log(res)
    })
}
const fruitsQuery = from(
  liveQuery<Fruit[]>(async () => {
    return await db.fruits.where('id').between(2, Infinity).toArray()
  }),
)
const myFruits = useObservable<Fruit[]>(fruitsQuery)

const clearFruit = async () => {
  await db.fruits.clear()
}
const deleteClick = () => {
  //   db.fruits.delete(2)
  // 删库
  db.delete()
  // 删表
  //  db.fruits.clear()
}
const updateVersion = async () => {
  await db.close()
  db.version(2).stores({
    fruits: '++id, name, color, price, weight',
    newTable: '++id,name',
  })
  db.open()
}
const updateFruit = () => {
  const udx = 0 | (Math.random() * 100 + 100)

  db.fruits.update(3, { name: `香蕉(${udx})` })
}

const updateDataClick = () => {
  // 批量更新fruits表的price数据
  db.fruits.where('id').between(2, Infinity).modify({ price: 100 })
}
const transClick = async () => {
  db.transaction('rw', db.fruits, db.friends, () => {
    db.fruits.update(3, { price: 9999999 })
    // await db.friends.where('id').between(2, Infinity).modify({ age: 100 })
    db.friends.add({ name: 'jxlust', age: 9999 })
    db.friends.add({ name: 'abc', age: 1111 })
  }).catch((e) => {
    console.error(e)
  })
}

// 不使用vueuse，自己用watch实现数据响应式更新
const myFriends = ref<Friend[]>([])

const stopHandler = watchEffect(async (onCleanUp) => {
  console.log('开始监听friends表数据变化')
  const subscription = liveQuery(() => db.friends.toArray()).subscribe({
    next: (res) => {
      myFriends.value = res
    },
    error: (err) => {
      console.error(err)
    },
  })
  onCleanUp(() => {
    subscription.unsubscribe()
  })
})

onUnmounted(() => {
  stopHandler()
  //   db.close()
})
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  padding: 10px;
  gap: 10px;
  .grid-item {
    width: 200px;
    height: 32px;
    background-color: #a57d7d;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 8px;
  }
  .item2 {
    padding: 5px 10px;
    background-color: #9cddc4;
    color: #fff;
    border-radius: 8px;
  }
}
</style>
