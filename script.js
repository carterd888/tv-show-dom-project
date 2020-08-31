const allEpisodes = getAllEpisodes();
function setup() {
  makePageForEpisodes(allEpisodes);
  getEpisodeData(allEpisodes, generateEpisodeCode);
}

function makePageForEpisodes(episodeList) {
  let rootElem = document.getElementById("root");
  if(episodeList.length === undefined) {
    rootElem.textContent = " ";
  } else {
    rootElem.textContent = `Got ${episodeList.length}/73 episode(s)`;
  }
}

let siteSelect = document.getElementById("siteSelect");
siteSelect.addEventListener("change", (event) => {
 let indexEpisode = allEpisodes[siteSelect.value];
  makePageForEpisodes(indexEpisode); 

  let rootElem = document.getElementById("root");
  let createCard = document.createElement("p");
  rootElem.appendChild(createCard);
  createCard.textContent = indexEpisode.name;

  let showCode = document.createElement("p");
  createCard.appendChild(showCode);
  showCode.textContent = generateEpisodeCode(indexEpisode.season, indexEpisode.number);

  let imgLink = document.createElement("a");
  imgLink.href = indexEpisode.url;
  imgLink.title = "click for original data";
  createCard.appendChild(imgLink);

  let imgEl = document.createElement("img");
  imgEl.src = indexEpisode.image.medium;
  imgLink.appendChild(imgEl);

  let summaryText = document.createElement("p");
  createCard.appendChild(summaryText);
  summaryText.innerHTML = indexEpisode.summary;

  let showAllButton = document.createElement("button");
  rootElem.appendChild(showAllButton);
  showAllButton.textContent = "Show all episodes";
  showAllButton.addEventListener("click", (event) => {
    setup();
  })
})

function getEpisodeData(episodeList, generateEpisodeCode) {
  let rootElem = document.getElementById("root");

  for(let i = 0; i < episodeList.length; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `${generateEpisodeCode(episodeList[i].season, episodeList[i].number)} - ${episodeList[i].name}`;
    siteSelect.appendChild(option);
    
    let createCard = document.createElement("p");
    rootElem.appendChild(createCard);
    createCard.textContent = episodeList[i].name;

    let showCode = document.createElement("p");
    createCard.appendChild(showCode);
    showCode.textContent = generateEpisodeCode(episodeList[i].season, episodeList[i].number);

    let imgLink = document.createElement("a");
    imgLink.href = episodeList[i].url;
    imgLink.title = "click for original data";
    createCard.appendChild(imgLink);

    let imgEl = document.createElement("img");
    imgEl.src = episodeList[i].image.medium;
    imgLink.appendChild(imgEl);

    let summaryText = document.createElement("p");
    createCard.appendChild(summaryText);
    summaryText.innerHTML = episodeList[i].summary;
  };
  let originalContent = document.createElement("p");
  rootElem.appendChild(originalContent);
  originalContent.innerHTML = "Content from TVMaze.com, click image for original data";
}

function generateEpisodeCode(seasonNum, episodeNum) {
  if (seasonNum < 10) {
    seasonNum = "0" + seasonNum;
  }
  if (episodeNum < 10) {
    episodeNum = "0" + episodeNum;
  }
  return `S${seasonNum}E${episodeNum}`;
}

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

window.onload = setup;