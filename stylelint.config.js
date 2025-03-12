import { deepMerge, stylelintConfig } from '@config-federation/vue';

const customs = {
  // extend here
};

export default deepMerge(stylelintConfig, customs);
