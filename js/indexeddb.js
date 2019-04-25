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
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = Number(urlParams.get("id"));

  if (dataType == "tim") {
    var dataSquadHTML = "";
    var tabelSquadHTML = "";
    getDataById("tim_favorit", idParam).then(function(tim) {
      console.dir("getSavedTimById: " + tim);
      resultDetailTimJSON(tim);
      dataTeamJSON = tim;
      tim.squad.forEach(function(squad) {
        dataSquadJSON = squad;
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
      console.dir("getSavedPlayerById: data: " + player);
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

function dataFavorit(dataType) {
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

function database(idb) {
  var dbPromise = idb.open("db_pwasepakbola", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("tim_favorit")) {
      var indexTimFav = upgradeDb.createObjectStore("tim_favorit", {
        keyPath: "id"
      });
      indexTimFav.createIndex("namaTim", "name", {
        unique: false
      });
    }

    if (!upgradeDb.objectStoreNames.contains("pemain_favorit")) {
      var indexPlayerFav = upgradeDb.createObjectStore("pemain_favorit", {
        keyPath: "id"
      });
      indexPlayerFav.createIndex("namaPemain", "name", {
        unique: false
      });
    }
  });

  return dbPromise;
}
