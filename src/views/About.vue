<template>
  <div class="about-view">
    <h1>About Us</h1>
    <p>
      Welcome to KART! We are passionate about bringing you the best products at
      the best prices. Our mission is to make online shopping easy, fun, and
      reliable for everyone.
    </p>
    <p>
      Our team is dedicated to curating a unique selection of items and
      providing top-notch customer service. Whether you're looking for the
      latest gadgets, stylish accessories, or everyday essentials, we've got you
      covered.
    </p>
    <p>
      Thank you for choosing KART. We hope you enjoy your shopping experience!
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 120px auto 0 auto;
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  color: #222;
  font-family: "SANS", Arial, sans-serif;
}

.about-view h1 {
  color: #ea82b9;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: "Bubble Rainbow", cursive, sans-serif;
}

.about-view p {
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .about-view {
    margin: 100px auto 0 auto;
    padding: 32px;
  }

  .about-view h1 {
    font-size: 2rem;
  }

  .about-view p {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .about-view {
    margin: 80px 16px 0 16px;
    padding: 24px;
    border-radius: 16px;
  }

  .about-view h1 {
    font-size: 1.75rem;
    text-align: center;
  }

  .about-view p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .about-view {
    margin: 60px 12px 0 12px;
    padding: 20px;
  }

  .about-view h1 {
    font-size: 1.5rem;
  }

  .about-view p {
    font-size: 0.95rem;
    line-height: 1.6;
  }
}
</style>
