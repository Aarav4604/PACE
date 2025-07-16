module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@pace/ui-kit': '../../packages/ui-kit/src',
          'react-dom': './src/shims/react-dom',
        },
      },
    ],
  ],
};
