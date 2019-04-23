function cekData(storeName, id) {
  return new Promise(function(resolve, reject) {
    database(idb)
      .then(function(db) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(function(data) {
        if (data != undefined) {
          resolve("data favorit");
        } else {
          reject("bukan data favorit");
        }
      });
  });
}

function deleteDatafav(storeName, data) {
  database(idb)
    .then(function(db) {
      var tx = db.transaction(storeName, "readwrite");
      var store = tx.objectStore(storeName);
      //console.log("deleteDataPlayerfav: cek id= " + data);
      store.delete(data);
      return tx.complete;
    })
    .then(function() {
      console.log("Item deleted");
      document.getElementById("ikon_favorit").innerHTML = "favorite_border";
      M.toast({
        html: "Data berhasil dihapus dari favorit!"
      });
    })
    .catch(function() {
      M.toast({
        html: "terjadi kesalahan"
      });
    });
}

function createDataFav(dataType, data) {
  var storeName = "";
  var dataToCreate = {};
  if (dataType == "pemain") {
    storeName = "pemain_favorit";
    dataToCreate = {
      id: data.id,
      name: data.name,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      counrtyOfBirth: data.counrtyOfBirth,
      nationality: data.nationality,
      position: data.position
    };
  } else if (dataType == "tim") {
    storeName = "tim_favorit";
    dataToCreate = {
      id: data.id,
      name: data.name,
      shortName: data.shortName,
      tla: data.tla,
      crestUrl: data.crestUrl,
      address: data.address,
      phone: data.phone,
      website: data.website,
      email: data.email,
      founded: data.founded,
      clubColors: data.clubColors,
      venue: data.venue,
      squad: data.squad
    };
  }

  console.log("data " + dataToCreate);
  database(idb)
    .then(db => {
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).put(dataToCreate);

      return tx.complete;
    })
    .then(function() {
      console.log("tim berhasil disimpan.");
      document.getElementById("ikon_favorit").innerHTML = "favorite";
      M.toast({
        html: "Data berhasil difavoritkan!"
      });
    })
    .catch(function() {
      M.toast({
        html: "terjadi kesalahan"
      });
    });
}

function getSavedDataById(dataType) {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = Number(urlParams.get("id"));

  if (dataType == "tim") {
    var dataSquadHTML = "";
    var tabelSquadHTML = "";
    getDataById("tim_favorit", idParam).then(function(tim) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.dir("getSavedTimById: " + tim);
      // Menyusun komponen card artikel secara dinamis
      resultDetailTimJSON(tim);
      dataTeamJSON = tim;
      tim.squad.forEach(function(squad) {
        dataSquadJSON = squad;
        console.log("getSavedTimById cek squad name: " + squad.name);
        console.log("getSavedTimById cek squad position: " + squad.position);
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
    });
  } else if (dataType == "pemain") {
    getDataById("pemain_favorit", idParam).then(function(player) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.dir("getSavedPlayerById: data: " + player);
      // Menyusun komponen card artikel secara dinamis
      resultDetailPemainJSON(player);
    });
  }
}

function getDataById(storeName, id) {
  return new Promise(function(resolve, reject) {
    database(idb)
      .then(function(db) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(function(data) {
        resolve(data);
      });
  });
}

function getAllData(storeName) {
  return new Promise(function(resolve, reject) {
    database(idb)
      .then(function(db) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        return store.getAll();
      })
      .then(function(data) {
        resolve(data);
      });
  });
}

function setupDataFavHtml(dataType) {
  if (dataType == "pemain") {
    getAllData("pemain_favorit").then(function(data) {
      resultPlayerFav(data);
    });
  } else if (dataType == "tim") {
    getAllData("tim_favorit").then(function(data) {
      resultTeamFav(data);
    });
  }
}
