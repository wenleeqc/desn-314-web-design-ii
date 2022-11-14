const b = document.querySelector('body');
const cardFeed = document.querySelector('.card-feed');
const src = "./assets/placeholder.png";

/* 
product card template

<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
*/

function productCard() {
    const newCard = document.createElement('div');
    const newCardRowContainer = document.createElement('div');
    const newCardImgColContainer = document.createElement('div');
    const newCardBodyColContainer = document.createElement('div'); 
    const newCardBody = document.createElement('div');
    const newCardTitle = document.createElement('h5');
    const newCardText = document.createElement('p');
    const newImg = document.createElement('img');

    // product card
    newCard.classList.add('card', 'mb-3');
    newCard.style.maxWidth = '540px';
    newCardRowContainer.classList.add('row', 'g-0');

    // image container
    newCardImgColContainer.classList.add('col-md-4');
    newImg.classList.add('img-fluid', 'rounded-start');

    // set image
    newImg.src = src;
    newCardImgColContainer.append(newImg);
    

    // body container
    newCardBodyColContainer.classList.add('col-md-8');
    newCardBody.classList.add('card-body');

    // define body title
    newCardTitle.classList.add('card-title');
    newCardTitle.textContent = 'Card Title';

    // define body text
    newCardText.classList.add('card-text');
    newCardText.textContent = 'Card Description';

    // set body title and text
    newCardBody.append(newCardTitle, newCardText);
    newCardBodyColContainer.append(newCardBody);

    // set image and body
    newCardRowContainer.append(newCardImgColContainer, newCardBodyColContainer);

    // push new product card
    newCard.append(newCardRowContainer);
    cardFeed.append(newCard);
}

for(let i=0; i<5; i++) {
    productCard();
}