import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "coverage/**",
      "dist/**",
      "public/**",
      "src/components/analytics/Hotjar.tsx",
      "src/components/case-study/**",
      "src/components/layout/**",
      "src/components/sections/**",
      "src/components/templates/**",
      "src/components/wheel/**",
      "src/components/MonitorMockup.tsx",
      "src/components/PrizeWheel.tsx",
      "src/components/PrizeWheel.tsx.new",
      "src/components/ui/CustomWheel.tsx",
      "src/content/**",
      "src/styles/**",
      "src/to do list/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable problematic rules
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off", 
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "off",
      "prefer-const": "off",
      "react/jsx-no-undef": "off"
    }
  }
];

export default eslintConfig;
