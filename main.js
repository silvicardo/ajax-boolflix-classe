console.log('test');

var paesiSupportati = ["it", "en"];

$(document).ready(function () {

  $('#bottoneRicerca').click(function () {

    var titoloRicercato = $('#inputRicerca').val();

    if (titoloRicercato != '') {
      $.ajax({

        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
          api_key: 'e84c7d2ede59ead3397581c0ad7d4dec',
          query: titoloRicercato,
        },
        success: function(apiResponse) {

          for (var i = 0; i < apiResponse.results.length; i++) {
            produciHtmlPer(apiResponse.results[i]);
          }

          $.ajax({

            url: 'https://api.themoviedb.org/3/search/tv',
            method: 'GET',
            data: {
              api_key: 'e84c7d2ede59ead3397581c0ad7d4dec',
              query: titoloRicercato,
            },
            success: function(apiResponse) {

              for (var i = 0; i < apiResponse.results.length; i++) {
                console.log(apiResponse.results[i]);
                var contenutoCorrente = apiResponse.results[i];
                contenutoCorrente.title = contenutoCorrente.name;
                contenutoCorrente.original_title = contenutoCorrente.original_name;
                produciHtmlPer(apiResponse.results[i]);
              }

            },
            error: function(error) {
              console.log(error);
            }
          });

        },
        error: function(error) {
          console.log(error);
        }
      });
    }


  });

});

function produciHtmlPer(contenuto) {

  var voto = Math.ceil(contenuto.vote_average / 2);

  var source   = $('#risultatoTemplate').html();
  var template = Handlebars.compile(source);

  var data = {
    titolo: contenuto.title,
    titoloOriginale: contenuto.original_title,
    lingua: gestisciLingua(contenuto.original_language),
    voto: gestisciVoto(voto),
  };

  var html = template(data);

  $('#risultati').append(html);
}

function gestisciLingua(lingua) {
    var htmlOutput = '';

    if (paesiSupportati.includes(lingua)) {
      console.log(lingua + ' lingua supportata');
      htmlOutput = "<img class='bandiera' src='" + lingua + ".png' />";
    } else {
      htmlOutput = lingua + ' non supportata';
    }

    return htmlOutput;

}

function gestisciVoto(voto) {
  var htmlOutput = '';

  for (var i = 1; i <= 5; i++) {
    if (i <= voto){
      htmlOutput += "<i class='fas fa-star'></i>";
    } else {
      htmlOutput += "<i class='far fa-star'></i>";
    }
  }

  return htmlOutput;
}
