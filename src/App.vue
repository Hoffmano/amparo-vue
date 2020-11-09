<template>
	<div id="body">
		<!-- <header_component /> -->
		<menu_component
			v-on:new_patient="show_new_patient"
			v-on:new_activity="show_new_activity"
		/>
		<search_filter />
		<activities_list ref="activities_list"/>
		<new_patient
			v-show="is_new_patient_visible"
			@close="close_new_patient"
		/>
		<new_activity
			ref="new_activity"
			v-show="is_new_activity_visible"
			@close="close_new_activity"
			v-on:new_activity="update_activities_list"
		/>
	</div>
</template>

<script>
import header_component from "./components/header_component.vue";
import menu_component from "./components/menu_component.vue";
import search_filter from "./components/search_filter.vue";
import activities_list from "./components/activities_list.vue";
import new_patient from "./components/new_patient.vue";
import new_activity from "./components/new_activity.vue";

export default {
	name: "App",
	components: {
		header_component,
		menu_component,
		search_filter,
		activities_list,
		new_patient,
		new_activity,
	},

	data() {
		return {
			is_new_patient_visible: false,
			is_new_activity_visible: false,
		};
	},

	methods: {
		show_new_patient() {
			this.is_new_patient_visible = true;
		},
		close_new_patient() {
			this.is_new_patient_visible = false;
		},
		show_new_activity() {
			this.is_new_activity_visible = true;
			this.$refs["new_activity"].show_new_activity()
		},
		close_new_activity() {
			this.is_new_activity_visible = false;
		},
		update_activities_list(){
			this.$refs.activities_list.update_list()
		}
	},
};
</script>

<style>
*{
	font-family: 'Courier New', Courier, monospace;
	border-radius: 5px;
	border-style: none;
}
#body{
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
}
</style>
