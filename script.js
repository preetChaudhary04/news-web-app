const URL = "https://newsapi.org/v2/everything?q=";
const KEY = "1b7fd7a4e3bd42e8938aebf4383650d6" /*"40ed94f5d4d84d6ab233dd3c5f02bae8"*/;
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const searchDetails = document.getElementById("search-details");

function reload() {
    window.location.reload();
}

let cardContent = document.getElementById("card-content");

// getting articles in json format

const getData = async (querry) => {
    let rawData = await fetch(`${URL}${querry}&apiKey=${KEY}`);
    let jsonData = await rawData.json();

    // making the previos search empty

    searchBar.value = "";
    cardContent.innerHTML = "";

    // creating cards 

    jsonData.articles.forEach((article) => {
        if (article.urlToImage == null || article.description == null || article.title == null) return;

        let div = document.createElement("div");
        div.classList.add("card");
        cardContent.appendChild(div);

        let date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        })

        div.innerHTML = `
        <img src="${article.urlToImage}" alt="newsImage">
        <h3>${article.title}</h3>
        <h6>Source: ${article.source.name} · ${date}</h6>
        <p>${article.description}</p>`

        div.addEventListener("click", () => {
            window.open(article.url);
        })
    });
}

// default search: India

window.addEventListener("load", () => {
    getData("India");
})

// search button functionality

searchButton.addEventListener("click", () => {
    if (!searchBar.value) return;
    getData(searchBar.value);
    currentSelectedNav?.classList.remove("active");
})

// nav options functionality

let currentSelectedNav = null;
function showOptions(id) {
    getData(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active");
}