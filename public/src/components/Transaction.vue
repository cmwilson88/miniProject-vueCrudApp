<template>
	<tr>
        <td>
          <button v-if="!editing" @click="editing = true">Edit</button>
          <div v-else class="save_cancel">
          	<button @click="saveChanges(thisTransaction.id)">Save</button>
          	<button @click="editing = false">Cancel</button>
          </div>
        </td>
        <td>
          <div v-if="!editing">
          	<span>{{thisTransaction.date}}</span>
          </div>
          <div v-else>
          	<input type="text" v-model="thisTransaction.date">
          </div>
        </td>
        <td>
          <div v-if="!editing">
          	<span>{{thisTransaction.payee}}</span>
          </div>
          <div v-else>
          	<input type="text" v-model="thisTransaction.payee">
          </div>
        </td>
        <td>
          <div v-if="!editing">
          	<span>{{thisTransaction.category}}</span>
          </div>
          <div v-else>
          	<input type="text" v-model="thisTransaction.category">
          </div>
        </td>
        <td>
          <div v-if="!editing">
          	<span>{{thisTransaction.account}}</span>
          </div>
          <div v-else>
          	<input type="text" v-model="thisTransaction.account">
          </div>
        </td>
        <td>
          <div v-if="!editing">
          	<span>{{thisTransaction.memo}}</span>
          </div>
          <div v-else>
          	<input type="text" v-model="thisTransaction.memo">
          </div>
        </td>
        <td>
          <div v-if="!editing">
          	<span>{{thisTransaction.outflow}}</span>
          </div>
          <div v-else>
          	<input type="text" v-model="thisTransaction.outflow">
          </div>
        </td>
        <td>
          <div v-if="!editing">
          	<span>{{thisTransaction.inflow}}</span>
          </div>
          <div v-else>
          	<input type="text" v-model="thisTransaction.inflow">
          </div>
        </td>
        <td>
          <div v-if="!thisTransaction.cleared">
			<input type="checkbox" @click="thisTransaction.cleared = true">
          </div>
          <div v-else>
          	<input type="checkbox" @click="thisTransaction.cleared = false" checked>
          </div>
        </td>
        <td>
        	<button @click="deleteTransaction(thisTransaction.id)">Delete {{thisTransaction.id}}</button>
        </td>
    </tr>
</template>

<script>
	import axios from 'axios'
	export default {
		props: ['columns', 'transaction'],
		data() {
			return {
				editing: false,
				thisTransaction: Object.assign({}, this.transaction),
			}
		},
		watch: {
			transaction() {
				this.thisTransaction = Object.assign({}, this.transaction)
			}
		},
		methods: {
			saveChanges(id) {
				axios.put(`http://localhost:3000/transaction/${id}`, this.thisTransaction).then(res => {
					this.$emit('transactionUpdated', res.data)
					this.editing = false
				})
			},
			deleteTransaction(id) {
				axios.delete(`http://localhost:3000/transaction/${id}`).then(res => {
					this.$emit('transactionDeleted', res.data)
				})
			}
		}
	}
</script>

<style>
	.save_cancel {
		display: flex;
	}
</style>