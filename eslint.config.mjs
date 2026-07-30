import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/** eslint-config-next 16 は flat config を直接 export するため、そのまま展開する */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'photos-source/**'] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
