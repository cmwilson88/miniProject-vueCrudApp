<template>
  <div id="app">
    <div>
      <app-add-transaction @addedTransaction="addTransaction"></app-add-transaction>
      <h1>Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>Edit</th>
            <th v-for="key in columns" :class="['table_'+key]">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <app-transaction 
            v-for="transaction in transactions" 
            :columns="columns" 
            :transaction="transaction" 
            key="transaction.id"
            @transactionDeleted="deleteTransaction"
            @transactionUpdated="updateTransaction"></app-transaction>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Transaction from './components/Transaction.vue'
import AddTransaction from './components/AddTransaction.vue'

  export default {
    data() {
      return {
        columns: ['date', 'payee', 'category', 'account', 'memo', 'outflow', 'inflow', 'cleared'],
        transactions: []
      }
    },
    components: {
      appTransaction: Transaction,
      appAddTransaction: AddTransaction
    },
    methods: {
      addTransaction(data) {
        this.transactions = data
      },
      updateTransaction(data) {
        this.transactions = data
      },
      deleteTransaction(data) {
        this.transactions = data
      }
    },
    created() {
      axios.get('http://localhost:3000/').then(res => this.transactions = res.data)
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .table_date {
    width: 5%; 
  }

  .table_payee {
    width: 15%;
  }

  .table_category {
    width: 15%;
  }

  .table_account {
    width: 15%;
  }

  .table_memo {
    width: 25%;
  }

  .table_outflow {
    width: 10%;
  }

  .table_inflow {
    width: 10%;
  }

  .table_cleared {
    width: 5%;
  }
</style>
