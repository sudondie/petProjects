<template>
    <form class="form-control" @submit.prevent="bastRegister">
        <div class="card">
            <q-input outlined v-model="firstName" label="Введите имя">
            </q-input>
            <q-input outlined v-model="lastName" label="Введите фамилию">
            </q-input>
            <q-input outlined v-model="email" label="Email">
            </q-input>
            <q-input outlined v-model="country" label="Страна">
            </q-input>
            <q-input outlined v-model="city" label="Город">
            </q-input>
            <label>Профессиональный пользователь:</label>
            <div class="radios">
                <q-radio dense v-model="proUser" val="true" label="Да" color="primary" />
                <q-radio dense v-model="proUser" val="false" label="Нет" />
            </div>
            <q-btn color="primary" type="submit">
                Зарегистрироваться
            </q-btn>
        </div>
    </form>
</template>

<script>
import {ref,computed} from 'vue';
import {useStore} from "vuex";
export default {
    name: "AppRegistration",
    setup() {
        const store = useStore();
        const lastName = ref('')
        const firstName = ref('')
        const email = ref('')
        const country = ref('')
        const city = ref('')
        const proUser = ref('')
        const phoneNumber = ref('')
        const registrationToken = ref('')
        const bastRegister = async ()=> {
            await store.dispatch('bastRegister', {
                firstName,
                registrationToken,
                lastName,
                phoneNumber,
                proUser,
                email,
                country,
                city
            })
        }
        return {
            lastName,
            firstName,
            registrationToken: computed(()=> store.state.registrationToken),
            email,
            country,
            city,
            proUser,
            bastRegister
        }
    }
}
</script>

<style scoped>

</style>
