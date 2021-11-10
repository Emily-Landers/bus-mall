'use strict'
let currentRound = 0

function Image(url, name){
    this.name = name; 
    this.clicks = 0;
    this.timesShown = 0;
    this.url = url;
    Image.totalImageInfo.push(this);
}

Image.totalImageInfo = [];
Image.left = null; 
Image.right = null;
Image.center = null;
//render image 

Image.prototype.render = function (side) {
    const imgElem = document.getElementById(side + '-img');
    imgElem.src = this.url;
    imgElem.alt = this.name;

    const captionElem = document.getElementById(side + '-name');
    captionElem.textcontent = this.name;

    this.timesShown += 1;
}

function getRandomItem() {
    const rand = Math.floor(Math.random() * Image.totalImageInfo.length);
    return Image.totalImageInfo[rand];
}
function pickImages() {
    const oldLeft = Image.left;
    const oldRight = Image.right;
    const oldCenter = Image.center; 

    do {
        Image.left = getRandomItem();
        if (currentRound => 25)
        break;
    } while (Image.left === oldLeft || Image.left === oldRight || Image.left === oldCenter);

    do {
        Image.right = getRandomItem();
        if (currentRound => 25)
        break;
    } while (Image.right === Image.left || Image.right === oldRight || Image.right === oldCenter);

    do {
        Image.right = getRandomItem();
        if (currentRound => 25)
        break;
    } while (Image.center=== Image.left || Image.center === Image.right || Image.center === oldRight || Image.center === oldCenter || Image.center === oldLeft);
}

function renderImages() {
    Image.left.render('left');
    Image.right.render('right');
    Image.center.render('center');
}

function populateImages () {
    new Image('Images-index/baby-maid.png', 'Baby Maid')
    new Image('Images-index/back-problems.jpg', 'Chair')
    new Image('Images-index/banana-cutter.jpg', 'Banana Cutter')
    new Image('Images-index/bathroom-entertainer.jpg', 'Bathroom Entertainment')
    new Image('Images-index/breakfast-maker.jpg', 'Breakfast Maker')
    new Image('Images-index/dog-duck.jpg', 'Dog Duck')
    new Image('Images-index/good-luck.jpg', 'Pet Sweep')
    new Image('Images-index/how-it-feels-to-chew-five-gum.jpg', 'Wine Glass')
    new Image('Images-index/nightmare-fuel.jpg', 'Meatball Bubblegum')
    new Image('Images-index/pizza-cutter.jpg', 'Pizza Cutter')
    new Image('Images-index/R2D2-Bag.jpg', 'R2D2 Bag')
    new Image('Images-index/realistic-2020-toy.jpg', 'Cthulhu')
    new Image('Images-index/shark-body-bag.jpg', 'Sleeping Bag')
    new Image('Images-index/snacky-pen.jpg', 'Snacky Pen')
    new Image('Images-index/spam-alternative.jpg', 'Fancy Spam')
    new Image('Images-index/tatooine.jpg', 'Tatooine')
    new Image('Images-index/Unicorn-meat.jpg', 'Sparkly Spam')
    new Image('Images-index/useless-boots.jpg', 'Desert Rain Boots')
    new Image('Images-index/water-can.jpg', 'Water Can')
}
function attachEventListeners() {
    const container = document.getElementById('pictures');
    container.addEventListener('click' , handleClick);

}

function stopEventListeners() {
    const container = document.getElementById('pictures');
    container.removeEventListener('click', handleClick);
}

function handleClick(event) {
    if(event.target.id === 'left-img'){
        Image.left.clicks += 1;
    } else if (event.target.id === 'right-img') {
        Image.right.clicks += 1;
    } else if (event.target.id === 'center-img'){
        Image.center.clicks += 1;
    } else {
        alert('click on one of the images please');
        return;
    }
    currentRound += 1;

    if (currentRound === 25) {
        document.getElementById('results').hidden = false;

        stopEventListeners();
        renderChart();
    } else {
        pickImages();
        renderImages();
    }

}
function renderChart(){
const imageNamesArray = [];
const imageClicksArray = [];

for (let i = 0; i < Image.totalImageInfo.length; i++){
    const img = Image.totalImageInfo[i];

    const singleImageName = img.name;
    imageNamesArray.push(singleImageName);

    const singleImageClicks = img.clicks;
    imageClicksArray.push(singleImageClicks);

    }

    const ctx = document.getElementById('results-chart').getContext('2d');
    const imgChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imageNamesArray,
            datasets: [{
                label: 'Product Votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: imageClicksArray
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}




function start() {

    attachEventListeners();
    populateImages();
    pickImages();
    renderImages();
}


/* start */
start();