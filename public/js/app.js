const search = document.querySelector("input[type='submit']");
const msg = document.querySelectorAll(".result");
const weather_icon = document.querySelector("#weather_icon");

search.addEventListener("click", () => {
    const location = document.querySelector("input[type='text']").value;
    if (location != '') {
        msg[0].textContent = "Loading..."
        msg[1].textContent = "";
        weather_icon.src = "";
        fetch(`/weather?query=${location}`)
            .then((response) => response.json().then((data) => {
                if (data.error !== undefined) {
                    msg[0].textContent = data.error;
                }
                else {
                    msg[0].textContent = `Location: ${data.location}, ${data.country}`;
                    msg[1].innerHTML = `Temperature: ${data.temperature}<sup>o</sup>C`;
                    weather_icon.src = data.icon
                }
            }))
    }
    else msg[0].textContent = "You need to enter a location"
})