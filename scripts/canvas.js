const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //short for context:ctx;

let gridScale = 20;

let dotRadius = 2; // make dot Related to Scale?

//Should the planes always be centered?
let xPlane = canvas.height/2;
let yPlane = canvas.width/2;

let xGap = canvas.width/(gridScale*2);
let yGap = canvas.height/(gridScale*2);

//on Init
resizeCanvas(cartesianPlaneRect.width,cartesianPlaneRect.height);

//Utility functions

function getCanvasSize(domWidth,domHeight){
    const style = window.getComputedStyle(cartesianPlane);
    
    // just in case the margins are not regular
    const marginLeft = parseInt(style.borderLeftWidth) || 0;
    const marginTop = parseInt(style.borderTopWidth) || 0;
    const marginRight = parseInt(style.borderRightWidth) || 0;
    const marginBottom = parseInt(style.borderBottomWidth) || 0;
    
    const canvasX = domWidth - (marginLeft + marginRight);
    const canvasY = domHeight - (marginTop + marginBottom);

    // console.log(canvasX,canvasY);
    return [canvasX,canvasY];    
}

//Receives the RectSize (which includes the border).
function resizeCanvas(width,height){
    if(!width || !height){
        // if no numbers are passed, or if the width and height are zero, cancels everything.
        return;
    }

    clearCanvas();
    //removes the borders from the size given
    const actualSize = getCanvasSize(width,height);
    canvas.width = actualSize[0];
    canvas.height = actualSize[1];
    
    //garantes the x y planes are always centered on canvas
    xPlane = canvas.height/2;
    yPlane = canvas.width/2;
    xGap = canvas.width/(gridScale*2)
    yGap = canvas.height/(gridScale*2)

    drawGrid();
    drawXYPlanes();
    drawDigits();
    LoadPoints();

}


// Maybe add offset ?
function drawXYPlanes(){
    ctx.beginPath();
    ctx.strokeStyle = "#000"; //hex Black // Color of the Main Planes
    
    ctx.moveTo(0,xPlane);
    ctx.lineTo(canvas.width,xPlane);

    ctx.moveTo(yPlane,0);
    ctx.lineTo(yPlane,canvas.height);

    ctx.stroke();
    ctx.closePath();
}


function drawGrid(){
    ctx.beginPath();
    ctx.strokeStyle = "#aaa";
    for (let i=1; i < gridScale*2; i++ ){
        ctx.moveTo(i*xGap, 0);
        ctx.lineTo(i*xGap, canvas.height);
        ctx.moveTo(0, i*yGap);
        ctx.lineTo(canvas.width, i*yGap);
    }
    ctx.stroke();
    ctx.closePath();

}

//pick font and position properly
function drawDigits(){
    ctx.beginPath();
    ctx.fillStyle = "#777"; //Color for the numbers
    for( let i= -gridScale; i<=gridScale ; i++){
        const pos = findPixel(i,0);
        //+2 and -2 are offsets, could be replaced with variables;
        ctx.fillText(`${i}`,pos[0]+2,pos[1]-2);
        ctx.fillText(`${-i}`,pos[1]+2,pos[0]-2);
    }
    ctx.closePath();
    
}

function addPixelPoint(x,y){
    ctx.beginPath();
    //arc function utilizes x,y coordinate, followed by Radius(2), then start and end angle;
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI,false);
    ctx.fillStyle = '#f00'; //hex Red
    ctx.fill();
    ctx.closePath();
}

function addValuePoint(x,y){
    const coords = findPixel(x,y)
    addPixelPoint(coords[0],coords[1]);
}

function findCoordinates(x, y) {
    xa = parseFloat(((x - yPlane) / xGap).toFixed(2));
    ya = parseFloat(((xPlane - y) / yGap).toFixed(2));
    coordinates = [xa, ya];
    return coordinates;
  };

function findPixel (x,y){
    const xa = x*xGap + yPlane;
    const ya = -y*yGap + xPlane;

    return [xa,ya];
}

function clearCanvas(){
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.closePath();
}

function LoadPoints(){
    //if there's no data, return.
    if (!dataArray.length){
        // console.log("no points to plot");
        return;
    }
    //else, 
    for (let i=0; i<dataArray.length;i++){
        const current = dataArray[i];
        const cX = parseFloat(current.dataX);
        const cY = parseFloat(current.dataY);
        addValuePoint(cX,cY);
    }
}
