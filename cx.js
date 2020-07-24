//css for border on image library
var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = `.active-image { border: 1px solid darkgrey;
    box-shadow: none;
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
transition:.5s }`;
document.head.appendChild(style);

//remove similar items

document.querySelector("div.sidebar-wrapper").style.display = "none";

// create a side bar with all the images gallery

//get all images
let datalayerImages = DATA_LAYER.SingleProduct.media.images;
let containingDiv = document.querySelector(".image-slider-container");
let mySwiper = document.querySelector(".swiper-container").swiper;
let htmlString = " ";

let imagesArray = datalayerImages.map((el) => {
  return el.image.url;
});

//create the html
imagesArray.forEach((el, i) => {
  let id = i + 1;
  if (i === 0) {
    htmlString += `<img data-id-lib='${id}' class='image-library-item active-image' style="width:70%; cursor: pointer;" src='${el}'/>`;
  } else {
    htmlString += `<img data-id-lib='${id}'  class='image-library-item' style="width:70%; cursor: pointer;" src='${el}'/>`;
  }
});

//html to insert
let libraryHtml = `
  <div class="sidebar-wrapper">
	<div>
		<div style="display: grid;
        grid-row-gap: 20px; margin-left:22px;" class="sidebar">
      ${htmlString}
        </div>
    </div>
  </div>
  `;
//insert html into containing div
containingDiv.insertAdjacentHTML("afterbegin", libraryHtml);

//adding click actions to the side bar
document.querySelector(".sidebar").addEventListener("click", function (e) {
  var target = e.target;

  if (e.target.classList.contains("image-library-item")) {
    if (e.target.classList.contains("active-image")) {
      return;
    } else {
      document.querySelector(".active-image").classList.remove("active-image");
      target.classList.add("active-image");
      let id = target.getAttribute("data-id-lib");
      mySwiper.slideTo(id);
    }
  }
});

//click on arrow will change image lib - MUTATION OBSERVER
// Select the node that will be observed for mutations
const targetNode = document.getElementsByClassName("swiper-wrapper")[0];

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    if (
      mutation.attributeName === "class" &&
      mutation.target.classList.contains("swiper-slide")
    ) {
      let id = mySwiper.activeIndex;
      if (id > datalayerImages.length) {
        id = 1;
      }

      if (id == 0) {
        id = datalayerImages.length;
      }

      document.querySelector(".active-image").classList.remove("active-image");
      document
        .querySelector(`[data-id-lib="${id}"]`)
        .classList.add("active-image");
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
