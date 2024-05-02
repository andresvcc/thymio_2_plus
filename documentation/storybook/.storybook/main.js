const path = require('path')

module.exports = {
  stories: [
    '../**/*.stories.mdx',
    '../**/*.stories.md',
    '../**/*.stories.@(js|jsx|ts|tsx)',
    '../../../apps/**/*.stories.mdx',
    '../../../apps/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/**/*.stories.mdx',
    '../../../packages/mobsya-theme/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/**/*.stories.mdx',
    '../../../documentation/**/*.stories.mdx',
    '../../../documentation/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  core: {
    builder: 'webpack5'
  },
  typescript: { reactDocgen: false }
}
