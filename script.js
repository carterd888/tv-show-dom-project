// global variable for use in all functions, generates episodes from in file
// const allEpisodes = getAllEpisodes();
let allEpisodes;
let allShows = getAllShows();
let url;

function getAllEpis(url) {
debugger;
  fetch(url)
  .then(
    response => 
       response.json())
       .then(data =>
        allEpisodes = data
        )
    .catch( error => 
    console.error(error)
  );  
  // console.log("all episodes are", allEpisodes);
  
} 

// called on load, with all episode data
function setup() {
  displayAllShows(allShows);
  // await getAllEpis(url);
  // makePageForEpisodes(allEpisodes);
  // getEpisodeData(allEpisodes, generateEpisodeCode);
}

function displayAllShows(episodeList) {
   let rootElem = document.getElementById("root");

  for(let i = 0; i < episodeList.length; i++) {
   
    let createCard = document.createElement("div");
    createCard.classList.add("card");
    rootElem.appendChild(createCard);
    let nameEl = document.createElement("p");
    createCard.appendChild(nameEl);
    nameEl.textContent = episodeList[i].name;

    let imgLink = document.createElement("a");
    imgLink.href = episodeList[i].url;
    imgLink.title = "click for original data";
    nameEl.appendChild(imgLink);

    let imgEl = document.createElement("img");
    if (episodeList[i].image === null) {
      imgEl.src =
        "https://tvguide1.cbsistatic.com/www/img/tvg-showcard-placeholder.jpg";
    } else {
      imgEl.src = episodeList[i].image.medium;
    }
    imgLink.appendChild(imgEl);

    let genres = document.createElement("p");
    nameEl.appendChild(genres);
    genres.textContent = `Genres: ${episodeList[i].genres}`;

    let status = document.createElement("p");
    genres.appendChild(status);
    status.textContent = `Status: ${episodeList[i].status}`;

    let rating = document.createElement("p");
    status.appendChild(rating);
    rating.textContent = `Average Rating: ${episodeList[i].rating.average}`;

    let runtime = document.createElement("p");
    rating.appendChild(runtime);
    runtime.textContent = `Runtime: ${episodeList[i].runtime}`;

     let summaryText = document.createElement("p"); // append last
     runtime.appendChild(summaryText);
     summaryText.innerHTML = episodeList[i].summary;
     summaryText.style.fontStyle = "italic";
     summaryText.style.marginInlineStart = "0px";
     summaryText.style.marginInlineEnd = "0px";
}};


// shows blank when undefined length (used when selecting from drop down)
// shows how many episodes are in the list (used for filtering episodes with search)
function makePageForEpisodes(episodeList) {
  let rootElem = document.getElementById("root");
  // rootElem.innerHTML = `Got ${episodeList.length}/${allEpisodes.length}`;
}

// drop down list for episodes makes a page containing episode at specific index
let siteSelect = document.getElementById("siteSelect");

function clearDropdown (dropdownElement) {
    while (dropdownElement.options.length > 0) {                
        dropdownElement.remove(0);
    }        
}

siteSelect.addEventListener("change", (event) => {
  
 let indexEpisode = allEpisodes[siteSelect.value];
  // makePageForEpisodes(indexEpisode); 

  let rootElem = document.getElementById("root");
  rootElem.textContent = " ";
  let createCard = document.createElement("div");
  createCard.classList.add("card");
  let nameEl = document.createElement("p");
  rootElem.appendChild(createCard);
  createCard.appendChild(nameEl);
  nameEl.textContent = indexEpisode.name;

  let showCode = document.createElement("p");
  nameEl.appendChild(showCode);
  showCode.textContent = generateEpisodeCode(indexEpisode.season, indexEpisode.number);

  let imgLink = document.createElement("a");
  imgLink.href = indexEpisode.url;
  imgLink.title = "click for original data";
  nameEl.appendChild(imgLink);

  let imgEl = document.createElement("img");
  if (indexEpisode[i].image === null) {
    imgEl.src =
      "https://tvguide1.cbsistatic.com/www/img/tvg-showcard-placeholder.jpg";
  } else {
    imgEl.src = indexEpisode[i].image.medium;
  }
  imgLink.appendChild(imgEl);

  let summaryText = document.createElement("p");
  nameEl.appendChild(summaryText);
  summaryText.innerHTML = indexEpisode.summary;
  summaryText.style.fontStyle = "italic";
  summaryText.style.margin = "0%";
  summaryText.style.marginInlineStart = "0px";
  summaryText.style.marginInlineEnd = "0px";

  let showAllButton = document.createElement("button");
  rootElem.appendChild(showAllButton);
  showAllButton.textContent = "Show all episodes";
  showAllButton.style.display = "block";
  showAllButton.style.width = "100%";
  showAllButton.addEventListener("click", (event) => {
    setup();
  })
})

