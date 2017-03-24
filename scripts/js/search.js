$( document ).ready(function() {

    $('form').submit(function(event) {

        event.preventDefault();

        var mykey = config.themoviedb;
        var movietitle = document.getElementById('search').value;
        var baseapiurl = 'https://api.themoviedb.org/3/search/movie?language=en-US&include_adult=false&api_key='+mykey;
        var apisearchtitle = '&query='+movietitle;
        var apicomplete = baseapiurl+apisearchtitle;

        //GET API OBJECT
        $.get( apicomplete, function(data) {
            
            $("#results").empty();

            console.log(apicomplete);
            console.log(data);

            var resultspages = data.total_pages;
            var resultsnumber;
            var pagequery;

            //console.log(resultspages);

            //CHECK IF THERE IS MORE THAN ONE PAGE OF RESULTS

            //IF THERE IS ONLY ONE PAGE
            if ( resultspages == 1 ) {

                resultsnumber = data.total_results;

                //LOOP THROUGH RESULTS TO PRINT ONTO PAGE
                for ( index = 0; index < resultsnumber; ++index ) {

                    //IF THERE IS NO POSTER
                    if ( data.results[index].poster_path == null ) {

                        $("#results").append("<li><h2>"+data.results[index].title+"</h2><img src='images/film-icon.jpg'></li>");

                        //IF THERE IS A POSTER
                    } else {

                        $("#results").append("<li><h2>"+data.results[index].title+"</h2><img src=http://image.tmdb.org/t/p/w185/"+data.results[index].poster_path+"></li>");

                    };

                };

                //IF THERE IS MORE THAN ONE PAGE
            } else {

                //LOOP THROUGH PAGES AND MAKE NEW QUERIES
                for ( index = 1; index <= resultspages; ++index ) {

                    pagequery = '&page='+index;
                    apicomplete = baseapiurl+apisearchtitle+pagequery;

                    $.get( apicomplete, function(data) {

                        //console.log(apicomplete);
                        //console.log(data);

                        resultsnumber = data.results.length;

                        for ( index = 0; index < resultsnumber; ++index ) {

                            //IF THERE IS NO POSTER
                            if ( data.results[index].poster_path == null ) {

                                $("#results").append("<li><h2>"+data.results[index].title+"</h2><img src='images/film-icon.jpg'></li>");

                                //IF THERE IS A POSTER
                            } else {

                                $("#results").append("<li><h2>"+data.results[index].title+"</h2><img src=http://image.tmdb.org/t/p/w185/"+data.results[index].poster_path+"></li>");

                            }

                        }

                    });

                }

            }

        });

    });

});





/*$('form').submit(function(event) {

    event.preventDefault();

    var mykey = config.themoviedb;
    var movietitle = document.getElementById('search').value;
    var baseapiurl = 'https://api.themoviedb.org/3/search/movie?language=en-US&include_adult=false&api_key='+mykey+'&page=';
    var apisearch = '&query='+movietitle;
    var pagenum = 1;
    var apiurl = baseapiurl+pagenum+apisearch;

    $.get( apiurl, function( data1 ) {

        console.log(apiurl);
        console.log(data1);

        var resultspages = data1.total_pages;

        $("#results").empty();

        if (resultspages > 1) {

            for (pageindex = 1; pageindex <= resultspages; ++pageindex) {

                var apiurl = baseapiurl+pageindex+apisearch

                $.get( apiurl, function( data2 ) {

                    var resultsnumber = data2.total_results;
                    console.log(apiurl);
                    console.log(data2);

                    for (index = 0; index < resultsnumber ; ++index) {

                        console.log(index);
                        console.log(data2.results[index]);

                        if (data2.results[index].poster_path == null) {
                            $("#results").append("<li><h2>"+data2.results[index].title+"</h2><img src='images/film-icon.jpg'></li>");
                        } else {
                            $("#results").append("<li><h2>"+data2.results[index].title+"</h2><img src=http://image.tmdb.org/t/p/w185/"+data2.results[index].poster_path+"></li>");
                        }
                    }

                });
            }

        } else {

            for (index = 0; index < resultsnumber; ++index) {

                if (data.results[index].poster_path == null) {
                    $("#results").append("<li><h2>"+data.results[index].title+"</h2><img src='images/film-icon.jpg'></li>");
                } else {
                    $("#results").append("<li><h2>"+data.results[index].title+"</h2><img src=http://image.tmdb.org/t/p/w185/"+data.results[index].poster_path+"></li>");
                }
            }

        };

    }, "json" );
});*/