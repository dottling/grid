//simple throttle implementation
//based of WebDevSimplified (https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/)

// how to use: create a new function that calls the throtle and pass an arrow function or a anonymous function with what you want to do.

//The idea is to avoid making too many calls of a function, like resizing for example.
function throttle(callback, delay= 250){
    let shouldWait = false;
    let waitingArgs;

    const timeoutFunc = () =>{
        //after the Timeout. shouldWait is set to false, to reset the system.
        //if there are no waiting arguments, proceed normaly
        if (!waitingArgs){
            shouldWait=false;
        }
        else{
            //if there are waiting Arguments, call the function with the waiting arguments and reset the timeout func;
            callback(waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc,delay);
            
        }
    }
    
    //returns a function with any arguments that have passed to this one;
    return (...args) =>{
        if (shouldWait) {
            console.log("I'm waiting");
            //saves the last call arguments to be called at the end.
            waitingArgs = args;
            return
        };
        console.log("Done waiting");
        //calls the callback function with the arguments passed to the parent function and sets the shouldWait to true;
        callback(...args)
        shouldWait = true;
        setTimeout(timeoutFunc,delay);
    }
}