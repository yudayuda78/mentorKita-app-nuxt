<script setup>
useHead({
  meta: [
    // Google Search Console verification
    { name: 'google-site-verification', content: "ca-pub-4270039076501112" }
  ],
  script: [
    // Google AdSense script
    { 
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4270039076501112',
      async: true,
      crossorigin: 'anonymous'
    }
  ]
})
</script>

<template>
  <NuxtPage />
</template>
