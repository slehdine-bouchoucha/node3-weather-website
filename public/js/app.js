const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector("#message");
const message1 = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value === "") {
    return console.log("you nees to set a place !!");
  } else {
    fetch(`http://localhost:3000/weather?adress=${search.value}`).then(
      (resp) => {
        resp.json().then((data) => {
          if (data.error) {
            return console.log(data.error);
          } else {
            message1.textContent = "the place is:" + search.value;
            message.textContent = data.weather;
          }
        });
      }
    );
  }
});
