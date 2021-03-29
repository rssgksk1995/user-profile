/* eslint-disable*/
import Vue from "vue";
import Vuex from "vuex";

import user from "@/store/modules/user";

Vue.use(Vuex);

let store = new Vuex.Store({
	modules: {
		user
	}
});

export { store };
