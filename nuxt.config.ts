// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  typescript: { strict: false },
  modules: ["@prisma/nuxt", "@pinia/nuxt", 'nuxt-file-storage'],
  components: [
    '~/components',  // seluruh components
    '~/components/ui', // juga pastikan ini kalau kamu override array
    '~/components/templates'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'MentorKita',
      meta: [
        { name: 'description', content: 'Platform bimbingan belajar dan mentoring online.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/mentorkita.ico' }

      ]
    }
  },
  fileStorage: {
        mount: '/home/$USR/development/nuxt-file-storage/server/files',
  },
   runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }
  },


  
 
})