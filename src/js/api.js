const BASE_URL = "https://jsonplaceholder.typicode.com";
export async function request(path) {
    try{
        const res = await fetch(BASE_URL + path);
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log(error.message);

    }
}


