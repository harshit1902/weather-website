const weatherForm = document.querySelector(".search");
const input = document.querySelector(".location");
const error = document.querySelector("#error");
const humidity = document.querySelector("#humidity");
const description = document.querySelector("#description");
const temperature = document.querySelector("#temperature");
const updatedAt = document.querySelector("#updatedAt");

error.textContent = "";
humidity.textContent = "";
description.textContent = "";
temperature.textContent = "";
updatedAt.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  error.textContent = "Loading...";
  humidity.textContent = "";
  description.textContent = "";
  temperature.textContent = "";
  updatedAt.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        error.textContent = data.error;
        return;
      }
      error.textContent = data.location;
      description.textContent = data.description;
      temperature.textContent = data.temperature;
      humidity.textContent = data.humidity;
      updatedAt.textContent = data.updatedAt;
    });
  });
});
