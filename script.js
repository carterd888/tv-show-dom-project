// global variable for use in all functions, generates episodes from in file
const allEpisodes = getAllEpisodes();

// called on load, with all episode data
function setup() {
  makePageForEpisodes(allEpisodes);
  getEpisodeData(allEpisodes, generateEpisodeCode);
}

// shows blank when undefined length (used when selecting from drop down)
// shows how many episodes are in the list (used for filtering episodes with search)
function makePageForEpisodes(episodeList) {
  let rootElem = document.getElementById("root");
  if(episodeList.length === undefined) {
    rootElem.textContent = " ";
  } else {
    rootElem.innerHTML = `Got ${episodeList.length}/73 episode(s)`;
  }
}

// drop down list for episodes makes a page containing episode at specific index
let siteSelect = document.getElementById("siteSelect");
siteSelect.addEventListener("change", (event) => {
 let indexEpisode = allEpisodes[siteSelect.value];
  makePageForEpisodes(indexEpisode); 

  let rootElem = document.getElementById("root");
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
  imgEl.src = indexEpisode.image.medium;
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
    imgEl.src = episodeList[i].image.medium;
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


// calls setup when widows loads    
window.onload = setup;