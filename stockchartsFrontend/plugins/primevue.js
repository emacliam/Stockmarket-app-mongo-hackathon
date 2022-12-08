import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ProgressBar from 'primevue/progressbar';
import Dropdown from 'primevue/dropdown';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.component('Btn', Button)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('ProgressBar', ProgressBar)
    nuxtApp.vueApp.component('Dropdown', Dropdown)
})