<!-- eslint-disable -->
<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__links">
        <router-link to="/about">About Us</router-link>
        <router-link to="/contact">Contact Us</router-link>
      </div>
      <div class="footer__socials">
        <span>Get social</span>
        <a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener"
          >Facebook</a
        >
        <a href="https://instagram.com" target="_blank" rel="noopener"
          >Instagram</a
        >
      </div>
    </div>
    <p class="footer__copy">© All Rights Reserved 2025</p>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  background-color: rgb(13, 13, 13);
  color: #ea82b9;
  padding: 40px;
  font-size: 0.9rem;
}

.footer__content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.footer__collections {
  font-weight: bold;
  margin: 0;
  color: #ea82b9;
}

.footer__links,
.footer__socials {
  display: flex;
  gap: 15px;
  align-items: center;
}

.footer__links a,
.footer__socials a {
  color: #ea82b9;
  text-decoration: none;
}

.footer__links a:hover,
.footer__socials a:hover {
  text-decoration: underline;
}

.footer__copy {
  text-align: center;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .footer__content {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
