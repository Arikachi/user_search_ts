import {fetchUser} from './api';
import {renderUser, showLoading, showError, clearStatus, renderHistory} from './ui';
import {getHistory, saveSearch} from './storage';
import "./style.css";

function query<T extends HTMLElement>(selector: string): T {
    const el = document.querySelector<T>(selector);
    if (el === null) throw new Error(`${selector} not found`);
    return el;
}

const form = query<HTMLFormElement>("#search-form");
const input = query<HTMLInputElement>("#input");
const button = query<HTMLButtonElement>(".submit");
const historyList = query<HTMLUListElement>("#history");

window.addEventListener("load", () => {
    renderHistory(getHistory());
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = input.value.trim();
    if (!username) return;

    search(username);
});

historyList.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const li = event.target.closest("li");
    if (li === null) return;
    const username = li.dataset.username;
    if (username === undefined) return;
    input.value = username;
    search(username);
});

async function search(username: string){
    if (button.disabled) return;
    clearStatus();
    showLoading();
    button.disabled = true;

    try{
        const user = await fetchUser(username);
        clearStatus();
        renderUser(user);

        const historyData = saveSearch(user.login);
        renderHistory(historyData);
    }catch(err){
        const result = document.getElementById("result");
        if(result === null) return;
        result.replaceChildren();
        const message = err instanceof Error ? err.message : "Something went wrong";
        showError(message);
    }finally{
        button.disabled = false;
    }
}