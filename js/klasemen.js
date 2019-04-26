function resultKlasemenJSON(data) {
  var tabelKlasemenAtasHtml = "";
  var tabelKlasemenTengahHtml = "";
  var tabelKlasemenBawahHtml = "";
  data.standings.forEach(function (klasemen) {
    klasemen.table.forEach(function (club) {
      club = JSON.parse(JSON.stringify(club).replace(/http:/g, "https:"));
      if (club.position < 5) {
        tabelKlasemenAtasHtml += `
      <tr>
          <td class="center-align">${club.position}</td>
          <td>
          <a href="./detailtim.html?id=${club.team.id}">
          <p class="hide-on-small-only">
          ${club.team.name}
          </p>
          <p class="hide-on-med-and-up">
          <img src=${
            club.team.crestUrl
          }  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
          </p>
  
          </a>
          </td>
          <td class="center-align">${club.playedGames}</td>
          <td class="center-align">${club.won}</td>
          <td class="center-align">${club.draw}</td>
          <td class="center-align">${club.lost}</td>
          <td class="center-align">${club.goalDifference}</td>
          <td class="center-align">${club.points}</td>
          </tr>
          `;
      } else if (club.position < 19) {
        tabelKlasemenTengahHtml += `
      <tr>
          <td class="center-align">${club.position}</td>
          <td>
          <a href="./detailtim.html?id=${club.team.id}">
          <p class="hide-on-small-only">
          ${club.team.name}
          </p>
          <p class="hide-on-med-and-up">
          <img src=${
            club.team.crestUrl
          }  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
          </p>
  
          </a>
          </td>
          <td class="center-align">${club.playedGames}</td>
          <td class="center-align">${club.won}</td>
          <td class="center-align">${club.draw}</td>
          <td class="center-align">${club.lost}</td>
          <td class="center-align">${club.goalDifference}</td>
          <td class="center-align">${club.points}</td>
          </tr>
          `;
      } else {
        tabelKlasemenBawahHtml += `
      <tr>
          <td class="center-align">${club.position}</td>
          <td>
          <a href="./detailtim.html?id=${club.team.id}">
          <p class="hide-on-small-only">
          ${club.team.name}
          </p>
          <p class="hide-on-med-and-up">
          <img src=${
            club.team.crestUrl
          }  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
          </p>
  
          </a>
          </td>
          <td class="center-align">${club.playedGames}</td>
          <td class="center-align">${club.won}</td>
          <td class="center-align">${club.draw}</td>
          <td class="center-align">${club.lost}</td>
          <td class="center-align">${club.goalDifference}</td>
          <td class="center-align">${club.points}</td>
          </tr>
          `;
      }
    });
  });

  document.getElementById("peringkatAtas").innerHTML = tabelKlasemenAtasHtml;
  document.getElementById(
    "peringkatTengah"
  ).innerHTML = tabelKlasemenTengahHtml;
  document.getElementById("peringkatBawah").innerHTML = tabelKlasemenBawahHtml;
}