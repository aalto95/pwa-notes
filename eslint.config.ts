import { eslintConfig } from '@config-federation/vue';

export default [...eslintConfig, {
  rules: {
    '@typescript-eslint/no-unused-vars': 'off'
  }
}];
