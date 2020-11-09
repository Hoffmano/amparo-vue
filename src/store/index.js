import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		filters: {
			cpf_filter: "",
			status_filter: "",
			date_filter: ""
		}
	},
	getters: {},
    mutations: {
        set_filters(state, payload) {
            state.filters = payload
        }
    },
	actions: {}
});
