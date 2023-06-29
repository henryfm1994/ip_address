import { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Pin from "/images/icon-location.svg";
// import { useMap } from "react-leaflet/hooks";

const initialState = {
  ip: "142.250.188.238",
  location: {
    country: "US",
    region: "California",
    city: "Los Angeles",
    lat: 34.05223,
    lng: -118.24368,
    postalCode: "90001",
    timezone: "-07:00",
    geonameId: 5368361,
  },
  domains: [
    "04mark.appengine.google.com",
    "074114159.appengine.google.com",
    "1120mcm.appengine.google.com",
    "1256006.android.com.truecaller.adsenseformobileapps.com",
    "147directory.apis.google.com",
  ],
  as: {
    asn: 15169,
    name: "GOOGLE",
    route: "142.250.188.0/24",
    domain: "https://about.google/intl/en/",
    type: "Content",
  },
  isp: "Google LLC",
};

function App() {
  // const [option, setOption] = useState("domain");
  const [entry, setEntry] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");

  const markerIcon = new L.Icon({
    iconUrl: Pin,
    iconSize: [35, 45],
  });

  // const search = (query: string) => {
  //   if (Number.isNaN(parseInt(query[0]))) {
  //     setOption("domain");
  //   } else setOption("ipAddress");
  //   return option;
  // };

  // const getQuery = (e: string) => {
  //   setQuery()
  // }

  // const getData = async (query: string) => {
  //   if (query.length > 0) {
  //     search(query);
  //     console.log(option);
  //     console.log(query);
  //     const data = await fetch(
  //       `https://geo.ipify.org/api/v2/country,city?apiKey=at_9eZpLyl4RrTLH0Tc1w6QzKh24Spsx&${option}=${query}`
  //     );
  //     const position = await data.json();
  //     setData(position);
  //     console.log(position);
  //   }
  //   return;
  // };

  useEffect(() => {
    if (query.length > 0) {
      fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_9eZpLyl4RrTLH0Tc1w6QzKh24Spsx&domain=${query}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.ip) {
            setData(data);
            setError("");
          } else if (Number.isNaN(parseInt(query[0])))
            setError("Input correct domain.");
          else setError("Input correct IPv4 or IPv6 address.");
        });
    }
    setEntry("");
  }, [query]);

  function MarkerMap() {
    const map = useMap();
    // console.log(map.getCenter());
    map.flyTo([data.location.lat, data.location.lng]);
    return (
      <Marker
        position={[data.location.lat, data.location.lng]}
        icon={markerIcon}
      >
        <Popup>{query.length === 0 ? "Google" : query}</Popup>
      </Marker>
    );
  }

  return (
    <>
      <header className="header__main">
        <h1>IP Address Tracker</h1>
        <div className="header__form">
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <img
            className="header__img"
            src="./images/icon-arrow.svg"
            alt="Arrow"
            onClick={() => setQuery(entry)}
          />
          <span className="header__error">{error}</span>
        </div>
        <section className="data__main">
          <div className="data__details">
            <h4>IP ADDRESS</h4>
            <p>{data.ip}</p>
          </div>
          <hr />
          <div className="data__details">
            <h4>LOCATION</h4>
            <p>
              {data.location.region}, {data.location.city} <br />
              {data.location.postalCode}
            </p>
          </div>
          <hr />
          <div className="data__details">
            <h4>TIMEZONE</h4>
            <p>{data.location.timezone}</p>
          </div>
          <hr />
          <div className="data__details">
            <h4>ISP</h4>
            <p>{data.isp}</p>
          </div>
        </section>
      </header>

      {/* <main className="map__main"> */}
      <MapContainer
        className="map__main"
        center={{ lat: data.location.lat, lng: data.location.lng }}
        zoom={18}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerMap />
      </MapContainer>
      {/* </main> */}
    </>
  );
}

export default App;
