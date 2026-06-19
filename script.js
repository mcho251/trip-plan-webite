function renderNextFlight() {
  const next = getNextFlight();
  const badge = document.getElementById("connecting-badge");
  const layoverCard = document.getElementById("layover-card");
 
  if (!next) {
    document.getElementById("flight-airline").textContent = "—";
    document.getElementById("flight-num").textContent = "—";
    document.getElementById("flight-route").textContent = "All flights complete! ✈️";
    document.getElementById("flight-time").textContent = "—";
    badge.classList.add("hidden");
    layoverRow.classList.add("hidden");
    return;
  }
 
  document.getElementById("flight-airline").textContent = `${next.airline} | ${next.flightNumber}`;
  document.getElementById("flight-route").textContent = `${next.from} → ${next.to}`;
  document.getElementById("flight-time").textContent = formatFlightDeparture(next.departure);
 
  // Only show the badge + layover row if this particular flight has one
  if (next.layover) {
    if(badge) badge.classList.remove("hidden");
    if(layoverCard) layoverCard.classList.remove("hidden");
    document.getElementById("layover-airline").textContent = `${next.airline} | ${next.layover.flightNumber}`;
    document.getElementById("layover-route").textContent = next.layover.airport;
    document.getElementById("layover-time").textContent = formatFlightDeparture(next.layover.departure);
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