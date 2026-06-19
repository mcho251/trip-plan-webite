const cities = [
  {
    id: "auckland", 
    name: "Auckland",
    country: "New Zealand",
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    image: "source/tokyo.jpg",
    summary: "....",
    details: "..."
  },
  {
    id: "tokyo", // used in the URL, e.g. city-detail.html?city=tokyo — keep it lowercase, no spaces
    name: "Tokyo",
    country: "Japan",
    startDate: "2026-06-30",
    endDate: "2026-07-04",
    image: "source/tokyo.jpg",
    summary: "First stop: temples, neon streets, and way too much ramen.",
    details: "Tokyo kicks off the trip. Plans include Senso-ji Temple in Asakusa, the Shibuya crossing, and a day trip out toward Mt. Fuji if the weather cooperates. Staying near Shinjuku."
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    startDate: "2026-07-04",
    endDate: "2026-07-07",
    image: "source/kyoto.jpg",
    summary: "Street food capital — Dotonbori at night is unmissable.",
    details: "A quick but food-focused stop in Osaka: takoyaki and okonomiyaki in Dotonbori, plus a half-day trip out to Osaka Castle."
  },
  {
    id: "osaka",
    name: "Osaka",
    country: "Japan",
    startDate: "2026-07-07",
    endDate: "2026-07-10",
    image: "source/osaka.jpg",
    summary: "Street food capital — Dotonbori at night is unmissable.",
    details: "A quick but food-focused stop in Osaka: takoyaki and okonomiyaki in Dotonbori, plus a half-day trip out to Osaka Castle."
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "Korea",
    startDate: "2026-07-10",
    endDate: "2026-07-16",
    image: "source/seoul.jpg",
    summary: "Palaces, K-BBQ, and Hongdae nightlife to close out the trip.",
    details: "The last leg of the trip in Seoul: Gyeongbokgung Palace, Myeongdong street food, and a night out in Hongdae before flying home."
  }
];
 
// Returns the city object whose date range includes today, or undefined if none match.
function getCurrentCity() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ignore time-of-day when comparing dates
 
  return cities.find(city => {
    const start = new Date(city.startDate);
    const end = new Date(city.endDate);
    end.setHours(23, 59, 59, 999); // count the whole end day as included
    return today >= start && today <= end;
  });
}

// Looks up a single city by its id (used on the detail page)
function getCityById(id) {
  return cities.find(city => city.id === id);
}

// ---- Flight data ----
// One entry per flight leg, in any order — getNextFlight() figures out
// which one is next. "departure" combines date + time so it can be
// compared directly against right now.
const flights = [
  {
    id: "nz-tokyo",
    airline: "Qantas",
    flightNumber: "QF120",
    from: "Auckland (AKL)",
    to: "Tokyo (Narita)",
    departure: "2026-06-30T06:10:00",
    layover: {
      airport: "Brisbane (AUS)",
      departure: "2026-06-30T10:30:00",
      flightNumber: "QF61"
  }
  },
  {
    id: "osaka-seoul",
    airline: "Peach",
    flightNumber: "MM709",
    from: "Osaka (Kansai)",
    to: "Seoul (Incheon)",
    departure: "2026-07-10T18:15:00"
  },
  {
    id: "seoul-nz",
    airline: "Cathay Pacific",
    flightNumber: "CX439",
    from: "Seoul (ICN)",
    to: "Auckland (AKL)",
    departure: "2026-07-16T13:40:00",
    layover: {
      airport: "Hong Kong",
      departure: "2026-07-16T21:05:00",
      flightNumber: "CX113"
  }
  }
];
 
// Returns whichever flight has the soonest departure time that's still in
// the future. Returns undefined once every flight is in the past.
function getNextFlight() {
  return flights
    .filter(f => new Date(f.departure) > new Date())
    .sort((a, b) => new Date(a.departure) - new Date(b.departure))[0];
}
 
// Turns "2026-07-02T17:35:00" into something readable like "Jul 2, 5:35 PM"
function formatFlightDeparture(isoString) {
  const date = new Date(isoString);
  const datePart = date.toLocaleDateString([], { month: "short", day: "numeric" });
  const timePart = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${datePart}, ${timePart}`;
}
 
