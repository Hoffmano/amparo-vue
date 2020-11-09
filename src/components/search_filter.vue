<template>
	<form id="form">
		<input
			class="input"
			type="text"
			placeholder="CPF do Paciente"
			v-model="cpf_filter"
		/>
		<select class="input" name="" id="" v-model="status_filter">
			<option id="placeholder" value="" selected>
				Status do Aprazamento
			</option>
			<option value="Aberto">Aberto</option>
			<option value="Atrasado">Atrasado</option>
			<option value="Fechado">Fechado</option>
		</select>

		<input
			id="select"
			class="input"
			type="date"
			v-model="date_filter"
		/>

		<button id="filter" class="input" v-on:click="filter">Filtrar</button>
	</form>
</template>

<script>
import filter from "../services/filter.js";

export default {
	name: "search_filter",

	data() {
		return {
			cpf_filter: "",
			status_filter: "",
			date_filter: "",
		};
	},
	computed: {
		format_date() {
			if (this.date_filter != "") {
				return {
					formated_date:
						this.date_filter.slice(0, 4) +
						"-" +
						this.date_filter.slice(5, 7) +
						"-" +
						this.date_filter.slice(8, 11) +
						"T00:00:00.000Z",
				};
			}
			else{
				return{
					formated_date:""
				}
			}
		},
	},

	methods: {
		filter(event) {
			event.preventDefault();
			this.$store.commit("set_filters", {
				cpf_filter: this.cpf_filter,
				status_filter: this.status_filter,
				date_filter: this.format_date.formated_date,
			});
		},
	},
};
</script>

<style>
#form {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
}
.input {
	margin: 5px;
	height: 40px;
	width: 240px;
	background-color: rgb(212, 212, 212);
	text-align: center;
	appearance: none;
	color: black;
	font-size: 1em;
	font-family: "Courier New", Courier, monospace;
}

#filter {
	background-color: rgb(162, 221, 162);
}

#filter:hover{
	background-color: rgb(152, 187, 146);
}
</style>