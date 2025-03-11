import { deepMerge, prettierConfig } from '@config-federation/vue';

const customs = {
  plugins: ['prettier-plugin-tailwindcss'],
};

export default deepMerge(prettierConfig, customs);
