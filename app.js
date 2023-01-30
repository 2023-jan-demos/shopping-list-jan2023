/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { buyItemById, createListItem, getListItems, getUser } from './fetch-utils.js';


/* Get DOM Elements */
const formEl = document.querySelector('form');
const sectionEl = document.querySelector('section');
const headerEl = document.querySelector('.title');
/* State */
let listItems = [];

/* Events */
formEl.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(formEl);

    // create a listItem in supabase
    await createListItem(data.get('item'), data.get('quantity'));

    fetchAndDisplayItems();

    formEl.reset();
});

window.addEventListener('load', async () => {
    fetchAndDisplayItems();
    const user = await getUser();

    headerEl.textContent = user.email;
});

/* Display Functions */

async function fetchAndDisplayItems() {
    listItems = await getListItems();

    sectionEl.textContent = '';

    listItems.forEach(item => {
        const itemEl = document.createElement('div');

        itemEl.textContent = `${item.quantity} ${item.item}`;

        if (item.is_bought) itemEl.classList.add('bought'); 
        else {
            itemEl.addEventListener('click', async () => {
                if (item)
                    await buyItemById(item.id);
    
                fetchAndDisplayItems();
            });
        }

        sectionEl.append(itemEl);
    });
}