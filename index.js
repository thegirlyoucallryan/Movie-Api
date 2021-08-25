


const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? ' ' :  movie.Poster;
        return `
        <img src="${imgSrc}" />
       ${movie.Title} (${movie.Year})
         `;
    },
   
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {

        const response = await axios.get( "http://www.omdbapi.com/", {
            params: {
                apikey: "313897ae",
                s: searchTerm,
            }
        });
        if(response.data.Error){
            return [];
        }
       return response.data.Search;
    }
};


createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    },
  
   
});
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    },
  
   
});



let leftMovie;
let RightMovie;

const onMovieSelect = async (movie, summaryElement, side )=> {
    const response = await axios.get( "http://www.omdbapi.com/", {
        params: {
            apikey: "313897ae",
            i: movie.imdbID,
        }
    });

   
   
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left'){
      leftMovie = response.data;
     
  } else {
      RightMovie = response.data;
  }
  if(leftMovie && RightMovie) {
      
      runComparison();
  }

};


const runComparison = () => {
  const leftSummary = document.querySelectorAll('#left-summary .notification');
  const rightSummary = document.querySelectorAll('#right-summary .notification');
  const leftSide = document.querySelector('#left-summary');
  const rightSide = document.querySelector('#right-summary');


  leftSummary.forEach((leftStat, index) => {
      const rightStat = rightSummary[index];

      const leftSideValue = +leftStat.dataset.value;
      const rightSideValue = +rightStat.dataset.value;

      if(rightSideValue > leftSideValue) {
        leftSide.classList.remove('winner');
        rightSide.classList.add('winner');
        console.log(rightSideValue, leftSideValue);
    //    rightStat.classList.remove('is-primary');
    //     rightStat.classList.add('is-warning');
    //     console.log('left')
       
          
         
      } if (leftSideValue > rightSideValue) {
          rightSide.classList.remove('winner');
          leftSide.classList.add('winner');
        // leftStat.classList.remove('is-primary');
        // leftStat.classList.add('is-warning');
        // console.log('right')
      }

  });
  
};


const movieTemplate = movieDetail => {

    const dollars = +movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '');
    const score = +movieDetail.Metascore;
    const rating = +movieDetail.imdbRating;
    // const votes = +movieDetail.imdbVotes.replace(/,/g,'');
    let total = dollars + score + rating
    console.log(total)
  

    

    return `
    <article class="media">
  <figure class="media-left">
    <p class="image">
      <img src="${movieDetail.Poster}" alt="poster of chosen movie"/>

    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <h1> ${movieDetail.Title}</h1>
      <h4>${movieDetail.Genre}</h4>
      <p>${movieDetail.Plot}</p>
    </div>
  </div>
</article>
<article class="notification is-primary">
  <p class="title">
    ${movieDetail.Actors}
  </p>
  <p class="subtitle">Actors</p>
</article>
<article class="notification is-primary">
  <p class="title">
    ${movieDetail.Awards}
  </p>
  <p class="subtitle">Awards</p>
</article>
<article data-value=${total} class="notification is-primary">
  <p class="title">
    ${movieDetail.BoxOffice}
  </p>
  <p class="subtitle">Box Office</p>
</article>
<article   class="notification is-primary">
  <p class="title">
    ${movieDetail.Metascore}
  </p>
  <p class="subtitle">Metascore</p>
</article>
<article class="notification is-primary">
  <p class="title">
    ${movieDetail.imdbRating}
  </p>
  <p class="subtitle">IMDB Rating</p>
</article>
<article   class="notification is-primary">
  <p class="title">
    ${movieDetail.imdbVotes}
  </p>
  <p class="subtitle">IMDB Votes</p>
</article>
    
    `;


};