/**
 * @file Requests a JSON object from an API, parses and displays the data.
 * @author Michal Veselka
 * {@link https://github.com/kalrog-dev}
 */

// Fetch user data from an API.
fetch("https://randomuser.me/api/?results=12&nat=de&gender=female")
  .then(res => res.json())
  .then(data => data.results)
  .then(users => userData = displayUsers(users))
  .catch(err => alert(err));

// Store the fetched data globally.
let userData;

/**
 * Destructure user data, build html and inject it into gallery.
 * @param {object[]} users - Fetched user data.
 * @param {?HTMLDivElement} insertTarget - Element the html should get inserted into.
 * @returns {object[]} Fetched user data.
 */
function displayUsers(users, insertTarget = document.getElementById("gallery")) {
  if (!insertTarget) return;
  let html = "";
  users.forEach(({ name: { first: firstName, last: lastName }, email, picture: { large: img }, location: { state } }) => {
    html += 
      `<div class="card">
        <div class="card-img-container">
          <img class="card-img" src=${img} alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${state}</p>
        </div>
      </div>`
  });
  insertTarget.innerHTML = html;
  return users;
}

// Click event listener for the gallery.
document.getElementById("gallery")?.addEventListener("click", handleGalleryClick);

/**
 * Display a modal for the selected card.
 * @param {object} event - The event object. 
 * @returns {void}
 */
function handleGalleryClick({ target }) {
  // Check if the click event bubbled up from an employee card.
  if (target?.closest(".card")) {
    // Get an index of the clicked card, then use it to destructure its data.
    const targetCard = target.closest(".card");
    const cards = document.querySelectorAll(".card");
    const userIndex = [...cards].indexOf(targetCard);

    const { 
      email,
      location: { city, postcode, street: { name: streetName, number: streetNum } },
      name: { first: firstName, last: lastName },
      picture: { large: img },
      dob: { date },
      cell: phoneNum
    } = userData[userIndex];
    const dob = /\d{4}(-\d{2}){2}/.exec(date)[0];

    const html =
      `<div class="modal-container">
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
            <img class="modal-img" src=${img} alt="profile picture">
            <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${phoneNum}</p>
            <p class="modal-text">${streetNum} ${streetName}, ${city}, ${postcode}</p>
            <p class="modal-text">Birthday: ${dob}</p>
          </div>
        </div>
      </div>`
    document.body?.insertAdjacentHTML("beforeend", html);

    // Close the modal on click.
    document.querySelector(".modal-container")?.addEventListener("click", handleModalClick);
  }
}

/**
 * Close a modal by clicking outside of the modal window or by clicking the close button.
 * @param {object} event - The event object. 
 * @returns {void}
 */
function handleModalClick({ target }) {
  if (!target?.closest(".modal") || target?.closest("#modal-close-btn")) {
    document.querySelector(".modal-container")?.removeEventListener("click", handleModalClick);
    document.querySelector(".modal-container")?.remove();
  }
}