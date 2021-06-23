<template>
  <div class="login-container">
      <h2>登陆页面</h2>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      num: 1
    }
  }
}
</script>

<style lang="less"></style>
