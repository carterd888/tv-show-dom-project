const allEpisodes = getAllEpisodes();
function setup() {
  makePageForEpisodes(allEpisodes);
  getEpisodeData(allEpisodes, generateEpisodeCode);
}

function makePageForEpisodes(episodeList) {
  let rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length}/73 episode(s)`;
}

function getEpisodeData(episodeList, generateEpisodeCode) {
  let rootElem = document.getElementById("root");
  episodeList.forEach(episode => {
    let createCard = document.createElement("p");
    rootElem.appendChild(createCard);
    createCard.textContent = episode.name;

    let showCode = document.createElement("p");
    createCard.appendChild(showCode);
    showCode.textContent = generateEpisodeCode(episode.season, episode.number);


    // let seasonNum = document.createElement("p");
    // createCard.appendChild(seasonNum);
    // seasonNum.textContent = `Season: ${episode.season}`;

    // let episodeNum = document.createElement("p");
    // createCard.appendChild(episodeNum);
    // episodeNum.textContent = `Episode: ${episode.number}`;

    let imgLink = document.createElement("a");
    imgLink.href = episode.url;
    imgLink.title = "click for original data";
    createCard.appendChild(imgLink);

    let imgEl = document.createElement("img");
    imgEl.src = episode.image.medium;
    imgLink.appendChild(imgEl);

    let summaryText = document.createElement("p");
    createCard.appendChild(summaryText);
    summaryText.innerHTML = episode.summary;
  });
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
    console.log(filteredSearch);
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