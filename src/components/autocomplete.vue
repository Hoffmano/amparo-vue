<template>
	<div style="position: relative" v-bind:class="{ open: openSuggestion }">
		<input
			class="form-control"
			type="text"
			v-model="selection"
			@keydown.enter="enter"
			@keydown.down="down"
			@keydown.up="up"
			@input="change"
		/>
		<ul v-if="openSuggestion" class="dropdown-menu" style="width: 100%">
			<li
				v-for="suggestion in matches.slice(0,5)"
				v-bind:class="{ active: isActive($index) }"
				v-on:click="suggestionClick($index)"
                v-bind:key="suggestion"
			>
				<button v-on:click="select_suggestion(suggestion)">{{ suggestion }}</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
    props: {
        suggestions: {
            type: Array,
            required: true
        },
        selection: {
            type: String,
            required: true,
            twoWay: true
        }
    },
	methods: {
        // select_suggestion(suggestion){
        //     selection = suggestion
        // },
		//When enter pressed on the input
		enter() {
			this.selection = this.matches[this.current];
			this.open = false;
		},

		//When up pressed while suggestions are open
		up() {
			if (this.current > 0) this.current--;
		},

		//When up pressed while suggestions are open
		down() {
			if (this.current < this.suggestions.length - 1) this.current++;
		},

		//For highlighting element
		isActive(index) {
			return index === this.current;
		},

		//When the user changes input
		change() {
			if (this.open == false) {
				this.open = true;
				this.current = 0;
			}
		},

		//When one of the suggestion is clicked
		suggestionClick(index) {
			this.selection = this.matches[index];
			this.open = false;
		},
	},
	data() {
		return {
			open: false,
            current: 0,
            
		};
	},

	computed: {
		//Filtering the suggestion based on the input
		matches() {
			return this.suggestions.filter((str) => {
				return str.indexOf(this.selection) >= 0;
			});
		},

		//The flag
		openSuggestion() {
			return (
				this.selection !== "" &&
				this.matches.length != 0 &&
				this.open === true
			);
		},
	},
};
</script>

<style>
</style>