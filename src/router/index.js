import Vue from "vue";
import VueRouter from "vue-router";
const LoginPage = () => import("../views/LoginPage.vue");
const HomePage = () => import("../views/Home.vue");
const UserPage = () => import("../views/UserPage.vue");
const EditUserPage = () => import("../views/EditUserPage.vue");

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "LoginPage",
		component: LoginPage
	},
	{
		path: "/home",
		name: "Home",
		component: HomePage
	},
	{
		path: "/user/add",
		name: "UserPage",
		component: UserPage
	},
	{
		path: "/user/edit/:userId",
		name: "EditUserPage",
		component: EditUserPage
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
