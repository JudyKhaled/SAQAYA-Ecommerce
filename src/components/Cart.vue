<!-- eslint-disable -->
<template>
  <div :class="['cart', { 'cart--open': isOpen }]">
    <div class="cart__content">
      <h2>My Cart</h2>
      <p>No items in cart</p>
    </div>
  </div>
</template>
<script lang="ts">
import "../assets/styles/main.css";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CartPanel",
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>
<style>
.cart {
  position: fixed;
  top: 90px;
  right: 0;
  width: 300px;
  height: calc(80% - 44px);
  background-color: white;
  z-index: 1000;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  background-color: #01013f;
  transform: translateX(100%);
  transition: transform 1s ease;
}

.cart--open {
  right: 0;
  transform: translateX(0);
}

.cart__content {
  padding: 20px;
  color: #ea82b9;
}
</style>
