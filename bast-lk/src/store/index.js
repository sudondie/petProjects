import { createStore } from 'vuex';
import { ref } from 'vue';
import axios from 'axios';
export default createStore({
  state() {
    const loading = ref(false);
    const logged = ref(false);
    const registered = ref(true);
    const registrationToken = ref('');
    const smsSent = ref(false);
    const code = ref('');
    const floodWait = 0;
    const phoneNumber = ref('');
    const lastName = ref('');
    const firstName = ref('');
    const email = ref('');
    const country = ref('');
    const city = ref('');
    const proUser = ref(false);
    const emailConfirmed = ref('')
    const token = null;
    return {
      loading,
      emailConfirmed,
      registered,
      registrationToken,
      smsSent,
      code,
      floodWait,
      logged,
      phoneNumber,
      lastName,
      firstName,
      email,
      country,
      city,
      proUser,
      token,
    };
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setSmsSent(state, value) {
      state.smsSent = value;
    },
    setCode(state, value) {
      state.code = value;
    },
    setFloodWait(state, value) {
      state.floodWait = value;
    },
    setPhoneNumber(state, value) {
      state.phoneNumber = value;
    },
    setLastName(state, value) {
      state.lastName = value;
    },
    setFirstName(state, value) {
      state.firstName = value;
    },
    setEmail(state, value) {
      state.email = value;
    },
    setCountry(state, value) {
      state.country = value;
    },
    setCity(state, value) {
      state.city = value;
    },
    setProUser(state, value) {
      state.proUser = value;
    },
    setRegistered(state, value) {
      state.registered = value;
    },
    setRegistrationToken(state, value) {
      state.registrationToken = value;
    },
    setLogged(state, value) {
      state.logged = value;
      localStorage.setItem('logged', state.logged);
    },
    setToken(state, value) {
      state.token = value;
      localStorage.setItem('jwt-token', state.token);
    },
    setEmailConfirmed(state,value) {
      state.emailConfirmed = value
    }
  },
  actions: {
    async bastSms({ commit }, payload) {
      try {
        const { data } = await axios.post(
          'https://api-auth-bast.black-it.ru/api/v1/auth/request-code/no-captcha',
          {
            phoneNumber: `+7${payload.phoneNumber.value}`,
          }
        );
        commit('setFloodWait', data.floodWait);
        commit('setSmsSent', true);
      } catch (e) {
        if (e.response.status === 429) {
          commit('setFloodWait', e.response.data.floodWait);
          commit('setSmsSent', false);
        }
      }
    },
    async bastLogin({ commit }, payload) {
      try {
        const { data } = await axios.post(
          'https://api-auth-bast.black-it.ru/api/v1/auth/login',
          {
            phoneNumber: `+7${payload.phoneNumber.value}`,
            code: payload.code.value,
          }
        );
        commit('setToken', String(data.esia.jwt));
        commit('setRegistered', data.registered);
        commit('setPhoneNumber', '');
        commit('setCode', '');
        commit('setFloodWait', 0);
        commit('setSmsSent', false);
        if(data.registered) {
          commit('setLogged', true);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async bastPersonal({commit}) {
      try {
        const { data } = await axios.get(
            'https://api-auth-bast.black-it.ru/api/v1/personal-data',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
              },
            }
        );
        console.log(data);
        commit('setCity', data.city);
        commit('setLastName', data.lastName);
        commit('setFirstName',data.firstName);
        commit('setPhoneNumber', data.phoneNumber);
        commit('setEmailConfirmed',data.emailConfirmed);
        commit('setEmail',data.email);
      } catch (e) {
        console.error(e.message);
        if(e.response.status === 401) {
          commit('setLogged',false)
          localStorage.removeItem('jwt-token')
        }
      }
    },
    async bastRegister({ commit }, payload) {
      try {
        const { data } = await axios.post(
          'https://api-auth-bast.black-it.ru/api/v1/auth/registration',
          {
            registrationToken: payload.registrationToken.value,
            firstName: payload.firstName.value,
            lastName: payload.lastName.value,
            phoneNumber: payload.phoneNumber.value,
            isProfessionalUser: payload.proUser.value,
            email: payload.email.value,
            country: payload.country.value,
            city: payload.city.value,
          }
        );
        commit('setRegistrationToken', data.registrationToken);
        console.log('Ответ на регистрацию: ', data);
      } catch (e) {
        console.error(e.message);
      }
    },
  },
  getters: {
    floodWait(state) {
      return state.floodWait;
    },
    token(state) {
      return state.token;
    },
  },
});
