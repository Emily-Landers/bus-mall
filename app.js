'use strict'
const totalImages = [];
const totalClicks = 0;

function Image(url, name){
    this.name = name; 
    this.clicks = 0;
    this.timesShown = 0;
    this.url = 'assets/images/${url}';
    totalImages.push(this);
}
//render image 
let babymaid = document.getElementById(idname);
