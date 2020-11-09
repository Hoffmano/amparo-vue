<template>
	<div id="menu">
		<div id="page">
			<a href="/">
				<img
					id="logo"
					src="../assets/logo-amparo-green-dark.png"
					alt="Amparo Saúde"
				/>
			</a>
		</div>
		<div id="menu-buttons">
			<button class="button" v-on:click="new_patient">
				Novo Paciente
			</button>
			<button class="button" v-on:click="new_activity">
				Nova Atividade
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "menu_component",

	methods: {
		new_patient() {
			this.$emit("new_patient");
		},
		new_activity() {
			this.$emit("new_activity");
		},
	},
};
</script>

<style scoped>
* {
	display: flex;
	padding: 0;
	margin: 0;
}
#menu {
	justify-content: space-between;
	align-items: center;
	background-color: rgb(224, 224, 224);
}
#route {
	font-size: 20px;
}
#page {
	flex-direction: column;
}
.button {
	height: 40px;
	background-color: rgb(162, 221, 162);
	align-items: center;
	justify-content: center;
	margin: 5px;
	padding: 10px;
}

.button:hover {
	background-color: rgb(152, 187, 146);
}

#logo {
	max-width: 300px;
	margin: 10px;
}

#menu-buttons {
	margin-right: 10px;
}
</style>