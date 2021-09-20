import {createStore} from 'vuex';
import {ref} from "vue";
import axios from "axios";
export default createStore({
    state() {
        const loading = ref(false)
        const registered = ref(true)
        const registrationToken = ref('')
        const smsSent = ref(false)
        const code = ref('')
        const floodWait = 0
        const phoneNumber = ref('')
        const lastName = ref('')
        const email = ref('')
        const country = ref('')
        const city = ref('')
        const proUser = ref(false)
        return{
            loading,
            registered,
            registrationToken,
            smsSent,
            code,
            floodWait,
            phoneNumber,
            lastName,
            email,
            country,
            city,
            proUser
        }
    },
    mutations: {
        setLoading(state,value) {
            state.loading = value
        },
        setSmsSent(state,value) {
            state.smsSent = value
        },
        setCode(state,value) {
            state.code = value
        },
        setFloodWait(state,value) {
            state.floodWait = value
        },
        setPhoneNumber(state,value) {
            state.phoneNumber = value
        },
        setLastName(state,value) {
            state.lastName = value
        },
        setEmail(state,value) {
            state.email = value
        },
        setCountry(state,value) {
            state.country = value
        },
        setCity(state,value) {
            state.city = value
        },
        setProUser(state,value) {
            state.proUser = value
        },
        setRegistered(state,value) {
            state.registered = value
        },
        setRegistrationToken(state,value) {
            state.registrationToken = value
        }
    },
    actions : {
        async bastSms({commit},payload) {
            try {
                const { data } = await axios.post('https://api-auth-bast.black-it.ru/api/v1/auth/request-code/no-captcha', {
                    phoneNumber: `+7${payload.phoneNumber.value}`
                })
                commit('setFloodWait',data.floodWait)
                commit('setSmsSent',true)
            } catch (e) {
                if (e.response.status === 429) {
                    commit('setFloodWait',e.response.data.floodWait)
                    commit('setSmsSent',false)
                }
            }
        },
        async bastLogin({commit},payload) {
            try {
                const { data } = await axios.post('https://api-auth-bast.black-it.ru/api/v1/auth/login', {
                    phoneNumber: `+7${payload.phoneNumber.value}`,
                    code: payload.code.value
                })
                console.log("Ответ на логин: ",data)
                commit('setRegistrationToken',data.registrationToken)
                commit('setRegistered',data.registered)
                commit('setPhoneNumber','')
                commit('setCode','')
                commit('setFloodWait',0)
                commit('setSmsSent',false)
            } catch(e) {
                console.error(e)
            }
        },
    },
    getters : {
        floodWait(state) {
            return state.floodWait
        }
    },
})
