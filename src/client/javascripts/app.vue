<template>
  <div>
    <div>{{ message }}</div>
    <div class="aa"><span>1</span><span>2</span><span>3</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "2019-03-31",
    };
  },
};
</script>
<style scoped>
.aa {
  display: flex;
  justify-content: center;
  background: chartreuse;
  height: 100px;
  width: 100px;
}
</style>