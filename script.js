function renderNextFlight() {
  const next = getNextFlight();
  const badge = document.getElementById("connecting-badge");
  const layoverRow = document.getElementById("layover-row");
 
  if (!next) {
    document.getElementById("flight-airline").textContent = "—";
    document.getElementById("flight-num").textContent = "—";
    document.getElementById("flight-route").textContent = "All flights complete! ✈️";
    document.getElementById("flight-time").textContent = "—";
    badge.classList.add("hidden");
    layoverRow.classList.add("hidden");
    return;
  }
 
  document.getElementById("flight-airline").textContent = next.airline;
  document.getElementById("flight-num").textContent = next.flightNumber;
  document.getElementById("flight-route").textContent = `${next.from} → ${next.to}`;
  document.getElementById("flight-time").textContent = formatFlightDeparture(next.departure);
 
  // Only show the badge + layover row if this particular flight has one
  if (next.layover) {
    badge.classList.remove("hidden");
    layoverRow.classList.remove("hidden");
    document.getElementById("flight-layover").textContent =
      `${next.layover.duration} in ${next.layover.airport}`;
  } else {
    badge.classList.add("hidden");
    layoverRow.classList.add("hidden");
  }
}
 
renderNextFlight();

function renderFeaturedCity() {
  const current = getCurrentCity();
  const featuredCard = document.getElementById("featured-city");
 
  if (!current) {
    return; // stays hidden — no city matches today's date
  }
 
  document.getElementById("featured-image").src = current.image;
  document.getElementById("featured-title").textContent = current.name;
  document.getElementById("featured-text").textContent = current.summary;
  document.getElementById("featured-link").href = `city-detail.html?city=${current.id}`;
 
  featuredCard.classList.remove("hidden");
}
 
renderFeaturedCity();