const bodyParser 	= require('body-parser'),
		express 	= require('express'),
		cors 		= require('cors'),
		app			= express()

const transCtrl = require('./controllers/transactions_controller')

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../public/build`));


app.get("/", transCtrl.getTransactions)
app.post("/", transCtrl.addTransaction)

app.put("/transaction/:id", transCtrl.updateTransaction)

app.delete('/transaction/:id', transCtrl.deleteTransaction)

app.listen(3000, () => console.log('Listening on 3000'))