<template>
  <div class="card">
    <h4>Данные пользователя:</h4>
    <ul>
      <li>{{lastName}}</li>
      <li>{{phoneNumber}}</li>
    </ul>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "AppContent",
  setup() {
    const store = useStore()
    return {
      lastName : computed(()=> store.state.lastName),
      phoneNumber : computed(()=> store.state.phoneNumber)
    }
  }
}
</script>

<style scoped>

</style>