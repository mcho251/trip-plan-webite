// Reads the ?city=... part of the URL, looks that city up in trip-data.js,
// and fills the page with its info. This is what lets ONE html file serve
// every city instead of needing a separate page for each one.
function renderDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const cityId = params.get("city");
  const city = getCityById(cityId);
 
  if (!city) {
    document.getElementById("detail-heading").textContent = "City not found";
    document.getElementById("detail-text").textContent =
      "No city matches this link. Check the ?city= value in the URL.";
    return;
  }
 
  document.title = `${city.name} — Trip Detail`;
  document.getElementById("detail-heading").textContent = `${city.name}, ${city.country}`;
  document.getElementById("detail-image").src = city.image;
  document.getElementById("detail-image").alt = city.name;
  document.getElementById("detail-text").textContent = city.details;
}
 
renderDetailPage();