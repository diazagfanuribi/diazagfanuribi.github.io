var api_token = "ea69c9a713714673ba94d1daa8d23563";
var kode_liga = 2021;
var base_url = "https://api.football-data.org/v2/";
var endpoint_tim = `${base_url}teams/`;
var endpoint_pemain = `${base_url}players/`;
var endpoint_klasemen = `${base_url}competitions/${kode_liga}/standings?standingType=TOTAL`;
var endpoint_pertandingan_upcoming = `${base_url}competitions/${kode_liga}/matches?status=SCHEDULED`;
var endpoint_pertandingan_detail = `${base_url}matches/`;

var fetchApi = url => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": api_token
    }
  });
};

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function memuatKlasemenLiga() {
  if ("caches" in window) {
    caches.match(endpoint_klasemen).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          resultKlasemenJSON(data);
          console.dir("memuatKlasemenLiga " + data);
        });
      }
    });
  }

  fetchApi(endpoint_klasemen)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      console.log(data);

      resultKlasemenJSON(data);
    })
    .catch(error);
}

function getDetailKlubById() {
  return new Promise(function(resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    var dataSquadHTML = "";
    var tabelSquadHTML = "";
    if ("caches" in window) {
      caches.match(endpoint_tim + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            resultDetailTimJSON(data);
            data.squad.forEach(function(squad, index) {
              dataSquadJSON = squad;
              dataSquadHTML += `
                                        <tr>
                                        <td >
                                        <a href="./detailplayer.html?id=${
                                          squad.id
                                        }"> ${squad.name}</a>
                                        </td>
                                        <td >${squad.position}</td>
                                        </tr>
                                        `;
            });
            tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`;

            document.getElementById("squad").innerHTML = tabelSquadHTML;
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_tim + idParam)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);

        resultDetailTimJSON(data);
        dataTeamJSON = data;
        data.squad.forEach(function(squad, index) {
          dataSquadJSON = squad;
          console.log("cek squad name: " + squad.name);
          console.log("cek squad position: " + squad.position);
          dataSquadHTML += `
      <tr>
        <td >
        <a href="./detailplayer.html?id=${squad.id}"> ${squad.name}</a>
        </td>
        <td >${squad.position}</td>
      </tr>
     `;
        });
        tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`;

        document.getElementById("squad").innerHTML = tabelSquadHTML;
        resolve(data);
      })
      .catch(error);
  });
}

function getDetailPlayerById() {
  return new Promise(function(resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var dataSquadHTML = "";
    var tabelSquadHTML = "";
    if ("caches" in window) {
      caches.match(endpoint_pemain + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            resultDetailPemainJSON(data);
            resolve(data);
          });
        }
      });
    }
    fetchApi(endpoint_pemain + idParam)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        resultDetailPemainJSON(data);
        resolve(data);
      })
      .catch(error);
  });
}
