const countrySelect = document.getElementById("country");
const countryGo = document.querySelector(".country-go");

const countryGenerator = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  console.log(data);
  const countries = data.map((country) => {
    return {
      commonName: country.name.common,
      officialName: country.name.official,
      flag: country.flags.svg,
      coatOfArms: country.coatOfArms.svg || "./imgs/404.gif",
      currency: country.currencies || "Unknown",
      capital: country.capital || "Unknown",
      borders: country.borders || "Unknown",
      languages: country.languages || "Unknown",
      timeZone: country.timezones || "Unknown",
      continent: country.continents,
      map: country.maps.googleMaps,
    };
  });
  return countries;
};

console.log(countryGenerator());

countryGenerator().then((data) => {
  const countries = data.filter((ele) => ele.commonName !== "Israel");
  countries.forEach((country) => {
    const option = document.createElement("option");
    const optionValue = document.createTextNode(country.commonName);
    option.append(optionValue);
    countrySelect.append(option);
  });
});

const flag = document.querySelector(".flag img");
const slogan = document.querySelector(".slogan img");
const infos = document.querySelector(".infos");
const officialName = document.querySelector(".official-name");
const capital = document.querySelector(".capital");
const currencies = document.querySelector(".currencies");
const continent = document.querySelector(".continent");
const borders = document.querySelector(".borders");
const languages = document.querySelector(".languages");
const timeZone = document.querySelector(".time-zone");
const map = document.querySelector(".map");

countryGo.addEventListener("click", async function (e) {
  e.preventDefault();
  infos.style.opacity = "0";
  let selectValue = countrySelect.value;
  let country;

  if (selectValue === "") {
    return;
  } else {
    let countries = await countryGenerator();
    country = countries.filter((ele) => ele.commonName === selectValue)[0];
  }
  flag.src = country.flag;
  slogan.src = country.coatOfArms;
  officialName.textContent = country.officialName;
  capital.textContent = country.capital;
  currencies.textContent = "";
  Object.values(country.currency).forEach((currency) => {
    let ele = document.createTextNode(`${currency.name} ${currency.symbol}`);
    currencies.appendChild(ele);
  });
  continent.textContent = country.continent;
  borders.textContent = country.borders;
  languages.textContent = "";
  Object.values(country.languages).forEach((lang) => {
    let ele = document.createTextNode(lang);
    languages.appendChild(ele);
  });
  timeZone.textContent = country.timeZone;
  map.href = country.map;

  infos.style.display = "block";
  window.setTimeout(function () {
    infos.style.opacity = "1";
  }, 500);
});
