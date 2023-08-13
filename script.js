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

  const data = {
    dataX: inputX,
    dataY: inputY,
  };

  dataArray.push(data);
  console.log(dataArray);


  // replace this section with new function for adding point to plane //;
  for (let i = 0; i < inputX.length; i++) {

    // const point = document.createElement('div');
    // point.classList.add('point');
    const x = parseFloat(inputX[i]);
    const y = parseFloat(inputY[i]);

    addValuePoint(x,y);
    // console.log(x, y);
    // point.style.left = `${x - 4}px`;
    // point.style.top = `${y - 4}px`;
    // cartesianPlane.appendChild(point);
  }
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
// cartesianPlane.addEventListener('click', addPoint); //old version
cartesianPlane.addEventListener('click', (event) =>{
  addPixelPoint(event.offsetX,event.offsetY);

})