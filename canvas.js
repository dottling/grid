const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //short for context:ctx;

let gridScale = 20;
const dotRadius = 2;

let xPlane = canvas.height/2;
let yPlane = canvas.width/2;

//on Init
resizeCanvas(cartesianPlaneRect.width,cartesianPlaneRect.height);
console.log(cartesianPlaneRect);

//Utility functions
function resizeCanvas(width,height){
    canvas.width = width;
    canvas.height = height;
    
    //garantes the x y planes are always centered on canvas
    xPlane = height/2;
    yPlane = width/2;

    drawGrid();
    
    drawXYPlanes();
}

function drawXYPlanes(){
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.moveTo(0,xPlane);
    ctx.lineTo(canvas.width,xPlane);
    ctx.moveTo(yPlane,0);
    ctx.lineTo(yPlane,canvas.height);
    ctx.stroke();
}

function drawGrid(){
    ctx.beginPath();
    ctx.strokeStyle = "#aaa";
    for (i=1; i < gridScale*2; i++ ){
        ctx.moveTo(i*gridScale, 0);
        ctx.lineTo(i*gridScale, canvas.height);
        ctx.moveTo(0, i*gridScale);
        ctx.lineTo(canvas.width, i*gridScale);
    }
    ctx.stroke();

}

function addPixelPoint(x,y){
    console.log("the pixel values for x and y are",x,y);
    ctx.beginPath();
    //arc function utilizes x,y coordinate, followed by Radius(2), then start and end angle;
    ctx.arc(x-dotRadius, y-dotRadius, dotRadius, 0, 2 * Math.PI,false);
    ctx.fillStyle = '#f00';
    ctx.fill();
}
function addValuePoint(x,y){
    const xa = x*gridScale + yPlane;
    const ya = -y*gridScale + xPlane;

    addPixelPoint(xa,ya);


}

const findCoordinates = function (x, y) {
    xa = parseFloat(((x - yPlane) / gridScale).toFixed(2));
    ya = parseFloat(((xPlane - y) / gridScale).toFixed(2));

    coordinates = [xa, ya];
    return coordinates;
  };

