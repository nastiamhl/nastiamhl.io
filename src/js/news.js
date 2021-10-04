let data = [];
let itemsCurrentlyVisibleCount = 0;

const fetchNews = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer'
    });

    return response.json();
}

const displayItems = (itemsCount, container) => {
    let newItemsDisplayedCount = itemsCurrentlyVisibleCount + itemsCount;
    let newNewsItems;

    if (newItemsDisplayedCount <= data.length && data.length !== 0) {
        //get from data variable
        newNewsItems = data.slice(itemsCurrentlyVisibleCount, newItemsDisplayedCount);
        itemsCurrentlyVisibleCount = newItemsDisplayedCount;
    } else if (newItemsDisplayedCount > data.length) {
        // get data that's left not displayed at the end
        newNewsItems = data.slice(itemsCurrentlyVisibleCount, data.length);
    }

    // map to html elements
    let newsItemElements = newNewsItems.map(item => generateNewsItemElement(item));
    //add to container
    newsItemElements.forEach(newsItemElement => container.appendChild(newsItemElement));
}

const generateNewsItemElement = (item) => {
    // handling title
    const newsItemElementTitleContainer = document.createElement("div");
    newsItemElementTitleContainer.classList.add("news-item__title__container");

    const newsItemElementTitleQuotes = document.createElement("div");
    newsItemElementTitleQuotes.classList.add("news-item__title__quotes");

    const newsItemElementTitle = document.createElement("div");
    newsItemElementTitle.innerText = item.title;
    newsItemElementTitle.classList.add("news-item__title");

    newsItemElementTitleContainer.appendChild(newsItemElementTitleQuotes);
    newsItemElementTitleContainer.appendChild(newsItemElementTitle);

    const newsItemElementDate = document.createElement("div");
    newsItemElementDate.innerText = new Date(item.date).toLocaleString();
    newsItemElementDate.classList.add("news-item__date");

    const newsItemElementImage = document.createElement("img");
    newsItemElementImage.src = item.image;
    newsItemElementImage.classList.add("news-item__img");

    const newsItemElementContent = document.createElement("div");
    newsItemElementContent.innerHTML = item.text;
    newsItemElementContent.classList.add("news-item__content");

    const newsItemElement = document.createElement("div");
    newsItemElement.classList.add("news-item");
    newsItemElement.classList.add("col-md-6");
    newsItemElement.classList.add("col-xs-12");
    newsItemElement.appendChild(newsItemElementTitleContainer);
    newsItemElement.appendChild(newsItemElementDate);
    newsItemElement.appendChild(newsItemElementImage);
    newsItemElement.appendChild(newsItemElementContent);

    return newsItemElement;
}

export const getNews = (url, isFirstBatch, itemsCount, container) => {
    if (isFirstBatch) {
        fetchNews(url)
            .then(news => {
                data = news;
                displayItems(itemsCount, container);
            })
            .catch(e => console.log(e));
    } else {
        displayItems(itemsCount, container);
    }
}