// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');
  const detailRating = document.querySelector('#rating-display');
  const detailComment = document.querySelector('#comment-display');

  // Update the ramen details
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;

};

const addSubmitListener = () => {
  // Add code
  const form = document.querySelector('#new-ramen');
  
  // Add event listener to the form
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get data from the form
    const newRamen = {
      name: event.target['new-name'].value,
      restaurant: event.target['new-restaurant'].value,
      image: event.target['new-image'].value,
      rating: event.target['new-rating'].value,
      comment: event.target['new-comment'].value,
    };

    // Display new ramen image in the ramen-menu
    const ramenMenu = document.querySelector('#ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;

    // Add click listener for the newly added ramen
    img.addEventListener('click', () => handleClick(newRamen));

    ramenMenu.appendChild(img);

    // Reset the form
    form.reset();
  });
}

const displayRamens = () => {
  // Add code
  const ramenMenu = document.querySelector('#ramen-menu');

  // Fetch data from the API
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      // Display each ramen image in the ramen-menu
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;

        // Add event listener to show ramen details on click
        img.addEventListener('click', () => handleClick(ramen));

        ramenMenu.appendChild(img);
      });

      // Optionally, display the first ramen details on page load
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    });
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
