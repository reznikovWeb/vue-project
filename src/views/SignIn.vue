<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="title">LeadHit</h1>
      <form @submit.prevent class="auth__form">
        <div class="auth__input-box">
          <input
            class="auth__input"
            v-bind:value="id"
            @input="getValue"
            type="text"
            placeholder="Введите id"
          />
          <div v-if="isMistake" class="auth__mistake">
            *id сайта должен содержать 24 символа
          </div>
        </div>

        <button @click="submitForm" class="auth__btn">Отправить</button>
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
      if (this.id.length !== 24) return (this.isMistake = true);

      try {
        const response = await axios.get(
          "https://track-api.leadhit.io/client/test_auth",
          {
            headers: {
              "Api-Key": "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
              "Leadhit-Site-Id": this.id,
            },
          }
        );
        if (response.data.message === "ok") {
          localStorage.setItem("leadhit-site-id", this.id);
          await this.$router.push({ path: "analytics" });
        }
      } catch (e) {
        alert(e.message);
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
  background: rgb(131, 58, 180);
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 18%,
    rgba(29, 150, 253, 1) 80%
  );
}
.auth__container {
  max-width: 300px;
  width: 100%;
}
.auth__form {
  display: flex;
  flex-direction: column;
}

.auth__mistake {
  position: absolute;
  bottom: -18px;
  font-size: 14px;
  color: #ffffff;
}

.auth__input-box {
  position: relative;
  margin-bottom: 40px;
}

.auth__input,
.auth__btn {
  padding: 10px;
  outline: none;
  color: #823bb5;
  border-radius: 10px;
  border: 4px solid #823bb5;
  transition: all 0.4s;
}

.auth__input {
  width: 100%;
}

.auth__input::placeholder {
  color: #823bb5;
}
.auth__input:focus {
  border: 4px solid #1d96fd;
}

.auth__btn {
  cursor: pointer;
}

.auth__btn:hover {
  border: 4px solid #1d96fd;
}
</style>
