<template>
  <div class="card">
    <h4>{{ firstName }},вы успешно вошли в систему</h4>
    <ul>
      <li>Имя: {{firstName}}</li>
      <li>Фамилия: {{lastName}}</li>
      <li>Номер телефона: {{phoneNumber}}</li>
    </ul>
    <h5 style="color: red" v-if="!emailConfirmed">Ваш email {{email}} не подтвержден</h5>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed,onMounted} from "vue";

export default {
  name: "AppContent",
  setup() {
    const store = useStore()
    onMounted(()=> bastPersonal())
    const bastPersonal = async ()=> {
      await store.dispatch('bastPersonal')
    }
    return {
      lastName : computed(()=> store.state.lastName),
      firstName : computed(()=> store.state.firstName),
      phoneNumber : computed(()=> store.state.phoneNumber),
      emailConfirmed : computed(()=> store.state.emailConfirmed),
      email : computed(()=> store.state.email),
      bastPersonal
    }
  }
}
</script>

<style scoped lang="sass">
.card
  padding-top: 50%
  ul
    padding: 0

    li
      list-style-type: none
  h5,h4
    margin: 0
</style>