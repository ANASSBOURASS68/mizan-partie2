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


searchinput.addEventListener("input", function() {
    let input = searchinput.value;
    let result = articles.filter(article =>article.title.includes(input.toLowerCase()))
    articlescontainer.textContent = "";
    displayArticles(result);
});


