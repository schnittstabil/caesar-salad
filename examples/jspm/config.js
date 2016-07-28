System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*"
  },

  map: {
    "caesar-salad": "github:schnittstabil/caesar-salad@1.0.0"
  }
});
