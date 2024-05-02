import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colors } from '../../Themes/MobsyaTheme/theme.colors';

import { Body } from './index';
import React from 'react';

export default {
  title: 'UI-components/Body',
  component: Body,
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the component',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'The Body component is a container for the main content of a page.',
      },
    },
  },
} as ComponentMeta<typeof Body>;

const Template: ComponentStory<typeof Body> = (args) => <Body {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Body Content',
};
