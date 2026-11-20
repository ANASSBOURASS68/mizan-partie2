import { request } from "./api.js";

let articlescontainer = document.getElementById("articles-container");
let searchinput = document.getElementById("search-input");
let statusfilter = document.getElementById("status-filter");

let articles = [];
async function getArticles() {
    articles = await request("/posts");

    articles = articles.map(article => {
        return {
            ...article,
            date: "2026-11-19",
            status: "Disponible",
            price: 1500
        };
    });
        displayArticles(articles);
}
getArticles()

function displayArticles(articles){
    articles.forEach((article) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title =  document.createElement("h2");
        title.classList.add("title");
        title.textContent = article.title;

        const discription =  document.createElement("p");
        discription.classList.add("discription");
        discription.textContent = article.body;

        const identifient =  document.createElement("span");
        identifient.classList.add("id");
        identifient.textContent = article.id;

        const status = document.createElement("span");
        status.classList.add("status");
        status.textContent = article.status;

        const date = document.createElement("h3");
        date.classList.add("date");
        date.textContent=article.date;

        const price = document.createElement("span");
        price.classList.add("price");
        price.textContent=article.price

        card.append(title, discription,date,status,price, identifient);
        articlescontainer.appendChild(card)
    });
}


async function getArticleById(id){
const article = await request(`/posts/${id}`);
return article;
}




function updateArticles() {
let result = [...articles];
let input = searchinput.value.toLowerCase();
result= result.filter(article =>article.title.toLowerCase().includes(input))

let selectStatus = statusfilter.value;
    if (selectStatus !== "all") {
        result = result.filter(article =>article.status === selectStatus);
    }
    articlescontainer.textContent = "";
    displayArticles(result);
}

searchinput.addEventListener("input", updateArticles);

statusfilter.addEventListener("change", updateArticles);



