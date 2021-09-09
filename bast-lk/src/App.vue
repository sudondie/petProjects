<template>
    <div class="container">
        <div class="card">
            <form v-if="registered" class="form-control" @submit.prevent="bastLogin">
                <div class="card" v-if="!smsSent"><div class="card marked"><img src="./assets/rus.svg" alt="rus"><p style="color: #000; margin: 0">+7</p></div><input placeholder="Введите номер телефона" type="text" v-model="phoneNumber"></div>
                <input v-if="smsSent" placeholder="Введите код из смс" type="text" v-model="code">
                <button class="btn" @click="bastSms" type="button" :disabled="floodWait > 0">Запрос смс</button>
                <button class="btn primary" :disabled="code.length<6" type="submit">Войти</button>
                <p v-if="floodWait > 0" style="color: red">Отправить запрос можно через {{ floodWait }} секунд</p>
                <q-btn :loading="loading[3]" color="primary" :disabled="floodWait > 0" @click="simulateProgress(3);bastSms()" style="width: 150px">
                    Запрос смс
                    <template v-slot:loading>
                        <q-spinner-hourglass class="on-left" />
                        {{ floodWait }}
                    </template>
                </q-btn>
            </form>
            <form v-else action="" class="form-control" @submit.prevent="bastRegister">
                <input type="text" v-model="name" >
                <input type="text" v-model="lastName" >
                <input type="text" v-model="email" >
                <input type="text" v-model="country" >
                <input type="text" v-model="city" >
                <label for="proUser">Профессиональный пользователь!</label>
                <input type="checkbox" class="form-checkbox" id="proUser" v-model="proUser" value="true">
                <button class="btn primary">Зарегистрироваться</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from 'vue'
export default {
  name: 'LayoutDefault',
    setup () {
        const loading = ref([
            false,
            false,
            false,
            false,
            false,
            false
        ])

        const progress = ref(false)

        function simulateProgress (number) {
            loading.value[ number ] = true
            // simulate a delay
            setInterval(() => {
                if(this.floodWait > 0) {
                    this.floodWait--
                    loading.value[ number ] = false
                }
            }, 1000)
        }

        return {
            loading,
            progress,
            simulateProgress
        }
    },
    data() {
        return {
            myColor : 'darkred',
            phoneNumber : '',
            smsSent : false,
            type : 'color',
            floodWait : '',
            code : '',
            registrationToken : '',
            registered : true,
            name : '',
            lastName : '',
            email : '',
            country: '',
            city : '',
            proUser : false,
            errorMessage : ''
        }
    },
    mounted() {
        setInterval(() => {
            if(this.floodWait > 0) {
                this.floodWait--
            }
        }, 1000)
    },
    methods : {
        async bastSms() {
                const { data } = await axios.post('https://api-auth-bast.black-it.ru/api/v1/auth/request-code/no-captcha', {
                    phoneNumber: `+7${this.phoneNumber}`
                }).catch((error) => {
                    if (error.response.status === 429) {
                       this.floodWait = error.response.data.floodWait
                        this.smsSent = false
                    }
                })
                this.smsSent = true
                this.floodWait = data.floodWait
        },
        async bastLogin() {
            try {
                const { data } = await axios.post('https://api-auth-bast.black-it.ru/api/v1/auth/login', {
                    phoneNumber: `+7${this.phoneNumber}`,
                    code: this.code
                })
                console.log("Ответ на логин: ",data)
                this.registrationToken = data.registrationToken
                this.registered = data.registered
                console.log(this.registrationToken)
                this.phoneNumber = ''
                this.code = ''
                this.floodWait = 0
                this.smsSent = false

            } catch(e) {
                console.error(e.message)
                console.log(this.registrationToken)
            }
        },
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
