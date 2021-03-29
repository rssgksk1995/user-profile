import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: "mdi"
	},
	theme: {
		dark: true,
		themes: {
			dark: {
				primary: "#f06031",
				secondary: "#000",
				info: "#f6c253",
				success: "#7ed321",
				warning: "#4a90e2",
				accent: "#f06031"
			},
			light: {
				primary: "#ccc",
				color: "#000000"
			}
		}
	}
});
