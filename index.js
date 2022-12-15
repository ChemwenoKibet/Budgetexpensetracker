const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const storageTransactions = JSON.parse(
    localStorage.getItem("transactions")
);

let transactions;
if (localStorage.getItem('transactions') !== null) {
  transactions = storageTransactions;
} else {
  transactions = [];
}

// Add transactions
function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('please add a text and amount');
    }else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues()
        updateLocalStorage()

        text.value = ''
        amount.value = ''
    }
}

//generate random ID
function generateID(){
    return Math.floor(Math.random() * 100000000);
}


