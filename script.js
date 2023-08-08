const root = document.querySelector(':root');
const cartesianPlane = document.getElementById('cartesianPlane');
const inputForm = document.getElementById('inputForm');

const zeroPlaneX =
  parseFloat(getComputedStyle(root).getPropertyValue('--cartesianX')) / 2 + 2;
const zeroPlaneY =
  parseFloat(getComputedStyle(root).getPropertyValue('--cartesianY')) / 2 + 2;
const pointsArray = [];
const dataArray = [];

const findCoordinates = function (x, y) {
  xa = parseFloat(((x - zeroPlaneX) / 20).toFixed(2));
  ya = parseFloat(((zeroPlaneY - y) / 20).toFixed(2));

  coordinates = [xa, ya];
  return coordinates;
};

const getData = function (event) {
  event.preventDefault();

  inputX = document.getElementById('inputX').value.split(',');
  inputY = document.getElementById('inputY').value.split(',');

  const data = {
    dataX: [inputX],
    dataY: [inputY],
  };

  dataArray.push(data);

  for (let i = 0; i < inputX.length; i++) {
    const point = document.createElement('div');
    point.classList.add('point');
    x = parseFloat(inputX[i]) * 20 + zeroPlaneX;
    y = -parseFloat(inputY[i]) * 20 + zeroPlaneY;
    // console.log(x, y);
    point.style.left = `${x - 4}px`;
    point.style.top = `${y - 4}px`;
    cartesianPlane.appendChild(point);
  }

  // console.log(dataArray, dataArray);
  console.log(dataArray);
};

// Add a point to the Cartesian plane on click and console.log coordinates
function addPoint(event) {
  const point = document.createElement('div');
  point.classList.add('point');
  const x = event.clientX - cartesianPlane.getBoundingClientRect().left;
  const y = event.clientY - cartesianPlane.getBoundingClientRect().top;
  point.style.left = `${x - 4}px`;
  point.style.top = `${y - 4}px`;
  cartesianPlane.appendChild(point);
  pointsArray.push(findCoordinates(x, y));
  console.log(`coordinates: (${findCoordinates(x, y)})`);

  // console.log(typeof pointsArray[0][0]);
  // console.log(`All points: ${JSON.stringify(pointsArray)}`);
  // console.log(`(${zeroPlaneX}, ${zeroPlaneY})`);
}

// Attach click event listener to the Cartesian plane
cartesianPlane.addEventListener('click', addPoint);
inputForm.addEventListener('submit', getData);
