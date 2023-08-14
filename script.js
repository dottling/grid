const root = document.querySelector(':root');
const cartesianPlane = document.getElementById('cartesianPlane');
const inputForm = document.getElementById('inputForm');

const cartesianPlaneRect = cartesianPlane.getBoundingClientRect();

const zeroPlaneX = parseFloat(cartesianPlaneRect.height) / 2;
const zeroPlaneY = parseFloat(cartesianPlaneRect.width) / 2;

// Array that holds all data points that the user provided (both as a click or form)
// Each entry is an object that holds 2 arrays (dataX and dataY)
// dataX and dataY both are arrays of Strings
// dataArray -> element.dataX, element.dataY
const dataArray = [];

// Find coordinates based on their position on the cartesian plane
const findCoordinates = function (x, y) {
  xa = parseFloat(((x - zeroPlaneX) / 20).toFixed(2));
  ya = parseFloat(((zeroPlaneY - y) / 20).toFixed(2));

  coordinates = [xa, ya];
  return coordinates;
};

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

  if (inputX.length !== inputY.length) {
    alert('Both inputs must have the same number of values.');
    return;
  }

  for (let i = 0; i < inputX.length; i++) {
    if (!inputX[i] || !inputY[i]) {
      alert('There is at least one entry that is empty.');
      retun;
    }
  }

  for (let i = 0; i < inputX.length; i++) {
    const point = document.createElement('div');
    point.classList.add('point');
    let x = parseFloat(inputX[i]) * 20 + zeroPlaneX;
    let y = -parseFloat(inputY[i]) * 20 + zeroPlaneY;
    // console.log(x, y);
    point.style.left = `${x - 4}px`;
    point.style.top = `${y - 4}px`;
    cartesianPlane.appendChild(point);
  }
};

// Add a point to the Cartesian plane on click and console.log coordinates
// Also save the points on dataArray
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

// Attach click event listener to the Cartesian plane
cartesianPlane.addEventListener('click', addPoint);
// Attach submit event listener to the form button
inputForm.addEventListener('submit', getData);
