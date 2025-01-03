const valorantApi = 'https://valorant-api.com/v1/bundles'
const bundlesContainer = document.querySelector('.bundle-container');

async function getBundles() {
    try{
        const response= await fetch(valorantApi);
        const data = await response.json();
        console.log(data.data)

        for(i = 0; i < data.data.length; i++){
            actualBundle = data.data[i];
            console.log(actualBundle.displayName)
            console.log(actualBundle.displayIcon)

            createBundleElements(actualBundle.displayName,"$99.99", actualBundle.displayIcon)
        }

    }catch(error){
        console.log(error)
    }
}

function createBundleElements(name, price, imagesrc){
    const Card = document.createElement('div');
    Card.classList.add('bundle-card');

    const CardImage = document.createElement('img');
    CardImage.src = imagesrc;

    const CardTitle = document.createElement('h3');
    CardTitle.textContent = name;

    const CardPrice = document.createElement('p');
    CardPrice.textContent = price;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('description');

    cardDescription.appendChild(CardTitle);
    cardDescription.appendChild(CardPrice);

    Card.appendChild(CardImage);
    Card.appendChild(cardDescription);

    bundlesContainer.appendChild(Card);
}

getBundles();