// function to populate data on the page
function getEpisodeData(episodeList, generateEpisodeCode) {
  let rootElem = document.getElementById("root");

  for(let i = 0; i < episodeList.length; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `${generateEpisodeCode(episodeList[i].season, episodeList[i].number)} - ${episodeList[i].name}`;
    siteSelect.appendChild(option);
    
    let createCard = document.createElement("div");
    createCard.classList.add("card");
    rootElem.appendChild(createCard);
    let nameEl = document.createElement("p");
    createCard.appendChild(nameEl);
    nameEl.textContent = episodeList[i].name;
    

    let showCode = document.createElement("p");
    nameEl.appendChild(showCode);
    showCode.textContent = generateEpisodeCode(episodeList[i].season, episodeList[i].number);

    let imgLink = document.createElement("a");
    imgLink.href = episodeList[i].url;
    imgLink.title = "click for original data";
    nameEl.appendChild(imgLink);

    let imgEl = document.createElement("img");
if (episodeList[i].image === null) {
  imgEl.src =
    "https://tvguide1.cbsistatic.com/www/img/tvg-showcard-placeholder.jpg";
} else {
  imgEl.src = episodeList[i].image.medium;
}
    imgLink.appendChild(imgEl);

    let summaryText = document.createElement("p");
    nameEl.appendChild(summaryText);
    summaryText.innerHTML = episodeList[i].summary;
    summaryText.style.fontStyle = "italic";
    summaryText.style.marginInlineStart = "0px";
    summaryText.style.marginInlineEnd = "0px";
  };

  let originalContent = document.createElement("p");
  rootElem.appendChild(originalContent);
  originalContent.innerHTML = "Content from TVMaze.com, click image for original data";
}

// function to take season and episode and generate an episode code
function generateEpisodeCode(seasonNum, episodeNum) {
  if (seasonNum < 10) {
    seasonNum = "0" + seasonNum;
  }
  if (episodeNum < 10) {
    episodeNum = "0" + episodeNum;
  }
  return `S${seasonNum}E${episodeNum}`;
}

// search box updates every time a key is released, converts all strings to uppercase so not case sensitive
// populates a new array with episodes that contain search contents in either episode name or summary
// redraws the page using the new filtered array
  let siteSearch = document.getElementById("siteSearch");
  siteSearch.addEventListener("keyup", (event) => {
    let inputData = event.target.value;
    let filteredSearch = inputData.toUpperCase();
    let filteredEpisodes = [];
    allEpisodes.forEach(episode => {
      if (episode.name.toUpperCase().includes(filteredSearch) ||
        episode.summary.toUpperCase().includes(filteredSearch)) {
        filteredEpisodes.push(episode);
      }  
      makePageForEpisodes(filteredEpisodes); 
      getEpisodeData(filteredEpisodes, generateEpisodeCode);
    });
    })

let showSelect = document.getElementById("showSelect");
  
//   let allShowsSorted = [];
//   for (let i = 0; i < allShows.length; i++) {

// allShowsSorted.push({name: allShows[i].name, id: allShows[i].id});
//   }
// debugger;
//   allShowsSorted.sort();

//   console.log("read this", allShowsSorted);


for (let i = 0; i < allShows.length; i++) {

  let option = document.createElement("option");
  option.value = i;
  option.textContent = `${allShows[i].name}`;
  showSelect.appendChild(option);
}
showSelect.addEventListener("change", (event) => {
  clearDropdown(siteSelect);
  let show = allShows[showSelect.value];
  url = `https://api.tvmaze.com/shows/${show.id}/episodes`;
  let rootElem = document.getElementById("root");
  rootElem.textContent = " ";
 
  console.log(url);
  getAllEpis(url);

  console.log("all episodes are", allEpisodes);
  // getEpisodeData(allEpisodes, generateEpisodeCode);
  
});


//WIP CODE

     // let freeSearch = document.getElementById("freeSearch");
      // freeSearch.addEventListener("keyup", (event) => {
      //   let inputData = event.target.value;
      //   let filteredSearch = inputData.toUpperCase();
      //   let filteredShows = [];
      //   allShows.forEach((show) => {
      //     if (
      //       show.name.toUpperCase().includes(filteredSearch) ||
      //       show.genres.toUpperCase().includes(filteredSearch) ||
      //       show.summary.toUpperCase().includes(filteredSearch)
      //     ) {
      //       filteredShows.push(show);
      //     }
      //      displayAllShows(filteredShows);
      //   });
      // });


//imgLink.href =
      // "javascript:getAllEpis(`https://api.tvmaze.com/shows/${episodeList[i].id}/episodes`);";
    // imgLink.onclick = "getAllEpis(`https://api.tvmaze.com/shows/${episodeList[i].id}/episodes`);";


// function displayAllShows(episodeList) {
//    let rootElem = document.getElementById("root");

//   for(let i = 0; i < episodeList.length; i++) {
   
//     let createCard = document.createElement("div");
//     createCard.classList.add("card");
//     rootElem.appendChild(createCard);
//     let nameEl = document.createElement("p");
//     createCard.appendChild(nameEl);
//     nameEl.textContent = episodeList[i].name;

//     let imgLink = document.createElement("a");
//     imgLink.href = episodeList[i].url;
//     imgLink.title = "click for original data";
//     nameEl.appendChild(imgLink);

//     let imgEl = document.createElement("img");
//     imgEl.src = episodeList[i].image.medium;
//     imgLink.appendChild(imgEl);

//     let genres = document.createElement("p");
//     nameEl.appendChild(genres);
//     genres.textContent = `Genres: ${episodeList[i].genres}`;

//     let status = document.createElement("p");
//     genres.appendChild(status);
//     status.textContent = `Status: ${episodeList[i].status}`;

//     let rating = document.createElement("p");
//     status.appendChild(rating);
//     rating.textContent = `Average Rating: ${episodeList[i].rating.average}`;

//     let runtime = document.createElement("p");
//     rating.appendChild(runtime);
//     runtime.textContent = `Runtime: ${episodeList[i].runtime}`;

//      let summaryText = document.createElement("p"); // append last
//      runtime.appendChild(summaryText);
//      summaryText.innerHTML = episodeList[i].summary;
//      summaryText.style.fontStyle = "italic";
//      summaryText.style.marginInlineStart = "0px";
//      summaryText.style.marginInlineEnd = "0px";
// }};












// calls setup when widows loads    
window.onload = setup;