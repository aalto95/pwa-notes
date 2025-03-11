import { deepMerge, stylelintConfig } from '@config-federation/vue';

const customs = {};

export default deepMerge(stylelintConfig, customs);
