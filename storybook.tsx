import { AppRegistry } from 'react-native';
import { getStorybookUI } from '@storybook/react-native';
import './.storybook/preview';

const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent('PACE', () => StorybookUIRoot);

export default StorybookUIRoot; 