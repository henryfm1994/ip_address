import { useState } from "react";

export const Header = () => {
  const [query, setQuery] = useState("");

  console.log(query);

  return (
    <header className="header__main">
      <h1>IP Address Tracker</h1>
      <div className="header__form">
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          className="header__img"
          src="./images/icon-arrow.svg"
          alt="Arrow"
          // onClick={() => getData()}
        />
      </div>
    </header>
  );
};
