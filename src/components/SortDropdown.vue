<template>
  <div class="custom-select" @click="toggleDropdown" @blur="isOpen = false" tabindex="0">
    <div class="selected">{{ selectedLabel }}</div>
    <ul v-if="isOpen" class="dropdown-options">
      <li
        v-for="option in options"
        :key="option.value"
        :class="{ active: option.value === modelValue }"
        @click.stop="select(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const isOpen = ref(false);

const options = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const select = (value: string) => {
  emit("update:modelValue", value);
  isOpen.value = false;
};

const selectedLabel = computed(() => {
  const selected = options.find((o) => o.value === props.modelValue);
  return selected ? selected.label : "Select...";
});
</script>

<style scoped>
.custom-select {
  position: relative;
  background: #000;
  color: #fff;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  width: 220px;
  margin-top: 3rem;
  margin-left: 2rem;
}

.selected {
  font-size: 1rem;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #000;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  list-style: none;
  padding: 0;
  z-index: 100;
}

.dropdown-options li {
  padding: 10px;
  transition: background 0.2s;
}

.dropdown-options li:hover {
  background: #111;
}

.dropdown-options li.active {
  font-weight: bold;
}
</style>
