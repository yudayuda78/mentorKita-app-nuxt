// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  typescript: { strict: false },
  modules: [ "@pinia/nuxt", 'nuxt-file-storage', '@nuxtjs/tailwindcss', "@nuxt/scripts"],
  components: [
    '~/components',  // seluruh components
    '~/components/ui', // juga pastikan ini kalau kamu override array
    '~/components/templates',
    
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    server: {
      allowedHosts: ['cae914927b7c.ngrok-free.app']
    },
    ssr: {
      noExternal: ['@prisma/client']
    }
  },
  app: {
    head: {
      title: 'MentorKita',
      meta: [
        { name: 'description', content: 'Platform bimbingan belajar dan mentoring online.' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        }
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
      baseUrl: 'https://mentorkita.id',
      databaseUrl: process.env.DATABASE_URL
      // baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }
  },

  // @ts-expect-error - properti ini ditambahkan oleh @nuxt/scripts
  scripts: {
      registry: {
        googleAdsense: {
          client: "ca-pub-4270039076501112", // AdSense Publisher ID
        },
      },
  },


  
 
})