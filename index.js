import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, set, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
    apiKey: "AIzaSyDhvm-yHxWDIUM06Z1m4ADQmcpUpGBrTLY",
    authDomain: "add-to-cart-7c16b.firebaseapp.com",
    databaseURL: "https://add-to-cart-7c16b-default-rtdb.asia-southeast1.firebasedatabase.app/",
    // databaseUrl: "https://add-to-cart-7c16b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "add-to-cart-7c16b",
    storageBucket: "add-to-cart-7c16b.appspot.com",
    // appId: '1:1024520095477:web:6b0e4c8f0f7a3e5e3e4b3c'
}

//Database Initialization
console.log('initializeApp - appSettings');
const app = initializeApp(appSettings);
console.log(app);

console.log('getDatabase - app')
const database = getDatabase(app);
console.log(database);

console.log('shoppinglist in database')
const shoppingListInDB = ref(database, 'shoppingList');
console.log(shoppingListInDB)


const addBtn = document.getElementById('add-button');
const inputField = document.getElementById('input-field');
const shoppingList = document.getElementById('shopping-list');

//Pushing Items on the Database
addBtn.addEventListener('click', () => {
    let inputValue = inputField.value;

    push(shoppingListInDB, inputValue);

    clearInputField();

})

//Fetching Items on the Database
onValue(shoppingListInDB, (snapshot) => {

    if (snapshot.exists()) {
        clearShoppingList();
        // let itemsArray = Object.values(snapshot.val());
        // 2D Array
        let itemsArray = Object.entries(snapshot.val());

        console.log('This is the Items Array');
        console.log(itemsArray);
        
        for (let i = 0; i < itemsArray.length; i++) {

            let currentItem = itemsArray[i];
            console.log('This is the Current Items');
            console.log(currentItem);

            let currentItemID = currentItem[0];
            console.log('This is the Current Items ID');
            console.log(currentItemID);
            let currentItemValue = currentItem[1];
            console.log('This is the Current Items Value');
            console.log(currentItemValue);

            addItemToShoppingList(currentItem);
            // addItemToShoppingList(itemsArray[i])
        }
    } else {
        shoppingList.innerHTML = 'No items added yet...';
    }
    
})

function clearShoppingList(){
    shoppingList.innerHTML = '';
}

function clearInputField(){
    inputField.value = '';
}

function addItemToShoppingList(item){
    let itemID = item[0]
    let itemValue = item[1]
    let li = document.createElement('li');
    li.tabIndex = 0;
    li.textContent = itemValue;

    li.addEventListener('dblclick', () => {
        let exactLocationInDB = ref(database, 'shoppingList/' + itemID);
        remove(exactLocationInDB);
    })
    shoppingList.appendChild(li);
}
