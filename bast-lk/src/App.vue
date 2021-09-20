<template>
    <div class="container">
        <div class="card">
            <app-login v-if="registered"></app-login>
            <app-registration v-else></app-registration>
        </div>
    </div>
</template>

<script>
import AppRegistration from "@/components/AppRegistration";
import AppLogin from "@/components/AppLogin";
import axios from "axios";
import {useStore} from 'vuex';
import {computed, ref} from 'vue';
export default {
  name: 'LayoutDefault',
    setup () {
      const store = useStore()
      const progress = ref(false)
      return {
          progress,
          registered: computed(()=> store.state.registered)
      }
    },
    components : {
      AppRegistration,
      AppLogin
    },
    data() {
        return {
            type : 'color',
            name : '',
            errorMessage : ''
        }
    },
    methods : {
        async bastRegister() {
            try {
                const {data} = axios.post('https://api-auth-bast.black-it.ru/api/v1/auth/registration', {
                    registrationToken: this.registrationToken,
                    firstName: this.name,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                    isProfessionalUser: this.proUser,
                    email: this.email,
                    country: this.country,
                    city: this.city
                })
                console.log('Ответ на регистрацию: ', data)
            } catch (e) {
                console.error(e.message)
            }
        }
    }
}
</script>
