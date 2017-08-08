const transactions = require('../models/transactions');

module.exports = {
	getTransactions: function(req, res, next) {
		console.log('Request to get transactions made')
		res.status(200).send(transactions)
	},

	addTransaction: function(req, res, next) {
		let newTransaction = {
			id: transactions[transactions.length-1].id + 1,
			date: req.body.date,
			payee: req.body.payee,
			category: req.body.category,
			account: req.body.account,
			memo: req.body.memo,
			outflow: req.body.outflow,
			inflow: req.body.inflow,
			cleared: req.body.cleared
		}
		transactions.push(newTransaction);
		res.status(200).send(transactions)
	},

	updateTransaction: function(req, res, next) {
		let transactionToUpdate = transactions.find(transaction => transaction.id === req.params.id * 1);
		transactionToUpdate.id = req.body.id || transactionToUpdate.id;
		transactionToUpdate.date = req.body.date || transactionToUpdate.date;
		transactionToUpdate.payee = req.body.payee || transactionToUpdate.payee
		transactionToUpdate.category = req.body.category || transactionToUpdate.category
		transactionToUpdate.account = req.body.account || transactionToUpdate.account
		transactionToUpdate.memo = req.body.memo || transactionToUpdate.memo
		transactionToUpdate.outflow = req.body.outflow || transactionToUpdate.outflow
		transactionToUpdate.inflow = req.body.inflow || transactionToUpdate.inflow
		transactionToUpdate.cleared = req.body.cleared || transactionToUpdate.cleared
		res.status(200).send(transactions)
	},

	deleteTransaction: function(req, res, next) {
		let deleteIndex = transactions.findIndex(transaction => transaction.id === req.params.id * 1)
		transactions.splice(deleteIndex, 1)
		res.status(200).send(transactions)
	}
}