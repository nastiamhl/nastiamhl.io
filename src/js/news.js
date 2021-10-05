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

const toggleNewsLoading = (newsLoadMoreElement, loadingElement) => {
    newsLoadMoreElement.classList.toggle('hidden');
    loadingElement.classList.toggle('hidden');
}

const hideNewsLoadingElements = (newsLoadMoreElement, loadingElement) => {
    !newsLoadMoreElement.classList.contains('hidden') && newsLoadMoreElement.classList.add('hidden');
    !loadingElement.classList.contains('hidden') && loadingElement.classList.add('hidden');
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
    //header container
    const newsItemElementHeaderContainer = document.createElement("div");
    newsItemElementHeaderContainer.classList.add("news-item__header__container");
    newsItemElementHeaderContainer.classList.add("row");
    newsItemElementHeaderContainer.classList.add("g-0");

    // title container
    const newsItemElementTitleContainer = document.createElement("div");
    newsItemElementTitleContainer.classList.add("news-item__title__container");
    newsItemElementTitleContainer.classList.add("col-md-12");
    newsItemElementTitleContainer.classList.add("col-7");

    // title quotes
    const newsItemElementTitleQuotes = document.createElement("div");
    newsItemElementTitleQuotes.classList.add("news-item__title__quotes");

    //title text
    const newsItemElementTitle = document.createElement("div");
    newsItemElementTitle.innerText = item.title;
    newsItemElementTitle.classList.add("news-item__title");

    //adding quotes and text to title container
    newsItemElementTitleContainer.appendChild(newsItemElementTitleQuotes);
    newsItemElementTitleContainer.appendChild(newsItemElementTitle);

    //date
    const newsItemElementDate = document.createElement("div");
    newsItemElementDate.innerText = "Data dodania: " + new Date(item.date).toLocaleString();
    newsItemElementDate.classList.add("news-item__date");

    //image container
    const newsItemElementImageContainer = document.createElement("div");
    newsItemElementImageContainer.classList.add("news-item__img");
    newsItemElementImageContainer.classList.add("col-md-12");
    newsItemElementImageContainer.classList.add("col-5");

    //image
    const newsItemElementImage = document.createElement("img");
    newsItemElementImage.classList.add("img-fluid");
    newsItemElementImage.src = item.image;

    //add image to image container
    newsItemElementImageContainer.appendChild(newsItemElementImage);

    //adding title container, date & image to header container
    newsItemElementHeaderContainer.appendChild(newsItemElementTitleContainer);
    newsItemElementHeaderContainer.appendChild(newsItemElementDate);
    newsItemElementHeaderContainer.appendChild(newsItemElementImageContainer);

    //content
    const newsItemElementContent = document.createElement("div");
    newsItemElementContent.innerHTML = item.text.toString().replaceAll("<br>", '').replaceAll("<br/>", '');
    newsItemElementContent.classList.add("news-item__content");

    const newsItemElement = document.createElement("div");
    newsItemElement.classList.add("news-item");
    newsItemElement.classList.add("col-md-6");
    newsItemElement.classList.add("col-12");
    newsItemElement.appendChild(newsItemElementHeaderContainer);
    newsItemElement.appendChild(newsItemElementContent);

    return newsItemElement;
}

export const getNews = (url, isFirstBatch, itemsCount, container, newsLoadMoreElement, loadingElement) => {
    toggleNewsLoading(newsLoadMoreElement, loadingElement);
    if (isFirstBatch) {
        fetchNews(url)
            .then(news => {
                data = news;
                displayItems(itemsCount, container, newsLoadMoreElement, loadingElement);
                //setTimeout() for the sake of showing loader a little more - presentation purposes
                if (itemsCurrentlyVisibleCount >= data.length) hideNewsLoadingElements(newsLoadMoreElement, loadingElement)
                else toggleNewsLoading(newsLoadMoreElement, loadingElement);

            })
            .catch(e => {
                console.log(e);
                //setTimeout() for the sake of showing loader a little more - presentation purposes
                setTimeout(function () {
                    toggleNewsLoading(newsLoadMoreElement, loadingElement);
                }, 1000);
            });
    } else {
        displayItems(itemsCount, container);
        //setTimeout() for the sake of showing loader a little more - presentation purposes
        setTimeout(function () {
            if (itemsCurrentlyVisibleCount >= data.length) hideNewsLoadingElements(newsLoadMoreElement, loadingElement)
            else toggleNewsLoading(newsLoadMoreElement, loadingElement);
        }, 1000);
    }
}