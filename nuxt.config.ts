// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  typescript: { strict: false },
  modules: ["@prisma/nuxt", "@pinia/nuxt", 'nuxt-file-storage', '@nuxtjs/tailwindcss'],
  components: [
    '~/components',  // seluruh components
    '~/components/ui', // juga pastikan ini kalau kamu override array
    '~/components/templates'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    server: {
      allowedHosts: ['cae914927b7c.ngrok-free.app']
    }
  },
  app: {
    head: {
      title: 'MentorKita',
      meta: [
        { name: 'description', content: 'Platform bimbingan belajar dan mentoring online.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/mentorkita.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
        },

      ]
    }
  },
  fileStorage: {
        mount: '/home/$USR/development/nuxt-file-storage/server/files',
  },
   runtimeConfig: {
    public: {
      baseUrl: 'https://cae914927b7c.ngrok-free.app'
      // baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }
  },


  
 
})