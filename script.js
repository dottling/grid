const root = document.querySelector(':root');
const cartesianPlane = document.getElementById('cartesianPlane');
const inputForm = document.getElementById('inputForm');

let cartesianPlaneRect = cartesianPlane.getBoundingClientRect();



// Array that holds all data points that the user provided (both as a click or form)
// Each entry is an object that holds 2 arrays (dataX and dataY)
// dataX and dataY both are arrays of Strings
// dataArray -> element.dataX, element.dataY
const dataArray = [];

// Find coordinates based on their position on the cartesian plane


// Add X, Y points to the plane after submitting the form.
// Also save the points on dataArray
const getData = function (event) {
  event.preventDefault();

  let inputX = document.getElementById('inputX').value.split(',');
  let inputY = document.getElementById('inputY').value.split(',');

  
  
  
  // reworked this section with new function for adding point to plane //;
  for (let i = 0; i < inputX.length; i++) {
    
    // ||0 is for if there is no matching pair, place the point in the 0 of the axis
    const x = parseFloat(inputX[i] || 0);
    const y = parseFloat(inputY[i] || 0);
    
    const data = {
      dataX: x.toFixed(2),
      dataY: y.toFixed(2),
    };
  
    dataArray.push(data);
    
    addValuePoint(x,y);
  }
  console.log(dataArray);
};


// !!!!!! REPLACE WITH ADDING POINT TO CANVAS !!!!!!! //
// Add a point to the Cartesian plane on click and console.log coordinates
// Also save the points on dataArray
/*
function addPoint(event) {
  const point = document.createElement('div');
  point.classList.add('point');
  const x = event.clientX - cartesianPlane.getBoundingClientRect().left;
  const y = event.clientY - cartesianPlane.getBoundingClientRect().top;
  point.style.left = `${x - 4}px`;
  point.style.top = `${y - 4}px`;
  cartesianPlane.appendChild(point);

  let coord = findCoordinates(x, y);
  let inputX = String(coord[0]);
  let inputY = String(coord[1]);

  const data = {
    dataX: [inputX],
    dataY: [inputY],
  };

  dataArray.push(data);
  console.log(dataArray);
  console.log(`coordinates: (${findCoordinates(x, y)})`);
}

*/
// Attach submit event listener to the form button
inputForm.addEventListener('submit', getData);

// Attach click event listener to the Cartesian plane
cartesianPlane.addEventListener('click', (event) =>{
  const x = event.offsetX;
  const y = event.offsetY;

  const coord = findCoordinates(x, y);
  const inputX = coord[0];
  const inputY = coord[1];

  const data = {
    dataX: inputX.toFixed(2),
    dataY: inputY.toFixed(2),
  };

  dataArray.push(data);
  console.log(dataArray);

  addPixelPoint(event.offsetX,event.offsetY);

})