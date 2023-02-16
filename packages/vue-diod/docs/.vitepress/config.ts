// import { getSideBar } from 'vitepress-plugin-autobar';
import { resolve } from 'path';
import swc from 'rollup-plugin-swc3';
import ts from 'vite-plugin-ts';

export default {
  title: 'Vue DIOD',
  description: 'Dependency injection in Vue.js.',
  /*
  head: [
    [
      // See: https://stackoverflow.com/a/75119417
      'meta',
      { 'http-equiv': 'Permissions-Policy', content: 'interest-cohort=()' },
    ],
  ],
  */
  base: '/vue-diod/',
  outDir: resolve(__dirname, '../../../../docs'),
  cleanUrls: true,
  themeConfig: {
    // sidebar: getSideBar('./docs'),
    logo: './logo-vue-diod@512px.png',
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
        text: 'Composable & Builder',
        items: [
          {
            text: 'useVueDiod',
            link: '/composable-and-builder/use-vue-diod',
          },
          {
            text: 'VueDiodBuilder',
            link: '/composable-and-builder/builder',
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
          {
            text: 'Custom Logger',
            link: '/examples/custom-logger',
          },
          {
            text: 'Parent → Child',
            link: '/examples/parent-child',
          },
          {
            text: 'Storage Service',
            collapsed: true,
            items: [
              {
                text: 'Introduction',
                link: '/examples/storage/introduction',
              },
              {
                text: 'User Stories',
                link: '/examples/storage/user-stories',
              },
              {
                text: 'Functionalities',
                link: '/examples/storage/functionalities',
              },
              {
                text: 'Abstractions',
                link: '/examples/storage/abstractions',
              },
              {
                text: 'Local Storage',
                link: '/examples/storage/local-storage',
              },
              {
                text: 'Save to File',
                link: '/examples/storage/file-save',
              },
              {
                text: 'Vue.js Composition',
                link: '/examples/storage/composition',
              },
              {
                text: 'Final Component',
                link: '/examples/storage/final-component',
              },
            ],
          },
          /*
          {
            text: 'Pinia',
            link: '/examples/pinia/pinia-foo',
          },
          */
        ],
      },
    ],
    nav: [
      {
        text: 'DIOD',
        link: 'https://github.com/artberri/diod#diod---dependency-injection-on-demand',
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/benoitlahoz/vue-diod',
      },
    ],
  },
  markdown: {
    lineNumbers: true,
    toc: { level: [1, 2] },
  },
  vite: {
    plugins: [
      // For SWC to work on vitepress itself.
      ts(),
      swc({
        minify: true,
        jsc: {
          parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: true,
          },
          target: 'es2021',
          minify: {
            compress: {
              unused: true,
            },
            mangle: true,
          },
          transform: {
            decoratorMetadata: true,
          },
        },
      }),
    ],
    esbuild: false,
  },
};
