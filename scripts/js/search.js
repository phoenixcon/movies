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

                    var movietitle = data.results[index].title;
                    var movieposter = data.results[index].poster_path;
                    var movieoverview = data.results[index].overview;
                    var movieid = data.results[index].id;


                    //IF THERE IS NO POSTER
                    if ( movieposter == null ) {

                        $("#results").append("<li><h2>"+movietitle+"</h2><div class='movieinfo'><img src='images/film-icon.jpg'><span class='overview'>"+movieoverview+"</span><div class='moviebuttons'><span data-movieid='"+movieid+"' data-movietitle='"+movietitle+"' data-posterpath='"+movieposter+"' data-overview='"+movieoverview+"'>Add to Coming Soon</span></div></div></li>");

                        //IF THERE IS A POSTER
                    } else {

                        $("#results").append("<li><h2>"+movietitle+"</h2><div class='movieinfo'><img src=http://image.tmdb.org/t/p/w185/"+movieposter+"><span class='overview'>"+movieoverview+"</span><div class='moviebuttons'><span data-movieid='"+movieid+"' data-movietitle='"+movietitle+"' data-posterpath='"+movieposter+"' data-overview='"+movieoverview+"'>Add to Coming Soon</span></div></div></li>");

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

                            var movietitle = data.results[index].title;
                            var movieposter = data.results[index].poster_path;
                            var movieoverview = data.results[index].overview;
                            var movieid = data.results[index].id;

                            //IF THERE IS NO POSTER
                            if ( movieposter == null ) {

                                $("#results").append("<li><h2>"+movietitle+"</h2><div class='movieinfo'><img src='images/film-icon.jpg'><span class='overview'>"+movieoverview+"</span><div class='moviebuttons'><span data-movieid='"+movieid+"' data-movietitle='"+movietitle+"' data-posterpath='"+movieposter+"' data-overview='"+movieoverview+"'>Add to Coming Soon</span></div></div></li>");

                                //IF THERE IS A POSTER
                            } else {

                                $("#results").append("<li><h2>"+movietitle+"</h2><div class='movieinfo'><img src=http://image.tmdb.org/t/p/w185/"+movieposter+"><span class='overview'>"+movieoverview+"</span><div class='moviebuttons'><span data-movieid='"+movieid+"' data-movietitle='"+movietitle+"' data-posterpath='"+movieposter+"' data-overview='"+movieoverview+"'>Add to Coming Soon</span></div></div></li>");

                            }

                        }

                    });

                }

            }

        });

        $('#results').on('click', '.moviebuttons span', function(){
            var movieid = $(this).data('movieid');
            var posterpath = $(this).data('posterpath');
            var title = $(this).data('movietitle');
            var overview = $(this).data('overview');
            console.log(movieid);
            console.log(title);
            console.log(posterpath);
            console.log(overview);

            var submitstring = "movieid="+movieid+"&movietitle="+title+"&posterpath="+posterpath+"&overview="+overview;
            
            console.log(submitstring);

            $.ajax({
                type     : 'POST',
                url      : 'scripts/php/handler.php',
                data     : submitstring,
                dataType : 'json',
                encode   : true
            })

                .done (function(data) {

                console.log(data);

            });
        });

    });

});