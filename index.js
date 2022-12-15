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

//adding transactions to DOM list
function addTransactionDOM(transaction){
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;

        list.appendChild(item);
}

//update the balance, income and expense
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    
    const expense = (
        amounts.filter(item =>item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
    

    balance.innerHTML = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;    
}    

// remove transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage();
    Init();
}

//update local storage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

