// import { getSideBar } from 'vitepress-plugin-autobar';

export default {
  title: 'Vue Diod',
  description: 'Dependency injection in Vue.js.',
  // cleanUrls: true,
  themeConfig: {
    // logo: '/assets/logo_vuoz@512px.png',
    // ...
    // sidebar: getSideBar('./docs'),
    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Install', link: '/getting-started/install' },
          {
            text: 'Basic Usage',
            link: '/getting-started/basic-usage',
          },
          {
            text: 'Configuration',
            link: '/getting-started/configuration',
          },
        ],
      },
      {
        text: 'Examples',
        items: [
          {
            text: 'Simple Counter',
            link: '/examples/simple-counter',
          },
        ],
      },
      /*
      {
        text: 'Resources',
        items: [
          {
            text: 'View on Github',
            link: 'https://github.com/benoitlahoz/vue-diod',
          },
          {
            text: 'DIOD on Github',
            link: 'https://github.com/artberri/diod',
          },
        ],
      },
      */
    ],
  },
  markdown: {
    lineNumbers: true,
    toc: { level: [1, 2] },
  },
  vite: {
    resolve: {
      alias: {
        '@': '../src',
      },
    },
  },
};
