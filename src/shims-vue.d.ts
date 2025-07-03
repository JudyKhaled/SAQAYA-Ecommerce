/* eslint-disable */
import { Store } from 'vuex';
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
