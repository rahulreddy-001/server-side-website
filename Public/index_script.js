let coords;
if ("geolocation" in navigator) {
  console.log("geolocation  available...");
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("latitude").textContent = "Latitude : " + lat;
    document.getElementById("longitude").textContent = "Longitude : " + lon;

    coords = { lat, lon };
  });
} else {
  console.log("geolocation not available...");
}

const player = document.getElementById("player");
const captureButton = document.getElementById("capture");

navigator.mediaDevices
  .getUserMedia({
    video: true,
  })
  .then((stream) => {
    player.srcObject = stream;
  });

captureButton.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = player.width;
  canvas.height = player.height;
  canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);
  const image64 = canvas.toDataURL();
  data = { coords, image64 };
  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
});
