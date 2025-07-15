import React from 'react';
import Pill from './Pill';

export default {
  title: 'Pill',
  component: Pill,
};

export const Default = () => <Pill label="Default Pill" />;
export const Accent = () => <Pill label="Accent Pill" accent />; 