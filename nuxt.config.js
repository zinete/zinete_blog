
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */

  head: {
    // eslint-disable-next-line no-undef
    title: '米兰的小铁匠',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // eslint-disable-next-line no-undef
      { hid: 'description', name: 'description', content: '米兰的小铁匠' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://lang.zinete.com/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */

  css: [
    'ant-design-vue/dist/antd.css',
    'mavon-editor/dist/css/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '~/plugins/api.js',
    '~/plugins/vue-markdown.js',
    { src: "~/plugins/vue-lazyload.js", ssr: false }
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend() {
    }
  }
}
