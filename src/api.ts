export interface GitHubUser {
    login: string,
    name: string | null,
    avatar_url: string,
    followers: number,
    bio: string | null,
    html_url: string,
    public_repos: number
}

export async function fetchUser(username: string): Promise<GitHubUser>{
    const encodedUsername = encodeURIComponent(username);
    const url = `https://api.github.com/users/${encodedUsername}`;
    let res: Response;
    try{
        res = await fetch(url);
    }catch(err){
        throw new Error("No network connection.");
    }
    if (!res.ok){
        if(res.status === 404){
            throw new Error("User not found");    
        }else if(res.status === 403){
            throw new Error("Rate limit reached, try again later");
        }else{
            throw new Error("An error has occurred");
        }
    }
    const userData = await res.json();
    return userData;
}