const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const firstArticle = document.querySelector("main section:nth-child(1) article:first-child");
const secondArticle = document.querySelector("main section:nth-child(1) article:nth-child(2)");
const thirdArticle = document.querySelector("main section:nth-child(1) article:last-child");
const containerText = document.querySelector("aside");
const imageContainer = document.getElementById("imageCont");
const burgerIcon = document.getElementById("burgerIcon");
const navToDisplay = document.querySelector("nav ul:last-child");

var counter = 0;
const index = "0";
const allArticle = [firstArticle, secondArticle, thirdArticle];
const images = ["./images/desktop-image-hero-1.jpg", "./images/desktop-image-hero-2.jpg", "./images/desktop-image-hero-3.jpg"];

function displayImage() {
  imageContainer.style.backgroundImage = `url(${images[counter]})`;
}

burgerIcon.addEventListener("click", () => {
  navToDisplay.classList.toggle("display");
});

function nextImage(e) {
  if (counter === 2) return e.preventDefault();
  counter++;
  displayImage();
  for (let i = 0; i < allArticle.length; i++) {
    const element = allArticle[i];

    allArticle[counter - 1].dataset.visible = "false";
    if (counter === i) {
      element.dataset.visible = "true";
    }
  }
}

function prevImage(e) {
  if (counter === 0) return e.preventDefault();
  counter--;
  displayImage();
  for (let i = 0; i < allArticle.length; i++) {
    const element = allArticle[i];

    allArticle[counter + 1].dataset.visible = "false";
    if (counter === i) {
      element.dataset.visible = "true";
    }
  }
}

prevBtn.addEventListener("click", (e) => prevImage(e));

nextBtn.addEventListener("click", (e) => nextImage(e));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    return nextImage(e);
  } else if (e.key == "ArrowLeft") {
    return prevImage(e);
  }
});
let canScroll = true;

function detectTrackPad(e) {
  if (canScroll) {
    if (e.wheelDeltaX < 0) {
      setTimeout(() => {
        return nextImage(e);
      }, 1000);
    } else if (e.wheelDeltaX > 0) {
      setTimeout(() => {
        return prevImage(e);
      }, 1000);
    }
  }
  canScroll = false;

  setTimeout(() => {
    canScroll = true;
  }, 1000);
}
document.addEventListener("mousewheel", detectTrackPad, false);
