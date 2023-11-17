/**
 * @file Requests a JSON object from an API, parses the data and displays it in a grid.
 * @author Michal Veselka
 * {@link https://github.com/kalrog-dev}
 */

// Fetch user data from an API
fetch("https://randomuser.me/api/?results=12&nat=de&gender=female")
  .then(res => res.json())
  .then(data => data.results)
  .then(displayUsers)
  .catch(err => alert(err));

/**
 * Destructure user data, build html and inject it into gallery.
 * @param {object[]} data - Fetched user data.
 * @returns {void}
 */
function displayUsers(data) {
  let html = "";
  data.forEach(({ name: { first: firstName, last: lastName }, email, picture: { large: img }, location: { city, state } }) => {
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
  document.getElementById("gallery").innerHTML = html;
}