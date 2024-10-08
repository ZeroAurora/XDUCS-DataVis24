import antfu from "@antfu/eslint-config";

export default antfu({
  formatters: true,
  vue: true,
  stylistic: {
    quotes: "double",
    semi: true,
  },
  ignores: [
    "public/*",
    "src_python/*",
  ],
});
