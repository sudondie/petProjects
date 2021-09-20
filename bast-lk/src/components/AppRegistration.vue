<template>
    <form class="form-control" @submit.prevent="bastRegister">
        <input type="text" v-model="name" placeholder="Введите имя">
        <input type="text" v-model="lastName" placeholder="Введите фамилию">
        <input type="text" v-model="email" placeholder="Email">
        <input type="text" v-model="country" placeholder="Страна">
        <input type="text" v-model="city" placeholder="Город">
        <label for="proUser">Профессиональный пользователь!</label>
        <input type="checkbox" class="form-checkbox" id="proUser" v-model="proUser" value="true" placeholder="Профессиональны пользователь">
        <button class="btn primary">Зарегистрироваться</button>
    </form>
</template>

<script>
import {ref} from 'vue';
export default {
    name: "AppRegistration",
    setup() {
        const lastName = ref('')
        const email = ref('')
        const country = ref('')
        const city = ref('')
        const proUser = ref(false)
        return {
            lastName,
            email,
            country,
            city,
            proUser
        }
    }
}
</script>

<style scoped>

</style>
