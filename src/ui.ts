import type { GitHubUser } from "./api";

export function renderUser(user: GitHubUser){
    const container = document.getElementById("result");
    if (container === null) return;
    container.replaceChildren();

    const card = document.createElement("div");
    card.classList.add("card");
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const avatar = document.createElement("img");
    const name = document.createElement("h3");
    const followers = document.createElement("p");
    const bio = document.createElement("p");
    const url = document.createElement("a");
    const publicRepos = document.createElement("p");

    avatar.src = user.avatar_url;
    avatar.alt = `${user.login}'s avatar`;
    avatar.classList.add("card-img");

    name.textContent = user.name ?? user.login;
    followers.textContent = `${user.followers} followers`;
    bio.textContent = user.bio ?? "No bio";
    url.href = user.html_url;
    url.textContent = "View on GitHub";
    url.target = "_blank";
    url.rel = "noopener";
    publicRepos.textContent = `Public repos: ${user.public_repos}`;

    cardContent.append(name, followers, bio, url, publicRepos);
    card.append(avatar, cardContent);
    container.append(card);
}

export function showLoading(){
    const status = document.getElementById("status");
    if (status === null) return;
    status.textContent = "Loading...";
}

export function showError(message: string){
    const status = document.getElementById("status");
    if (status === null) return;
    status.classList.add("error");
    status.textContent = `An error has occurred: ${message}`;
}

export function clearStatus(){
    const status = document.getElementById("status");
    if (status === null) return;
    status.classList.remove("error");
    status.textContent = "";
}

export function renderHistory(list: string[]){
    const history = document.getElementById("history");
    if (history === null) return;
    history.replaceChildren();

    list.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element;
        li.dataset.username = element;
        history.append(li);
    });
}