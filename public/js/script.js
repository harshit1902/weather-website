const weatherForm = document.querySelector(".search");
const input = document.querySelector(".location");
const error = document.querySelector("#error");
const success = document.querySelector("#success");

error.textContent = "";
success.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  error.textContent = "Loading...";
  success.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        error.textContent = data.error;
        return;
      }
      error.textContent = data.location;
      success.textContent = data.forecast;
    });
  });
});
