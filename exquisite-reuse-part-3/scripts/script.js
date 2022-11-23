const cardFeed = document.querySelector('.card-feed');
const src = "./assets/placeholder.png";

$( function() {
  $( ".datepicker" ).datepicker();
} );

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

// build product card
function productCard(auctionNo=0, lot=0, title='Card Title', description='Card Description', startBid=0, auctionDate="00/00/0000") {
    const newCard = document.createElement('div');
    const newCardRowContainer = document.createElement('div');
    const newCardImgColContainer = document.createElement('div');
    const newCardBodyColContainer = document.createElement('div'); 
    const newCardBody = document.createElement('div');
    const newCardTitle = document.createElement('h5');
    const newCardAuctioLotNo = document.createElement('p');
    const newCardAuctionDate = document.createElement('p');
    const newCardBid = document.createElement('p');
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
    newCardTitle.textContent = title;

    // define auction and lot number
    newCardAuctioLotNo.classList.add('card-title', 'lot', 'text-secondary');
    newCardAuctioLotNo.textContent = `Auction No. ${auctionNo}, Lot No. ${lot}`;

    // define auction date
    newCardAuctionDate.classList.add('card-text');
    newCardAuctionDate.textContent = `Auction Date: ${auctionDate}`;

    // define starting bid and auction date
    newCardBid.classList.add('card-text');
    newCardBid.textContent = `Starting Bid: ${startBid}`;

    // set body title and text
    newCardBody.append(newCardTitle, newCardAuctioLotNo, newCardAuctionDate, newCardBid);
    newCardBodyColContainer.append(newCardBody);

    // set image and body
    newCardRowContainer.append(newCardImgColContainer, newCardBodyColContainer);

    // push new product card
    newCard.append(newCardRowContainer);
    cardFeed.append(newCard);
}

// filter auction listings
function filterAuctions(formAucNum="", formLotNum="", formMinBid="", formMaxBid="", formStartDate="", formEndDate="") {
  fetch('auction_json.json')
  .then( (response) => response.json())
  .then( (data) => {
    for(entry of data) {
        const {auctionNo, lot, title, description, startBid, auctionDate} = entry;

        // check criteria
        const aucNum = hasValue(formAucNum) ? formAucNum === auctionNo : true;

        const lotNum = hasValue(formLotNum) ? formLotNum === lot : true;
        const bid = hasValue(formMinBid) && hasValue(formMaxBid)
          ? (parseInt(formMinBid) <= parseInt(startBid)) && (parseInt(formMaxBid) >= parseInt(startBid))
          : true;

        const aucDate = hasValue(formStartDate) && hasValue(formEndDate)
          ? (Date.parse(formStartDate) <= Date.parse(auctionDate)) && (Date.parse(formEndDate) >= Date.parse(auctionDate))
          : true;

        if(aucNum && lotNum && bid && aucDate)
          productCard(auctionNo, lot, title, description, startBid, auctionDate);
    }
  });
}

// utility function to check if form field has value
function hasValue(data) {
  return data !== "";
}

// get data from filter fields
const formDataAuctionNumber = document.querySelector('#auction-number');
const formDataLotNumber = document.querySelector('#lot-number');
const formDataMinBid = document.querySelector('#min-bid');
const formDataMaxBid = document.querySelector('#max-bid');
const formDataStartDate = document.querySelector('#start-date');
const formDataEndDate = document.querySelector('#end-date');
const submit = document.querySelector('#submit');
const reset = document.querySelector('#reset');

// parse filter fields
submit.addEventListener('click', () => { 
  cardFeed.innerHTML = "";
  filterAuctions(formDataAuctionNumber.value, formDataLotNumber.value, formDataMinBid.value, formDataMaxBid.value, formDataStartDate.value, formDataEndDate.value);
});

// clear filter fields
reset.addEventListener('click', () => {
  const formData = document.querySelectorAll('.form-data');
  for (data of formData) {
    data.value = "";
  }
});

filterAuctions();