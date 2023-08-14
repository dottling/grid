const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //short for context:ctx;

let gridScale = 20;

let dotRadius = 2; // make dot Related to Scale?

let xPlane = canvas.height/2;
let yPlane = canvas.width/2;

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

    console.log(canvasX,canvasY);
    return [canvasX,canvasY];    
}

//Receives the RectSize (which includes the border).
function resizeCanvas(width,height){
    clearCanvas();
    //removes the borders from the size given
    const actualSize = getCanvasSize(width,height);
    canvas.width = actualSize[0];
    canvas.height = actualSize[1];
    
    //garantes the x y planes are always centered on canvas
    xPlane = canvas.height/2;
    yPlane = canvas.width/2;

    drawGrid();
    drawXYPlanes();
    drawDigits();

}

function drawXYPlanes(){
    ctx.beginPath();
    ctx.strokeStyle = "#000"; //hex Black
    
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
        ctx.moveTo(i*gridScale, 0);
        ctx.lineTo(i*gridScale, canvas.height);
        ctx.moveTo(0, i*gridScale);
        ctx.lineTo(canvas.width, i*gridScale);
    }
    ctx.stroke();
    ctx.closePath();

}

function drawDigits(){
    ctx.beginPath();
    ctx.fillStyle = "#777";
    for( let i= -gridScale; i<=gridScale ; i++){
        const pos = findPixel(0,i);
        //+2 and -2 are offsets, could be replaced with variables;
        ctx.fillText(`${i}`,pos[1]+2,pos[0]-2);
        ctx.fillText(`${-i}`,pos[0]+2,pos[1]-2);
    }
    ctx.closePath();
    
}

function addPixelPoint(x,y){
    console.log("the pixel values for x and y are",x,y);
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
    xa = parseFloat(((x - yPlane) / gridScale).toFixed(2));
    ya = parseFloat(((xPlane - y) / gridScale).toFixed(2));
    coordinates = [xa, ya];
    return coordinates;
  };

function findPixel (x,y){
    const xa = x*gridScale + yPlane;
    const ya = -y*gridScale + xPlane;

    return [xa,ya];
}

function clearCanvas(){
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.closePath();
}
