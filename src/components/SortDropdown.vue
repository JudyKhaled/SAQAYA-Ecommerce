<template>
  <div class="sort-dropdown">
    <label for="sort" class="sort-dropdown__label">Sort by:</label>
    <select
      id="sort"
      class="sort-dropdown__select"
      v-model="selectedValue"
      @change="emitSort"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SortDropdown",
  props: {
    options: {
      type: Array as PropType<Array<{ value: string; label: string }>>,
      required: true,
    },
    default: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedValue: this.default,
    };
  },
  methods: {
    emitSort() {
      this.$emit("sort", this.selectedValue);
    },
  },
});
</script>

<style scoped>
.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-dropdown__label {
  font-weight: 500;
  color: #fff;
}

.sort-dropdown__select {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #01013f;
  color: #ea82b9;
  outline: none;
}
.sort-dropdown__select:focus {
  border-color: #ea82b9;
}
</style>
