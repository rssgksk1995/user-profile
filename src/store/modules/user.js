import api from "@/api";

function defaultState() {
	return {
		userData: {},
		currentPage: "",
		totalPage: "",
		errorObj: {}
	};
}

export default {
	namespaced: true,
	state: defaultState(),

	getters: {},

	mutations: {
		SET_USER_DATA: (state, userData) => (state.userData = userData),
		SET_CURRENT_PAGE: (state, currentPage) => (state.currentPage = currentPage),
		SET_TOTAL_PAGE: (state, totalPage) => (state.totalPage = totalPage),
		ERR_MSG: (state, err) => (state.errorObj = err)
	},

	actions: {
		getUserData: ({ commit }, params) =>
			new Promise((resolve, reject) => {
				api
					.fetchUserData(params)
					.then(response => {
						commit("SET_USER_DATA", response.data.data);
						commit("SET_CURRENT_PAGE", response.data.page);
						commit("SET_TOTAL_PAGE", response.data.total_pages);
						resolve(response);
					})
					.catch(error => {
						reject(error);
					});
			}),
		getMoreUserData: ({ commit, state }, params) =>
			new Promise((resolve, reject) => {
				api
					.fetchUserData(params)
					.then(response => {
						commit("SET_USER_DATA", [...state.userData, ...response.data.data]);
						commit("SET_CURRENT_PAGE", response.data.page);
						commit("SET_TOTAL_PAGE", response.data.total_pages);
						resolve(response);
					})
					.catch(error => {
						reject(error);
					});
			}),
		deleteUserData: ({ commit, state }, params) => {
			let allRenderedUserList = state.userData;
			let newList = [];
			allRenderedUserList.forEach(element => {
				if (params !== element.id) {
					newList.push(element);
				}
			});
			commit("SET_USER_DATA", newList);
		},
		addUserData: ({ commit, state }, payload) => {
			let allRenderedUserList = state.userData;
			let len = allRenderedUserList.length;
			let lastElement = allRenderedUserList[len - 1];
			let newId = lastElement.id + 1;
			payload.id = newId;
			allRenderedUserList.push(payload);
			commit("SET_USER_DATA", allRenderedUserList);
		},
		updateUserData: ({ commit, state }, payload) => {
			let usrId = payload.id;
			let allRenderedUserList = state.userData;
			if (usrId) {
				allRenderedUserList.forEach((element, index) => {
					if (parent(element.id) === parseInt(usrId)) {
						allRenderedUserList.splice(index, 1, element);
					}
				});
				commit("SET_USER_DATA", allRenderedUserList);
			}
		}
	}
};
