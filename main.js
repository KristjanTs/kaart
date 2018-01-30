var map;
var markerList = [];
var categories = [];
var categoryNames = [];
var api = "https://kaart.1473350.ee/wp-json/wp/v2/posts";
var sissejuhatusAPI = "https://kaart.1473350.ee/wp-json/wp/v2/sissejuhatus";
var kategooriadAPI ="https://kaart.1473350.ee/wp-json/wp/v2/categories";


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
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
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
        categories.push(data[i].id);
        categoryNames.push(data[i].name);
        $("#collapse-kategooriad").append("<div class='card card-block' id='side-nav-kategooriad'>"+ data[i].name +"</div>");
      };
    });


    $.getJSON(api, function(data){
      for(var i=0;i<data.length;i++){
        var gerList = [];
        if (typeof data[i].pure_taxonomies.kategooriad_saksa_keeles !== "undefined"){
          for(var j=0; j<data[i].pure_taxonomies.kategooriad_saksa_keeles.length; j++){
            gerList.push(data[i].pure_taxonomies.kategooriad_saksa_keeles[j].name);
          }
        }

        //for(var j=0; j<data[i].pure_taxonomies.kategooriad_saksa_keeles.length;j++){
          //categoriesGer.push(data[i].pure_taxonomies.kategooriad_saksa_keeles[j]);
        //}
        markerList.push({
          lat: data[i].acf.kaart.lat,
          lon: data[i].acf.kaart.lng,
          rightHeading: data[i].title.rendered,
          rightHeadingGer: data[i].acf.pealkiri_saksa_keeles,
          rightContent: data[i].content.rendered,
          rightContentGer: data[i].acf.sisu_saksa_keeles,
          categories: data[i].categories,
          categoriesGer: gerList
        });
      }
      console.log(markerList[0].categoriesGer);
      for (var i = 0; i < markerList.length; i++) {
          addMarker(markerList[i]);
      }
    });


  };

  function addMarker(marker) {
    var marker1 = new google.maps.Marker({
      title: marker.rightHeading,
      position: new google.maps.LatLng(marker.lat, marker.lon),
      map: map,
      icon: "https://kaart.1473350.ee/wp-content/uploads/2018/01/map.png"
    });


    google.maps.event.addListener(marker1, 'click', (function (marker1) {
      return function () {
        $("#rightMenu").fadeIn();
        $(".right-menu-heading").html("<h3>" + marker.rightHeading + "</h3>");
        $(".right-menu-heading-ger").html("<h3>"+marker.rightHeadingGer+"</h3>")
        $(".right-menu-content").html("<p>"+marker.rightContent+"</p>");
        $(".right-menu-content-ger").html("<p>"+marker.rightContentGer+"</p>");
        var kategooriadString = "Kategooriad: ";
        for(var i=0; i<marker.categories.length; i++){
          if (i==marker.categories.length-1){
            kategooriadString+=(categoryNames[categories.indexOf(marker.categories[i])]);
          }
          else {
            kategooriadString+=(categoryNames[categories.indexOf(marker.categories[i])]+", ");
          }
        }
        $(".right-menu-categories").html(kategooriadString);
        var kategooriadStringGer = "Kategorien: ";
        for(var i=0;i<marker.categoriesGer.length; i++){
          if (i==marker.categoriesGer.length-1){
            kategooriadStringGer+=marker.categoriesGer[i];
          }
          else {
            kategooriadStringGer+=marker.categoriesGer[i]+", ";
          }
        }
        $(".right-menu-categories-ger").html(kategooriadStringGer);
      }
    })(marker1));

  }

  $(".keelGer").click(function(){
    $(".right-menu-content").css("display", "none");
    $(".right-menu-heading").css("display", "none");
    $(".right-menu-categories").css("display","none");
    $(".keelGer").css("display", "none");
    $(".right-menu-heading-ger").css("display", "inline");
    $(".right-menu-content-ger").css("display", "inline");
    $(".right-menu-categories-ger").css("display","inline");
    $(".keelEst").css("display", "inline");
  })

  $(".keelEst").click(function(){
    $(".right-menu-content-ger").css("display", "none");
    $(".right-menu-heading-ger").css("display", "none");
    $(".right-menu-categories-ger").css("display","none");
    $(".keelEst").css("display", "none");
    $(".right-menu-heading").css("display", "inline");
    $(".right-menu-content").css("display", "inline");
    $(".right-menu-categories").css("display","inline");
    $(".keelGer").css("display", "inline");
  })

  function openNav() {
    document.getElementById("side-nav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("side-nav").style.width = "0";
  }
