<template lang="pug">
  .page2
    h1 page2
    h2 page2
    h3 page2
    h4 page2
    h5 page2
    h6 page2
    h1 {{tit}}
    h3 {{msgTit}}
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'page1',
  computed: {
    ...mapGetters('msg', ['msgTit']),
    ...mapState('msg', {
      tit: 'msgTit'
    })
  }
}
</script>


<style lang="scss" scoped>
.page2 {
  font-size: 32px;
  color: #546;
}
</style>
