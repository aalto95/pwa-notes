import { deepMerge, prettierConfig } from 'config-federation';

const customs = {
  plugins: ['prettier-plugin-tailwindcss'],
};

export default deepMerge(prettierConfig, customs);
