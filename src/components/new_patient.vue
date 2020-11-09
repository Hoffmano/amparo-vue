<template>
	<div class="modal-backdrop">
		<div class="modal">
			<header class="modal-header">
				<slot name="header">
					Novo Paciente

					<button type="button" class="btn-close" v-on:click="close">
						x
					</button>
				</slot>
			</header>
			<section class="modal-body">
				<slot name="body">
					<input
						class="name_cpf"
						v-model="input_name"
						placeholder="Nome completo"
						v-bind:class="{
							warning_input: this.name_invalid,
						}"
					/>
					<input
						class="name_cpf"
						v-bind:class="{
							warning_input: this.cpf_exist || this.cpf_invalid,
						}"
						v-model="input_cpf"
						placeholder="CPF"
					/>
					<button class="button_modal" v-on:click="register">
						Cadastrar
					</button>
				</slot>
			</section>
			<div id="warning-div">
				<p class="warning" v-if="cpf_exist">CPF já cadastrado</p>
				<p class="warning" v-if="cpf_invalid">CPF inválido</p>
				<p class="warning" v-if="name_invalid">Nome inválido</p>
			</div>
		</div>
	</div>
</template>

<script>
import patient from "../services/patient.js";

export default {
	name: "new_patient",

	data() {
		return {
			input_name: "",
			input_cpf: "",
			cpf_exist: false,
			cpf_invalid: false,
			name_invalid: false,
		};
	},

	methods: {
		validate_name(name) {
			name = name.trim();
			const regex = RegExp("[^a-z s A-Z]+", "g");
			if (!regex.test(name)) {
				this.name_invalid = false;
				return name;
			} else {
				this.name_invalid = true;
				return "";
			}
		},
		validate_cpf(cpf) {
			cpf = cpf.trim();
			const regex = RegExp("[^0-9]+", "g");
			if (!regex.test(cpf)) {
				this.cpf_invalid = false;
				cpf = parseInt(cpf, 10);
				return cpf;
			} else {
				this.cpf_invalid = true;
				return "";
			}
		},
		close() {
			this.input_name = "";
			this.input_cpf = "";
			this.$emit("close");
		},
		register() {
			this.cpf_exist = false;
			const input_name = this.validate_name(this.input_name);
			const input_cpf = this.validate_cpf(this.input_cpf);

			patient
				.cpf_exist({
					cpf: input_cpf,
				})
				.then((response) => {
					if (!response.data.cpf_exist) {
						this.cpf_exist = false;
						if (input_name != "" && input_cpf != "") {
							patient
								.new_patient({
									name: input_name,
									cpf: input_cpf,
								})
								.then(() => {
									this.input_name = "";
									this.input_cpf = "";
								});

							this.$emit("close");
						}
					} else {
						this.cpf_exist = true;
					}
				});
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

.name_cpf {
	margin: 10px;
	width: 200px;
	height: 40px;
	text-align: center;
	background-color: #d4d4d4;
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
}

#description {
	margin: 10px;
	width: 420px;
}

.button_modal {
	background-color: rgb(171, 223, 171);
	margin: 10px;
	height: 40px;
}

#warning-div {
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.warning_input {
	border-style: solid;
	border-color: #5f2626;
	background: #eccece;
}

.warning {
	padding: 0;
	margin-bottom: 30px;
	color: #5f2626;
}
</style>