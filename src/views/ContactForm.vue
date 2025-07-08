<template>
  <div class="contact-container">
    <div class="contact-left">
      <h1>
        Need to reach out to us?<br />Hit us up and we'll get back to you!
      </h1>
    </div>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <input v-model="form.name" type="text" placeholder="Full Name" required />

      <input
        v-model="form.email"
        type="email"
        placeholder="Email Address"
        required
      />

      <input
        v-model="form.organization"
        type="text"
        placeholder="Organization / Business (optional)"
      />

      <input
        v-model="form.message"
        type="text"
        placeholder="What's on your mind?"
        required
      />

      <button type="submit">SUBMIT</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  organization: "",
  message: "",
});

function handleSubmit() {
  console.log("Submitted:", form);
  alert("Thanks for reaching out!");
}
</script>

<script lang="ts">
export default { name: "ContactForm" };
</script>

<style scoped>
@font-face {
  font-family: "SANS";
  src: url("@/assets/fonts/OpenSans-Light.ttf") format("truetype");
}

@font-face {
  font-family: "Lulo";
  src: url("@/assets/fonts/Lulo Clean One.otf") format("truetype");
}

.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 90px 10px;
  max-width: 1500px;
  margin: auto;
  font-family: "SANS";
}

.contact-left {
  flex: 1 1 40%;
}

.contact-left h1 {
  font-size: 4.3rem;
  line-height: 1.4;
  margin-bottom: 20px;
  color: #fff;
  font-family: "SANS";
  margin-top: 80px;
}

.contact-form {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  color: #fff;
  margin-top: 90px;
  margin-left: 70px;
  max-width: 600px;
}

.contact-form input {
  padding: 3px 0;
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  color: #fff;
  font-size: 1.2rem;
  outline: none;
  font-family: "SANS";
}

.contact-form input::placeholder {
  color: #fff;
  opacity: 0.7;
  font-family: "SANS";
  font-weight: bold;
}

.contact-form input:focus {
  border-bottom: 2px solid #fff;
}

.contact-form button {
  background-color: #000;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.8rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s ease-in-out;
  min-height: 70px;
  font-family: "Bubble Rainbow";
}

.contact-form button:hover {
  background-color: #000;
}
</style>
