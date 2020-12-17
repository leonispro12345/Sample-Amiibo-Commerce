window.onload = () => {
  const fetchAmiiboDataAndPopulate = (amiiboName) => {
    const apiURL = "https://www.amiiboapi.com/api/amiibo/";

    fetch(apiURL)
      .then((response) => {
        return response.json();
      })
      .then(({ amiibo }) => {
        const amiibosContainer = document.querySelector("div#amiibosContainer");
        amiibosContainer.innerHTML = "";

        const filteredAmiibo = amiibo.filter(({ name }) => {
          if (!amiiboName) {
            return true;
          }
          if (name.toLowerCase().includes(amiiboName.toLowerCase())) {
            return true;
          }
          return false;
        });

        const filteredNumberOFAmiiboElement = document.querySelector(
          "div.amiiboCount > div.number"
        );

        filteredNumberOFAmiiboElement.textContent = filteredAmiibo.length;

        filteredAmiibo.forEach(
          ({ name, gameSeries, image, release: { au, eu, jp, na } }) => {
            /* Container for Card */
            const amiiboContainer = document.createElement("div");
            amiiboContainer.classList.add("amiiboContainer");

            /* IMAGE */
            const amiiboImage = document.createElement("img");
            amiiboImage.setAttribute("src", image);
            amiiboImage.setAttribute("alt", `${name}'s amiibo image`);

            /* Release Date*/
            const amiiboRelease = document.createElement("div");
            amiiboRelease.classList.add("release");
            amiiboRelease.textContent = au || eu || jp || na;

            /* Name */
            const amiiboName = document.createElement("div");
            amiiboName.classList.add("name");
            amiiboName.textContent = name;

            /* Random Price */
            const amiiboPrice = document.createElement("div");
            amiiboPrice.textContent = `$${Math.floor(
              Math.random() * 10 + 69
            )}.99`;
            amiiboPrice.classList.add("price");

            /* Game Series */
            const amiiboGameSeries = document.createElement("div");
            amiiboGameSeries.classList.add("gameSeries");
            amiiboGameSeries.textContent = gameSeries;

            const thingsToAppend = [
              amiiboImage,
              amiiboName,
              amiiboRelease,
              amiiboPrice,
              amiiboGameSeries,
            ];

            thingsToAppend.forEach((ele) => {
              amiiboContainer.appendChild(ele);
            });

            amiibosContainer.appendChild(amiiboContainer);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fetchAmiiboDataAndPopulate();

  const marioButton = document.querySelector("div#filterButtons > div.mario");
  marioButton.addEventListener("click", () => {
    fetchAmiiboDataAndPopulate("mario");
  });

  const zeldaButton = document.querySelector("div#filterButtons > div.zelda");
  zeldaButton.addEventListener("click", () => {
    fetchAmiiboDataAndPopulate("zelda");
  });

  const linkButton = document.querySelector("div#filterButtons > div.link");
  linkButton.addEventListener("click", () => {
    fetchAmiiboDataAndPopulate("link");
  });

  const allButton = document.querySelector("div#filterButtons > div.all");
  allButton.addEventListener("click", () => {
    fetchAmiiboDataAndPopulate();
  });

  const searchButton = document.querySelector("div#searchForm > div.button");
  searchButton.addEventListener("click", () => {
    const searchInput = document.querySelector(
      "div#searchForm > input#amiiboNameSearchInput"
    );

    console.log(searchInput.value);

    fetchAmiiboDataAndPopulate(searchInput.value || null);
  });
};

// # --> For ID
// . --> For Classes
