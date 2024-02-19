var len;
var results = '';
let img1path = "file:///C:/MIS421/greg-rakozy-oMpAz-DN-9I-unsplash.jpg"
let img1 ="./greg-rakozy-oMpAz-DN-9I-unsplash.jpg"

function handleOnload()
{
    let html = `
    <h1 onclick = "imageToggle()">CoffDaddy.com</h1>
    <div id="banner-container">
        <img id="banner-img" src="${img1}">
    </div>
    <input type="text" id="query" placeholder="Search..."><br />
    <div id="buttons">
        <button type="button" value="Search" onclick="apiSearch()" class="btn btn-primary">Search</button>
        <button type="button" onclick="displayCurrentTime()" class="btn btn-primary">Time</button>
    </div>
    <div id="searchResults" >

    </div>
    <div id="time" style="visibility:hidden">

    </div>`
    document.getElementById('app').innerHTML = html
}

async function imageToggle() {
    let bannerImg = document.getElementById('banner-img');
    console.log("toggle: ", bannerImg.src);
    if (bannerImg.src == img1path) {
        bannerImg.src = "./eberhard-grossgasteiger-cs0sK0gzqCU-unsplash.jpg";
    } else {
        bannerImg.src = img1;
    }
    console.log('after: ',bannerImg.src)
    
}
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
function displayCurrentTime() {
    const currentTime = getCurrentTime();
    alert('Current Time: ' + currentTime);
}
function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
    };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "f4edacbdcfa04d49b95455e8ded98eb8");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}
