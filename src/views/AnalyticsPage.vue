<template>
  <div class="analytics">
    <div class="container">
      <h1 class="title">Аналитика</h1>

      <div class="graph" ref="chartdiv">
        <h2 class="graph__subtitle">Аналитика по визитам</h2>
      </div>
    </div>
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import { graph } from "@/configs/graph";

export default {
  mounted() {
    const root = am5.Root.new(this.$refs.chartdiv);
    graph(root);
    !localStorage.getItem("leadhit-site-id") &&
      this.$router.push({ path: "/" });
  },
};
</script>

<style scoped>
.analytics {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(131, 58, 180);
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 18%,
    rgba(29, 150, 253, 1) 80%
  );
}

.container {
  max-width: 1000px;
  width: 100%;
}

.graph {
  width: 100%;
  height: 500px;
}
.graph__subtitle {
  text-align: center;
  color: #ffffff;
}
</style>
