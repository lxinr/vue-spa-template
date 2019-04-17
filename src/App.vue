<template lang="pug">
  .page
    router-view
</template>


<script>
import { nums } from './utils/num'
console.log('nums---ts-', nums([1,2,3,4,5]))
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

