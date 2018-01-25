<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Kaardirakendus</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://kaart.1473350.ee/wp-content/themes/kaart-3/style.css" />
</head>

<body>
  <div id="container">
    <div id="nav2">
      <a href="https://www.linnamuuseum.tartu.ee"><img id="pilt" src="https://kaart.1473350.ee/wp-content/uploads/2018/01/linnamuuseum.png" /></a>
    </div>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-0 col-xs-0">

      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div id="rightMenu">
          <button type='button' class='btn btn-danger btn-sm' id='closeRight'>Sulge</button>
          <button type="button" class="btn btn-primary btn-sm keelEst">Est</button>
          <button type="button" class="btn btn-primary btn-sm keelGer">Ger</button> <br  />
          <div class="right-menu-heading">
          </div>
          <div class="right-menu-content">
          </div>
          <div class="right-menu-content-ger">
          </div>
        </div>
      </div>
    </div>

    <div id="map"></div>
  </div>

  <script>
  function initMap() {
    //Map style
    var styledMapType = new google.maps.StyledMapType(
      [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{color: '#c9b2a6'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{color: '#dcd2be'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{color: '#ae9e90'}]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#93817c'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{color: '#a5b076'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#447530'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#f5f1e6'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#fdfcf8'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#f8c967'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#e9bc62'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{color: '#e98d58'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{color: '#db8555'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#806b63'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{color: '#8f7d77'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#ebe3cd'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#b9d3c2'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#92998d'}]
        }
      ],
      {name: 'Styled Map'});



      //Map options
      var mapOptions = {
        center: new google.maps.LatLng(58.382014, 26.728904),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        minZoom: 14,
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
          'styled_map']
        }
      };
      //New map
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');



      //Add marker



      google.maps.event.addListener(map, 'click', function() {
        $("#rightMenu").fadeOut();
      });
      $('#closeRight').click(function() {
        $("#rightMenu").fadeOut();
      });

      var api = "https://kaart.1473350.ee/wp-json/wp/v2/posts";
      $.getJSON(api, function(data){
        for(var i=0;i<data.length;i++){
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].acf.lat, data[i].acf.lon),
            map: map,
            title: data[i].title.rendered,
            icon: "https://kaart.1473350.ee/wp-content/uploads/2018/01/map.png"

          });

          var infowindow = new google.maps.InfoWindow({
            content: data[i].content.rendered
          });

          google.maps.event.addListener(marker, 'click', function(marker, i) {
            return function() {
              //changeText();
              infowindow.setContent(data[i].content.rendered + "");
              $("#rightMenu").fadeIn();
              $(".right-menu-heading").html("<h3>" + data[i].title.rendered + "</h3>");
              $(".right-menu-content").html("<p>"+data[i].content.rendered+"</p>");
              $(".right-menu-content-ger").html("<p>"+data[i].acf.sisu_saksa_keeles+"</p>")
            }
          }(marker, i));
        }
        console.log(data.length);
      })
    };

    $(".keelGer").click(function(){
      $(".right-menu-content").css("display", "none");
      $(".right-menu-content-ger").css("display", "inline");
    })

    $(".keelEst").click(function(){
      $(".right-menu-content-ger").css("display", "none");
      $(".right-menu-content").css("display", "inline");
    })





    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAs8Bmb6fzACSu3RDyMWV7JVxrXKp6D9o&callback=initMap" type="text/javascript"></script>

  </body>
  </html>
