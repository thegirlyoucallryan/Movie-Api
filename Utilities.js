const debounce = (func, delay = 450) =>{
    let timeOut;
    return (...args) => {
        if(timeOut){
            clearTimeout(timeOut);
        }

        timeOut = setTimeout(() => {
            func.apply(null, args)
        }, delay);

    };

};  