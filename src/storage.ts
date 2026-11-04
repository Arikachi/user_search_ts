export function getHistory(): string[]{
    try{
        const result = JSON.parse(localStorage.getItem("history") ?? "[]");
        if (Array.isArray(result)) return result;
    }catch{
        return [];
    }
    return [];
}

export function saveSearch(name: string): string[]{
    let history = getHistory();
    history = history.filter( element => element.toLowerCase() !== name.toLowerCase());

    history.unshift(name);
    history = history.slice(0, 5);
    localStorage.setItem("history", JSON.stringify(history));
    return history;
}