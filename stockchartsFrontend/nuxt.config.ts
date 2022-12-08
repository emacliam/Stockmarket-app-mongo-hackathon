// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
      ],  
      css: [
		'primevue/resources/themes/tailwind-light/theme.css',
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
		'primeflex/primeflex.css'
	],
	build: {
		transpile: ['primevue']
	},
	vite: {
		server: {
		  proxy: {
			"/api": {
			  target: "http://localhost:9000/",
			  changeOrigin: true,
			},
		  },
		},
	  },
})
