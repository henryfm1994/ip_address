export const getData = async (query: string) => {
  const data = await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_9eZpLyl4RrTLH0Tc1w6QzKh24Spsx&ipAddress=${query}`
  );
  const position = await data.json();
  return position;
};
