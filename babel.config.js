const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "8",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      corejs: "3", // <---  此处加个这个，就没有报错警告了
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };