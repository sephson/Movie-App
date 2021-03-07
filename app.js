const api_key = `33db9b524348f91f781f6b2148824656`;
// const url = ` https://api.themoviedb.org/3/search/movie?api_key=33db9b524348f91f781f6b2148824656`;
const imageUrl = `https://image.tmdb.org/t/p/w400`;

const searchInput = document.querySelector("#inputValue");
const searchBtn = document.querySelector("#searchBtn");
const movieResults = document.querySelector("#movie_results");

function movieImageTag(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img src=${imageUrl}${movie.poster_path} data-movie-id=${movie.id}/>`;
    }
  });
}

function createUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=33db9b524348f91f781f6b2148824656`;
  return url;
}
// creating a new html element to hold the returned movie
function createMovieHolder(movies) {
  const movieSection = document.createElement("div");
  movieSection.classList.add("movie");

  const movieTemplate = `<section class="section">
    ${movieImageTag(movies)}
   </section>
   <div class= "content">
   <p id="content-close">X</p>
   </div>`;

  movieSection.innerHTML = movieTemplate;
  return movieSection;
}

function createIframe(video) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 315;
  iframe.height = 300;
  iframe.allowFullscreen = true;

  return iframe;
}

// for upcoming movies

// const path = `/movie/upcoming`;
// const newUrl = `${createUrl(path)}`;

// fetch(newUrl)
//   .then((res) => {
//     res.json();
//   })
//   .then((data) => {
//     console.log(data.result.item.name);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const path = `/search/movie`;

  if (searchInput.value === "") {
    alert("input a movie to search for");
  } else {
    let inputResult = searchInput.value; //assigning the search value typed by the user to the inputResult variable
    console.log(inputResult);
  }

  //attaching the query endpoint to the url
  //   const newUrl = `${url}&query=${searchInput.value}`;
  const newUrl = `${createUrl(path)}&query=${searchInput.value}`;

  fetch(newUrl) //making request to the url of the api
    .then((res) => res.json()) //converting the response into a json file
    .then((data) => {
      // the data gotten from the url
      movieResults.innerHTML = ""; // ensures the movie result is empty, so there will be other click
      const movies = data.results;
      const movieBlock = createMovieHolder(movies);
      movieResults.appendChild(movieBlock);
      console.log(data);
      searchInput.value = ""; // makes the input box empty after a click
      // incase there is a failure in the request, the catch is responsible
    })
    .catch((error) => {
      console.log(error);
    });
});

//event delegation
document.addEventListener("click", function (event) {
  //listening for click event on the page

  const item = event.target;

  if (item.tagName.toLowerCase() === "img") {
    //targeting if the click is on the tag name img
    //the tolowercase() method changes the tagname to lower case
    console.log("movie click");

    const movieId = item.dataset.movieId;
    console.log(movieId);
    const section = item.parentElement; // selects the parent
    const content = section.nextElementSibling;
    content.classList.add("content-display");
    const path = `/movie/${movieId}videos`;
    const newUrl = `${createUrl(path)}`;

    fetch(newUrl)
      .then((res) => res.json())
      .then((data) => {
        content.innerHTML = `<p id="content-close">X</p>`;
        console.log(`videos: ${data}`);
        const videos = data.results;
        const length = videos.length > 4 ? 4 : videos.length;

        const iframeContainer = document.createElement("div"); // creating a div element

        for (i = 0; i < length; i++) {
          const video = videos[i];
          const iframe = createIframe(video);
          iframeContainer.appendChild(iframe);
          content.appendChild(iframeContainer);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (item.id === "content-close") {
    console.log("close");

    const content = item.parentElement;
    content.classList.add("xx");
  }
});
