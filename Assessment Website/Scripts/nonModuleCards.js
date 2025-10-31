const placeholder = {
    image: 'Styles/Media/placeholder.png',
    title: 'Placeholder Title',
    text: 'Oops! This is a placeholder card.'
};

const placeholder2 = {
    image: 'Styles/Media/placeholder.png',
    title: 'Placeholder Title 2',
    text: 'This is another placeholder card.'
};

const placeholder3 = {
    image: 'Styles/Media/placeholder.png',
    title: 'Placeholder Title 3',
    text: 'Yet another placeholder card.'
};

const placeholder4 = {
    image: 'Styles/Media/placeholder.png',
    title: 'Placeholder Title 4',
    text: 'The fourth placeholder card.'
};

const cards = [placeholder, placeholder2, placeholder3, placeholder4];
//----------------------------------------\\
//
// DIVIDER BETWEEN CARD DATA AND PROGRAM
// EXISTS BECAUSE LOCALFILESYSTEM CANNOT USE <script "type=module">
// DUE TO 'CROSS ORIGIN REQUEST SHARE'/CORS ERRORS
//
//----------------------------------------//
function displayFeaturedCard(cardsArray) {
    const randomIndex = Math.floor(Math.random() * cardsArray.length);
    const card = cardsArray[randomIndex];
    return `
        <div class="story-card">
            <h3>${card.title}</h3>
            <div class="story-content">
                <img src="${card.image}" alt="${card.title}" style="height: 75px;">
                <p>Description: ${card.text}</p>
            </div>
        </div>
    `;
}

document.getElementById('story-card').innerHTML = displayFeaturedCard(cards);