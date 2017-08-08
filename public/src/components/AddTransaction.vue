<template>
	<form>
		<label>Date</label>
		<input v-model="date" type="text" placeholder="Date">

		<label>Payee</label>
		<input v-model="payee" type="text" placeholder="Payee">

		<label>Category</label>
		<input v-model="category" type="text" placeholder="Category">

		<label>Account</label>
		<input v-model="account" type="text" placeholder="Account">

		<label>Memo</label>
		<input v-model="memo" type="text" placeholder="Memo">

		<label>Outflow</label>
		<input v-model="outflow" type="text" placeholder="Outflow">

		<label>Inflow</label>
		<input v-model="inflow" type="text" placeholder="Inflow">

		<label>Cleared</label>
		<input v-model="cleared" type="text" placeholder="false">

		<button @click.prevent="addNewTransaction">Submit</button>
	</form>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				date: '',
				payee: '',
				category: '',
				account: '',
				memo: '',
				outflow: '',
				inflow: '',
				cleared: false
			}
		},
		methods: {
	      addNewTransaction() {
	      	let data = {
	            date: this.date,
	            payee: this.payee,
	            category: this.category,
	            account: this.account,
	            memo: this.memo,
	            outflow: this.outflow,
	            inflow: this.inflow,
	            cleared: this.cleared
    		};
    		if (!this.date || !this.payee || !this.account ) {
    			alert("You must enter a date, payee, and account before proceeding")
    		} else {
		        axios.post('http://localhost:3000/', data).then(res => {
		        	this.$emit('addedTransaction', res.data)
		        })
		    	this.date = ''
		        this.payee = ''
		        this.category = ''
		        this.account = ''
		        this.memo = ''
		        this.outflow = ''
		        this.inflow = ''
		        this.cleared = false
    		}
	      }
	    }
	}
</script>

<style>
	
</style>