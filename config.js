System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*"
  },

  map: {
    "char-buffer": "github:schnittstabil/char-buffer@1.0.1"
  }
});
