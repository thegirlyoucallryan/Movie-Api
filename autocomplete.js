

const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  


    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
    
    
    `;
    
    
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const  resultsWrapper = root.querySelector('.results');
    
    
    
    const onInput = debounce ( async e => {
              let items = await  fetchData(e.target.value);    //fetch data
    
              if(!items.length){    //gets rid of ugly empty dropdown when no movies.
                dropdown.classList.remove('is-active'); 
                return;
            }
    
    
              resultsWrapper.innerHTML = '';    //clear code in dropdown menu
    
              dropdown.classList.add('is-active');  //add active class so menu opens
              for(let item of items) {        //iterate over movies
    
             
    
                const option = document.createElement('a');
                
    
                option.classList.add('dropdown-item');
                option.innerHTML = renderOption(item) ;
    
                 option.addEventListener('click', () => {
                     dropdown.classList.remove('is-active');
                     input.value = inputValue(item);
                     onOptionSelect(item);
                 })
    
    
    
                resultsWrapper.appendChild(option);//show movies
              }
              
    });
    
    
    input.addEventListener('input', onInput)
    
    document.addEventListener('click', e => {
        if(!root.contains(e.target)){
            dropdown.classList.remove('is-active');
        }
    });

}