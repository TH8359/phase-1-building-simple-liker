// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.getElementById("modal").classList.add("hidden")

document.querySelectorAll('.like-glyph').forEach((heart) => {
  heart.addEventListener('click', (e) => {
    // Disable clicking while the server call is in progress
    heart.classList.add("disabled");

    // Call the mimic server function to simulate a server request
    mimicServerCall().then(() => {
      // On success: Toggle the heart from empty to full
      if (heart.textContent === EMPTY_HEART) {
        heart.textContent = FULL_HEART;
        heart.classList.add("activated-heart"); // Add a class to change the color
      } else {
        heart.textContent = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      }
    }).catch((error) => {
      // On failure: Show the error in the modal
      document.getElementById("modal-message").textContent = error;
      document.getElementById("modal").classList.remove("hidden"); // Show the modal

      // Hide the modal after a few seconds
      setTimeout(() => {
        document.getElementById("modal").classList.add("hidden");
      }, 3000);
    }).finally(() => {
      // Re-enable clicking after server call
      heart.classList.remove("disabled");
    });
  });
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

//sources: https://chatgpt.com/