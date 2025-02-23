document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded and parsed');
    const currentPage = window.location.pathname;

    console.log(currentPage)

    if(currentPage == '/sites/bundles.html'){
        console.log('bundles')
        getBundles();
    }else if(currentPage == '/'){
        console.log('home')
        newsSlider();
    }else if(currentPage == '/sites/playerCards.html'){
        console.log('player cards')
        getPlayerCards();
    }
})





const valorantApi = 'https://valorant-api.com/v1/bundles'
const bundlesContainer = document.querySelector('.bundle-container');
const playerCardsContainer = document.querySelector('.player-card-container');

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

async function getPlayerCards(){
    try{
        const response = await fetch('https://valorant-api.com/v1/playercards');
        const data = await response.json();

        console.log(data.data.length)
        console.log(data)

        for(i =0 ; i < 100; i++){
            actualPlayerCard = data.data[i];
            console.log(actualPlayerCard.displayName)
            console.log(actualPlayerCard.largeArt)

            createPlayerCardsElements(actualPlayerCard.displayName, actualPlayerCard.largeArt)



        }
    }catch(error){
        console.log(error)
    }
}

function newsSlider(){
    let list = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let dots = document.querySelectorAll('.slider .dots li');
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');

    let active = 0;
    let lengthItems = items.length;

    next.onclick = function(){
        if(active + 1 > lengthItems -1){
            active = 0
        }else{
            active++;
        }
        reloadSlider();

    };

    prev.onclick = function(){
        if (active - 1 < 0){
            active = lengthItems -1;
        }else{
            active--;
        }
        reloadSlider();
    }

    dots.forEach((dot, index) => {
        dot.onclick = function(){
            active = index;
            reloadSlider();
        }
    })

    function reloadSlider(){
        let checkLeft = items[active].offsetLeft;
        list.style.left = -checkLeft + 'px';

        let lastActiveDot = document.querySelector('.slider .dots li.active');
        lastActiveDot.classList.remove('active');
        dots[active].classList.add('active');
        
    }
}

function createBundleElements(name, price, imagesrc){
    const Card = document.createElement('div');
    Card.classList.add('bundle-card');

    const CardImage = document.createElement('img');
    CardImage.src = imagesrc;

    const CardTitle = document.createElement('h3');
    CardTitle.textContent = name;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('description');

    cardDescription.appendChild(CardTitle);

    Card.appendChild(CardImage);
    Card.appendChild(cardDescription);

    bundlesContainer.appendChild(Card);
}

function createPlayerCardsElements(name, img){

    const pCard = document.createElement('div');
    pCard.classList.add('player-card');

    const pCardTittle = document.createElement('h3');
    pCardTittle.textContent = name;

    const pCardImage = document.createElement('img');
    pCardImage.src = img;

    pCard.appendChild(pCardTittle);
    pCard.appendChild(pCardImage);

    playerCardsContainer.appendChild(pCard);

}

