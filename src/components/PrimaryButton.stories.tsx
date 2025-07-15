import React from 'react';
import PrimaryButton from './PrimaryButton';

export default {
  title: 'PrimaryButton',
  component: PrimaryButton,
};

export const Default = () => <PrimaryButton label="Click Me" onPress={() => {}} />;
export const LongLabel = () => <PrimaryButton label="This is a very long label for the button" onPress={() => {}} />; 