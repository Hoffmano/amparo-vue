<template>
	<div class="modal-backdrop">
		<div class="modal">
			<header class="modal-header">
				<slot name="header">
					Nova Atividade

					<button type="button" class="btn-close" @click="close">
						x
					</button>
				</slot>
			</header>
			<section class="modal-body">
				<form autocomplete="off" name="body">
					<div>
						<div class="autocomplete">
							<input
								autocomplete="off"
								id="name_cpf"
								ref="name_cpf"
								placeholder="Buscar o paciente por nome ou CPF"
								v-model="input_name_cpf"
								v-on:keypress="show_options"
								v-bind:class="{
									invalid_input: this.is_empty_name_cpf,
								}"
							/>
							<div class="options" v-if="this.show_options">
								<button
									class="option_button"
									v-for="option in this.firsts"
									v-bind:key="option"
									v-on:click.prevent="
										select_this_option($event)
									"
								>
									{{ option }}
								</button>
							</div>
						</div>
					</div>
					<div id="div_second">
						<input
							class="second_line"
							type="date"
							v-model="input_date"
							v-bind:class="{
								invalid_input: this.is_empty_date,
							}"
						/>
						<select
							class="second_line"
							placeholder="Status"
							v-model="input_status"
							v-bind:class="{
								invalid_input: this.is_empty_status,
							}"
						>
							<option value="" selected>
								Status do Aprazamento
							</option>
							<option value="Aberto">Aberto</option>
							<option value="Atrasado">Atrasado</option>
							<option value="Fechado">Fechado</option>
						</select>
					</div>
					<div>
						<textarea
							v-model="input_description"
							name=""
							id="description"
							cols="30"
							rows="10"
							placeholder="Atividade"
							v-bind:class="{
								invalid_input: this.is_empty_description,
							}"
						></textarea>
					</div>
					<button class="button_modal" v-on:click.prevent="register">
						Cadastrar
					</button>
				</form>
			</section>
		</div>
	</div>
</template>

<script>
import activities from "../services/activities.js";
import patient from "../services/patient.js";
import Autocomplete from "@trevoreyre/autocomplete-vue";

export default {
	name: "new_activity",
	components: {
		Autocomplete,
	},
	mounted() {
		window.addEventListener(
			"keypress",
			function (e) {
				this.show_options = true;
			}.bind(this)
		);
	},
	data() {
		return {
			input_name_cpf: "",
			input_date: "",
			input_description: "",
			input_status: "",
			options: [],
			filtered_options: [],
			show_options: false,
			is_empty_description: false,
			is_empty_name_cpf: false,
			is_empty_status: false,
			is_empty_date: false,
		};
	},

	methods: {
		show_new_activity() {
			patient.get_autocomplete_options().then((Response) => {
				this.options = Response.data;
			});
		},
		close() {
			this.input_name_cpf = "";
			this.input_description = "";
			this.input_status = "";
			this.input_date = "";
			this.$emit("close");
		},
		register() {
			if (this.input_description == "") {
				this.is_empty_description = true;
			} else {
				this.is_empty_description = false;
			}

			if (this.input_name_cpf == "") {
				this.is_empty_name_cpf = true;
			} else {
				this.is_empty_name_cpf = false;
			}

			if (this.input_date == "") {
				this.is_empty_date = true;
			} else {
				this.is_empty_date = false;
			}

			if (this.input_status == "") {
				this.is_empty_status = true;
			} else {
				this.is_empty_status = false;
			}

			if (
				this.input_name_cpf != "" &&
				this.input_description != "" &&
				this.input_status != "" &&
				this.input_date != ""
			) {
				for (var index = 0; index < this.options.length; index++) {
					if (this.options[index] === this.input_name_cpf) {
						console.log(index);
						if (index % 2 != 0) {
							if (parseInt(this.options[index]) != null) {
								console.log(parseInt(this.options[index]));
								activities
									.post_activity({
										cpf: parseInt(this.options[index]),
										description: this.input_description,
										status: this.input_status,
										date: this.input_date,
									})
									.then(() => {
										this.input_name_cpf = "";
										this.input_description = "";
										this.input_status = "";
										this.input_date = "";
										this.$emit("new_activity");
										this.$emit("close");
									});
							}
						} else if (parseInt(this.options[index + 1]) != null) {
							console.log(parseInt(this.options[index + 1]));
							activities
								.post_activity({
									cpf: parseInt(this.options[index + 1]),
									description: this.input_description,
									status: this.input_status,
									date: this.input_date,
								})
								.then(() => {
									this.input_name_cpf = "";
									this.input_description = "";
									this.input_status = "";
									this.input_date = "";
									this.$emit("new_activity");
									this.$emit("close");
								});
						}
					}
				}
			}
		},

		filter_options() {
			this.filtered_options = this.options.filter((option) => {
				if (this.input_name_cpf != "")
					return option
						.toLowerCase()
						.startsWith(this.input_name_cpf.toLowerCase());
			});
		},
		select_this_option(event) {
			this.input_name_cpf = event.target.innerHTML;
			this.input_name_cpf = this.input_name_cpf.trim();
			this.show_options = false;
		},
	},
	watch: {
		input_name_cpf() {
			this.filter_options();
		},
	},
	computed: {
		firsts() {
			return this.filtered_options.slice(0, 3);
		},
	},
};
</script>

<style>
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	background: #ffffff;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
}

.modal-header,
.modal-footer {
	padding: 15px;
	display: flex;
}

.modal-header {
	color: #4aae9b;
	justify-content: space-between;
}

.modal-body {
	position: relative;
	padding: 20px 10px;
}

.btn-close {
	border: none;
	font-size: 20px;
	cursor: pointer;
	color: #4aae9b;
	background: transparent;
}

#name_cpf {
	margin: 10px;
	width: 400px;
	height: 40px;
	background-color: rgb(224, 224, 224);
	text-align: center;
}

#div_second {
	margin: 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.second_line {
	width: 190px;
	height: 40px;
	background-color: rgb(224, 224, 224);
	appearance: none;
}

#description {
	margin: 10px;
	width: 400px;
	background-color: rgb(224, 224, 224);
	text-align: center;
	vertical-align: middle;
}

.button_modal {
	background-color: rgb(171, 223, 171);
}

.autocomplete {
	/*the container must be positioned relative:*/
	position: relative;
	display: inline-block;
}
.autocomplete-items {
	position: absolute;
	border: 1px solid #d4d4d4;
	border-bottom: none;
	border-top: none;
	z-index: 99;
	/*position the autocomplete items to be the same width as the container:*/
	top: 100%;
	left: 0;
	right: 0;
}
.autocomplete-items div {
	padding: 10px;
	cursor: pointer;
	background-color: #fff;
	border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
	/*when hovering an item:*/
	background-color: #e9e9e9;
}
.autocomplete-active {
	/*when navigating through the items using the arrow keys:*/
	background-color: DodgerBlue !important;
	color: #ffffff;
}

.options {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.option_button {
	background: rgb(173, 219, 173);
	margin: auto;
	margin-top: 2px;
	margin-bottom: 2px;
	width: 400px;
}

.option_button:hover {
	background: rgb(140, 185, 140);
}

.invalid_input {
	border-style: solid;
	border-color: #5f2626;
	background: #dab8b8;
}

.second_line {
	text-align: center;
}
</style>