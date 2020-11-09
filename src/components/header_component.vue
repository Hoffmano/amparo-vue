<template>
	<div>
		<img id="logo" src="../assets/logo-amparo-green-dark.png" alt="Amparo Saúde">
	</div>
</template>

<script>
export default {
	name: "header_component",
};
</script>

<style scoped>
* {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
#logo{
	max-width: 300px;
	margin: 10px;
}
#subtitle {
	text-decoration: underline;
	text-decoration-color: rgb(133, 231, 133);
}
</style>