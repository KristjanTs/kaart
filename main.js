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

    var markerList = [];
    var api = "https://kaart.1473350.ee/wp-json/wp/v2/posts";
    var sissejuhatusAPI = "https://kaart.1473350.ee/wp-json/wp/v2/sissejuhatus";
    var kategooriadAPI ="https://kaart.1473350.ee/wp-json/wp/v2/categories";

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

    $.getJSON(sissejuhatusAPI, function(data){
      $(".right-menu-heading").html("<h3 class='text-center'>"+data[0].title.rendered+"</h3>");
      $(".right-menu-content").html("<p>"+data[0].content.rendered+"</p>");
      $(".right-menu-content-ger").html("<p>"+data[0].acf.saksa_keelne_sissejuhatus+"</p>");
    });

    $.getJSON(kategooriadAPI, function(data){
      for(var i=0; i<data.length; i++) {
        $("#collapse-kategooriad").append("<div class='card card-block' id='side-nav-kategooriad'>"+ data[i].name +"</div>");
      };
    });

    $.getJSON(api, function(data){
      for(var i=0;i<data.length;i++){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(data[i].acf.kaart.lat, data[i].acf.kaart.lng),
          map: map,
          title: data[i].title.rendered,
          icon: "https://kaart.1473350.ee/wp-content/uploads/2018/01/map.png"

        });
        markerList.push({
          lat: data[i].acf.kaart.lat,
          lon: data[i].acf.kaart.lng,
          rightHeading: data[i].title.rendered,
          rightHeadingGer: data[i].acf.pealkiri_saksa_keeles,
          rightContent: data[i].acf.sisu_saksa_keeles,
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
            $(".right-menu-heading-ger").html("<h3>"+data[i].acf.pealkiri_saksa_keeles+"</h3>")
            $(".right-menu-content").html("<p>"+data[i].content.rendered+"</p>");
            $(".right-menu-content-ger").html("<p>"+data[i].acf.sisu_saksa_keeles+"</p>")
            if(data[i].acf.pilt != undefined){
              $(".right-menu-picture").html("<img src="+data[i].acf.pilt+" class='img-fluid text-center' 'alt=Responsive image'>");
            }
          }
        }(marker, i));
      }
      console.log(data.length);
      console.log(markerList);
    })
  };

  $(".keelGer").click(function(){
    $(".right-menu-content").css("display", "none");
    $(".right-menu-heading").css("display", "none");
    $(".right-menu-heading-ger").css("display", "inline");
    $(".right-menu-content-ger").css("display", "inline");
  })

  $(".keelEst").click(function(){
    $(".right-menu-content-ger").css("display", "none");
    $(".right-menu-heading-ger").css("display", "none");
    $(".right-menu-heading").css("display", "inline");
    $(".right-menu-content").css("display", "inline");
  })

  function openNav() {
    document.getElementById("side-nav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("side-nav").style.width = "0";
  }

  $()