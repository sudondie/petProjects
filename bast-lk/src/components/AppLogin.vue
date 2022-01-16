<template>
    <form class="form-control" @submit.prevent="bastLogin">
        <div class="card" v-if="!smsSent">
          <p>Это номер: </p>{{phoneNumber}}
            <q-input outlined v-model="phoneNumber"  mask="phone" label="Введите номер телефона" prefix="+7">
                <template v-slot:prepend>
                    <img src="../assets/rus.svg" alt="">
                </template>
            </q-input>
            <p v-if="floodWait > 0" style="color: red">Повторно отправить запрос можно через {{ floodWait }} секунд</p>
            <q-btn color="primary" v-if="!smsSent" :disabled="floodWait > 0 || phoneNumber.length===0" @click="bastSms" style="width: 150px">
                Выслать код
            </q-btn>
        </div>
        <div class="card" v-if="smsSent">
            <q-input outlined v-model="code" label="Введите код">
            </q-input>
            <p v-if="floodWait > 0" style="color: red">Отправить запрос можно через {{ floodWait }} секунд</p>
            <q-btn color="primary" v-if="smsSent" :disabled="code.length<6" type="submit" style="width: 150px">
                Войти
            </q-btn>
            <a @click="bastSms">Запросить код повторно</a>
            <a @click="changeCode">Сменить номер</a>
        </div>
    </form>
</template>

<script>
import {ref, computed,onMounted} from 'vue';
import {useStore} from "vuex";
//import * as yup from "yup";
export default {
    name: "AppLogin",
    setup() {
        const store = useStore();
        const smsSent = ref(false)
        const code = ref('')
        const floodWait = ref(0)
        const phoneNumber = ref('')
        const enterCode = () => {
            store.commit('setSmsSent',true)
        }
        const bastSms = async ()=> {
            await store.dispatch('bastSms',{
                phoneNumber : phoneNumber,
                smsSent : smsSent,
                floodWait : floodWait
            })
        }
        const bastLogin = async ()=> {
            await store.dispatch('bastLogin', {
                code,
                phoneNumber
            })
        }
        onMounted(()=> {
            setInterval(() => {
                if(store.state.floodWait > 0) {
                    store.state.floodWait--
                }
            }, 1000)
        })
        const changeCode = () => {
            store.commit('setSmsSent',false)
            store.state.floodWait = 0
        }
        return {
            smsSent: computed(()=> store.state.smsSent),
            code,
            phoneNumber,
            bastSms,
            bastLogin,
            changeCode,
            enterCode,
            floodWait : computed(()=> store.state.floodWait)
        }
    },
    
}
</script>

<style scoped>

</style>
