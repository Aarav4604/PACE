const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const watchFolders = [
  path.resolve(__dirname, 'src'),
  path.resolve(__dirname, '../../packages/ui-kit'),
  path.resolve(__dirname, '../../node_modules'),
];

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders,
  resolver: {
    extraNodeModules: {
      '@': path.resolve(__dirname, 'src'),
      '@pace/ui-kit': path.resolve(__dirname, '../../packages/ui-kit/src'),
      '@babel/runtime': path.resolve(__dirname, '../../node_modules/@babel/runtime'),
      'react-dom': path.resolve(__dirname, 'src/shims/react-dom'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
