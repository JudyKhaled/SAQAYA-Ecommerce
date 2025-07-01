<!-- src/components/ProductCard.vue -->
<template>
  <div class="product-card">
    <img :src="image" :alt="title" class="product-card__image" />
    <h3 class="product-card__title">{{ title }}</h3>
    <p class="product-card__price">${{ price.toFixed(2) }}</p>
    <button @click="addToCart" class="product-card__button">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', {
        title: this.title,
        image: this.image,
        price: this.price
      });
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  transition: box-shadow 0.3s;
  background: white;
}
.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.product-card__image {
  width: 100%;
  height: 200px;
  object-fit: contain;
}
.product-card__title {
  font-size: 1rem;
  margin: 0.5rem 0;
}
.product-card__price {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.product-card__button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
}
.product-card__button:hover {
  background: #0056b3;
}
</style>
