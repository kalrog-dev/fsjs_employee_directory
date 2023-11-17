/**
 * @file Requests a JSON object from an API, parses the data and displays it in a grid.
 * @author Michal Veselka
 * {@link https://github.com/kalrog-dev}
 */

// Fetch data from an API
let fetchedData;
const url = `https://randomuser.me/api/?results=12&nat=de&gender=female`;
fetch(url)
  .then(res => res.json())
  .then(data => data.results)
  .then(displayUsers)
  .catch(err => alert(err));

// Display image, fullname, email, city/location
function displayUsers(data) {
  let html = `<div>`;
  data.forEach(user => {
    const { name: { first: firstName, last: lastName }, email, picture: { large: img }, location: { city, state } } = user;
    html += 
      `<div class="card">
        <div class="card-img-container">
          <img class="card-img" src=${img} alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${city}, ${state}</p>
        </div>
      </div>`
  });
  html += `</div>`;

  // Inject html
  document.getElementById("gallery").innerHTML = html;
}