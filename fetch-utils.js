const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createListItem(/*myListItem*/ item, quantity) {
    const { data, error } = await client
        .from('list_items')
        .insert([
            // two options: 1, we pass in an object as an argument
            // myListItem
            { item, quantity },
        ]);

    if (error) console.error(error);
    else return data;
}

export async function getListItems() {
    const { data, error } = await client
        .from('list_items')
        .select('*');

    if (error) console.error(error);
    else return data;
}

export async function buyItemById(id) {
    const { data, error } = await client
        .from('list_items')
        .update({ is_bought: true })
        .eq('id', id);

    if (error) console.error(error);
    else return data;     
}