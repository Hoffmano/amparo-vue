<template>
	<div id="component">
		<table id="table">
			<tr>
				<th>Nome</th>
				<th>CPF</th>
				<th>Data</th>
				<th>Atividade</th>
				<th>Status</th>
			</tr>
			<tr
				class="row"
				v-for="(activity, index) in edited_activities.slice(
					this.page * this.activities_per_page,
					(this.page + 1) * this.activities_per_page
				)"
				v-bind:key="activity.id"
			>
				<td>{{ activity.name }}</td>
				<td>{{ activity.cpf }}</td>
				<td>{{ activity.new_date }}</td>
				<td>{{ activity.description }}</td>
				<td>
					<select
						class="status"
						v-bind:class="{ aberto: activity.is_open }"
						v-if="activity.status == 'Aberto'"
						v-model="activities[index].status"
						v-on:click="update_status(index)"
					>
						<option value="Aberto" selected="selected">
							Aberto
						</option>
						<option value="Atrasado">Atrasado</option>
						<option value="Fechado">Fechado</option>
					</select>
					<select
						class="status"
						v-bind:class="{ atrasado: activity.is_late }"
						v-else-if="activity.status == 'Atrasado'"
						v-model="activities[index].status"
						v-on:click="update_status(index)"
					>
						<option value="Aberto">Aberto</option>
						<option value="Atrasado" selected="selected">
							Atrasado
						</option>
						<option value="Fechado">Fechado</option>
					</select>
					<select
						class="status"
						v-bind:class="{ fechado: activity.is_close }"
						v-else-if="activity.status == 'Fechado'"
						v-model="activities[index].status"
						v-on:click="update_status(index)"
					>
						<option class="aberto" value="Aberto">Aberto</option>
						<option value="Atrasado">Atrasado</option>
						<option value="Fechado" selected="selected">
							Fechado
						</option>
					</select>
				</td>
			</tr>
		</table>
		<div class="div_pages">
			<button class="button_page" v-on:click.prevent="previous_page">
				<
			</button>
			<button
				v-for="index in this.showed_pages"
				v-on:click.prevent="change_page(index)"
				v-bind:key="index"
				class="button_page"
				v-bind:class="{ actual_page: page == index - 1 }"
			>
				{{ index }}
			</button>
			<button class="button_page" v-on:click.prevent="next_page">
				>
			</button>
		</div>
	</div>
</template>

<script>
import activities from "../services/activities.js";
import update_status from "../services/update_status";

export default {
	name: "activities_list",

	data() {
		return {
			activities: [],
			page: 0,
			activities_per_page: 5,
		};
	},
	mounted() {
		activities
			.get_activities(this.$store.state.filters)
			.then((response) => {
				this.activities = response.data.activities;
			});
	},
	computed: {
		filters() {
			return this.$store.state.filters;
		},
		edited_activities() {
			return this.activities.map((activity) => ({
				...activity,
				new_date: `${activity.date.slice(8, 10)}/${activity.date.slice(
					5,
					7
				)}/${activity.date.slice(0, 4)}`,
				is_open: activity.status === "Aberto",
				is_late: activity.status === "Atrasado",
				is_close: activity.status === "Fechado",
			}));
		},
		showed_pages() {
			return Math.ceil(this.activities.length / this.activities_per_page);
		},
	},
	watch: {
		filters(new_filters, old_filters) {
			activities.get_activities(new_filters).then((response) => {
				this.activities = response.data.activities;
			});
			this.page=0
		},
	},
	methods: {
		update_status(index) {
			update_status.update_status({
				id: this.activities[index].id,
				status: this.activities[index].status,
			});
		},
		update_list() {
			activities
				.get_activities(this.$store.state.filters)
				.then((response) => {
					this.activities = response.data.activities;
					console.log("UPDATE_LIST");
				});
		},
		change_page(index) {
			this.page = index - 1;
		},
		next_page() {
			if(this.page+1 < this.showed_pages)
			this.page += 1;
		},
		previous_page() {
			if (this.page - 1 >= 0) this.page -= 1;
		},
	},
};
</script>

<style scoped>
* {
	padding: 0;
	margin: 0;
}

#component {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 0;
}
#table {
	padding: 0;
	border-collapse: collapse;
	width: 1000px;
}
tr.row td {
	border-top: 1px solid black;
	height: 40px;
}
td {
	padding: 0 20px 0 20px;
	text-align: center;
}
.status {
	width: 150px;
	text-align: center;
	background-color: rgb(223, 223, 223);
	appearance: none;
}

.aberto {
	color: rgb(41, 106, 150);
}

.atrasado {
	color: rgb(165, 66, 66);
}

.fechado {
	color: rgb(68, 139, 68);
}
.div_pages {
	display: flex;
	position: absolute;
	bottom:60px;
}
.button_page {
	background-color: rgb(178, 211, 173);
	width: 30px;
	height: 30px;
	margin: 5px;
}

.actual_page {
	background-color: rgb(152, 187, 146);
}

.button_page:hover {
	background-color: rgb(152, 187, 146);
}
</style>