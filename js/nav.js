document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  var typeFavorit = "";

  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // Tutup sidenav
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              //console.log("cek halaman yang dimuat: loadNav: " + page);

              loadPage(setupPage(page));
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);

  loadPage(setupPage(page));

  function setupPage(page) {
    if (page == "" || page == "#") {
      page = "home";
    } else if (page === "favorit" || page === "team-fav") {
      page = "favorit";
      typeFavorit = "tim";
    } else if (page === "pemain_favorit") {
      page = "favorit";
      typeFavorit = "pemain";
    } else {
      typeFavorit = "";
    }
    return page;
  }

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

      if (this.readyState == 4) {
        if (page === "home") {
          memuatKlasemenLiga();
        } else if (page === "favorit") {
          dataFavorit(typeFavorit);
        }

        if (this.status == 200) {
          console.log("Berhasil memuat page")
          document.querySelector("#body-content");.innerHTML = xhttp.responseText;
        } else {
          console.log("terjadi kesalahan");
        }
      }
    };

    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
