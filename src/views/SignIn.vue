<template>
  <div class="auth">
    <div class="auth__container">
      <h1>LeadHit</h1>
      <form @submit.prevent>
        <input
          v-bind:value="id"
          @input="getValue"
          type="text"
          placeholder="Введите id"
        />
        <div v-if="isMistake">id сайта должен содержать 24 символа</div>
        <button @click="submitForm">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      isMistake: false,
    };
  },
  methods: {
    getValue(event) {
      this.id = event.target.value;
      if (this.isMistake) {
        this.isMistake = false;
      }
    },
    async submitForm() {
      if (this.id.length !== 24) {
        this.isMistake = true;
      } else {
        try {
          const response = await axios.get(
            "https://track-api.leadhit.io/client/test_auth",
            {
              headers: {
                "Api-Key":
                  "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
                "Leadhit-Site-Id": this.id,
              },
            }
          );
          if (response.data.message === "ok") {
            localStorage.setItem("leadhit-site-id", this.id);
            await this.$router.push({ path: "analytics" });
          }
        } catch (e) {
          alert(e);
        }
      }
    },
  },
};
</script>

<style scoped>
.auth {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
