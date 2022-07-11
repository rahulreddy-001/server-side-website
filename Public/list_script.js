const getData = async () => {
  let resp = await fetch("/api");
  let json = await resp.json();
  for (item of json) {
    let root = document.createElement("div");
    let geo = document.createElement("p");
    let image = document.createElement("img");

    let timestamp = document.createElement("p");
    let date = new Date(item.timestamp).toLocaleString();
    timestamp.textContent = date;
    geo.textContent = `Location :: (${item.coords.lat},${item.coords.lon})`;
    image.src = item.image64;
    root.append(document.createElement("hr"), date, geo, image);
    document.body.append(root);
  }
};
getData();
