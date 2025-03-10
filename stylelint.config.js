import { deepMerge, stylelintConfig } from 'config-federation';

const customs = {};

export default deepMerge(stylelintConfig, customs);
