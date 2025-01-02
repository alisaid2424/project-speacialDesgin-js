//add toggle to settings
document
  .querySelector(".toggle-sitting .fa-star ")
  .addEventListener("click", function () {
    this.classList.toggle("fa-spin");

    document.querySelector(".sitting-box").classList.toggle("open");
  });

//Handle active state
function HandleActive(ev) {
  // remove class active all li's
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // add class active on current element
  ev.target.classList.add("active");
}

//switch colors option
let colorLis = document.querySelectorAll(".list-option li");
if (window.localStorage.getItem("colors-option")) {
  // change main-color by root
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("colors-option")
  );

  // remove class active all li's
  colorLis.forEach((li) => {
    li.classList.remove("active");
  });

  document
    .querySelector(
      `[data-color="${window.localStorage.getItem("colors-option")}"]`
    )
    .classList.add("active");
}
colorLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    //console.log(e.target.dataset.color);
    HandleActive(e);

    // change main-color by root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    //add main-color by localStorage
    window.localStorage.setItem("colors-option", e.target.dataset.color);
  });
});

////////switch backgrounds option:
let backgroundOption = true;
// control variable to background-option
let backgroundInterval;
// selecet all back-random span
let backRanSpan = document.querySelectorAll(".back-random span");

if (localStorage.getItem("backgrond_option")) {
  if (localStorage.getItem("backgrond_option") === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove class active all li's
  backRanSpan.forEach((span) => {
    span.classList.remove("active");
  });

  // add class active on current element
  document
    .querySelector(
      `[data-background="${localStorage.getItem("backgrond_option")}"]`
    )
    .classList.add("active");
}
// loop on all span
backRanSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    HandleActive(e);

    if (e.target.dataset.background === "true") {
      backgroundOption = true;
      controlBackImage();
      localStorage.setItem("backgrond_option", e.target.dataset.background);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("backgrond_option", e.target.dataset.background);
    }
  });
});
function controlBackImage() {
  if (backgroundOption === true) {
    // select landing page
    let landingPage = document.querySelector(".landing-page");

    //get Array imgs landing-page
    let arrayImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * arrayImgs.length);
      // change background landing-page
      landingPage.style.backgroundImage =
        'url("imgs/' + arrayImgs[randomNumber] + '")';
    }, 10000);
  }
}
controlBackImage();

let galleryImg = document.querySelectorAll(".our-gallary .images-box img");
galleryImg.forEach((img) => {
  img.addEventListener("click", function () {
    // create popup-overlay
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);

    // create popup-box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    document.body.appendChild(popupBox);

    // create title
    if (img.alt !== null) {
      let myTitlePop = document.createElement("h3");
      myTitlePop.className = "title-popup";

      let textTitle = document.createTextNode(img.alt);
      myTitlePop.appendChild(textTitle);

      popupBox.appendChild(myTitlePop);
    }

    // create img
    let imgPop = document.createElement("img");
    imgPop.className = "img-pop";
    imgPop.src = img.src;
    popupBox.appendChild(imgPop);

    // create button close
    let buttonClose = document.createElement("span");
    buttonClose.className = "btn-close";
    let btnText = document.createTextNode("X");
    buttonClose.appendChild(btnText);
    popupBox.appendChild(buttonClose);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className === "btn-close") {
    e.target.parentNode.remove();

    document.querySelector(".popup-overlay").remove();
  }
});

let mybullets = document.querySelectorAll(".nav-bullets .bullet");
let myLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(mybullets);
scrollToSomeWhere(myLinks);

let spanBullets = document.querySelectorAll(".bullets-option span");
let containerBullets = document.querySelector(".nav-bullets");
if (localStorage.getItem("bullets-option")) {
  //remove class active from all span
  spanBullets.forEach((span) => {
    span.classList.remove("active");
  });

  // Add class active on current target
  document
    .querySelector(
      `[ data-display="${localStorage.getItem("bullets-option")}"]`
    )
    .classList.add("active");

  //controel on container-nav-bullets from bullets-option
  containerBullets.style.display = localStorage.getItem("bullets-option");
}
spanBullets.forEach((span) => {
  span.addEventListener("click", (e) => {
    HandleActive(e);

    //Add bullets-option in localStorage
    localStorage.setItem("bullets-option", e.target.dataset.display);

    //controel on container-nav-bullets from bullets-option
    containerBullets.style.display = e.target.dataset.display;
  });
});

//reset all page
document.querySelector(".reset-option").onclick = function () {
  /* localStorage.clear(); */
  localStorage.removeItem("colors-option");
  localStorage.removeItem("backgrond_option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
};

// Add toggle-menu
let btnMenu = document.querySelector(".toggle-menu");
let LinksBt = document.querySelector(".links");

btnMenu.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");
  LinksBt.classList.toggle("open");
};

LinksBt.onclick = (e) => e.stopPropagation();

document.addEventListener("click", (e) => {
  if (e.target !== btnMenu && e.target !== LinksBt) {
    if (LinksBt.classList.contains("open")) {
      btnMenu.classList.toggle("menu-active");
      LinksBt.classList.toggle("open");
    }
  }
});

let ourSkills = document.querySelector(".skills");
// scrooler width
let el = document.querySelector(".scloorer");

let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

// button Scrooler
let btnScrooler = document.querySelector(".btn-scrool");

window.onscroll = function () {
  //1
  let scroolTop = document.documentElement.scrollTop;
  el.style.width = `${(scroolTop / height) * 100}%`;

  //2
  if (window.scrollY >= 700) {
    btnScrooler.style.display = "block";
  } else {
    btnScrooler.style.display = "none";
  }

  //3
  let skillSpan = document.querySelectorAll(".skill-progress span");
  if (
    this.scrollY >=
    ourSkills.offsetTop + ourSkills.offsetHeight - this.innerHeight
  ) {
    skillSpan.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  } else {
    skillSpan.forEach((span) => {
      span.style.width = 0;
    });
  }
};
//2
btnScrooler.addEventListener("click", function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});


document.querySelector(".footer .date").innerHTML = new Date().getFullYear();
