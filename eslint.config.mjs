import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: { "unused-imports": unusedImports },
    rules: {
      // Imports não-usados viram auto-removíveis com `eslint --fix`; vars não-usadas
      // continuam como aviso (prefixe com `_` para ignorar intencionalmente).
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // shadcn/ui boilerplate: `actionTypes` é const usada só como tipo (typeof).
    files: ["**/use-toast.ts"],
    rules: { "unused-imports/no-unused-vars": "off" },
  },
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "tmp/**"],
  },
];

export default eslintConfig;
