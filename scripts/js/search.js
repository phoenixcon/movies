$('form').submit(function(event) {

    event.preventDefault();

    var mykey = config.themoviedb;
    var movietitle = document.getElementById('search').value;
    var baseapiurl = 'https://api.themoviedb.org/3/search/movie?api_key='+mykey+'&language=en-US&page=1&include_adult=false';
    var apisearch = '&query='+movietitle;
    var apiurl = baseapiurl+apisearch;

    $.get( apiurl, function( data ) {
        
        var index;
        var resultsnumber = data.total_results;
        var resultspages = data.total_pages;
        
        if (resultspages > 1) {
            console.log(resultspages)
        };
        console.log(data);

        $("#results").empty();

        for (index = 0; index < resultsnumber; ++index) {

            if (data.results[index].poster_path == null) {
                $("#results").append("<li><h2>"+data.results[index].title+"</h2><img src='images/film-icon.jpg'></li>");
            } else {
                $("#results").append("<li><h2>"+data.results[index].title+"</h2><img src=http://image.tmdb.org/t/p/w185/"+data.results[index].poster_path+"></li>");
            }
        }

        }, "json" );
    });