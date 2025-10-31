//----------------------------------------\\
//
// FILE DEPRECATED BECAUSE LOCALFILESYSTEM CANNOT USE <script "type=module">
// DUE TO 'CROSS ORIGIN REQUEST SHARE'/CORS ERRORS
//
//----------------------------------------//
import {cards} from './story-cards.js';

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