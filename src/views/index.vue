<template lang="pug">
  .page-index.flex
    h4.txt-center(@click.stop="$router.push('/page1')") 跳转page1
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
.page-index {
  width: 100%;
}
h4 {
  width: 280px;
  height: 90px;
  line-height: 90px;
  background: rgb(148, 17, 12);
  font-size: 36px;
  color: #fff;
  border-radius: 12px;
  margin: 80px auto;
  box-sizing: border-box;
}
</style>


