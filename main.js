var map;
var langMarker = "est";
var authorMarker = false;
var markerList = [];
var categoryNames = [];
var autorid = [];
var sissejuhatus = [];
var api = "http://linnamuuseum.tartu.ee/baltisaksa-tartu/wp-json/wp/v2/punkt";
var sissejuhatusAPI = "http://linnamuuseum.tartu.ee/baltisaksa-tartu/wp-json/wp/v2/sissejuhatus";
var autoridAPI = "http://linnamuuseum.tartu.ee/baltisaksa-tartu/wp-json/wp/v2/autor";


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
      gestureHandling: "greedy",
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
        'styled_map']
      }
    };
    //New map
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    infoWindow = new google.maps.InfoWindow;


    //Add marker

    google.maps.event.addListener(map, 'click', function() {
      $("#rightMenu").fadeOut();
      $(".right-menu-author-heading").css("display", "none");
      $(".right-menu-author-text").css("display", "none");
      $(".right-menu-author-picture").css("display", "none");
      $(".right-menu-author-text-ger").css("display", "none");
      $(".right-menu-picture").css("display", "inline");
      authorMarker = false;
    });
    $('#closeRight').click(function() {
      $("#rightMenu").fadeOut();
      $(".right-menu-author-heading").css("display", "none");
      $(".right-menu-author-text").css("display", "none");
      $(".right-menu-author-picture").css("display", "none");
      $(".right-menu-author-text-ger").css("display", "none");
      $(".right-menu-picture").css("display", "inline");
      authorMarker = false;
    });

    $.getJSON(sissejuhatusAPI, function(data){
      $(".right-menu-heading").html("<h3 class='text-center'>"+data[0].title.rendered+"</h3>");
      $(".right-menu-content").html("<p>"+data[0].content.rendered+"</p>");
      $(".right-menu-content-ger").html("<p>"+data[0].acf.saksa_keelne_sissejuhatus+"</p>");
      sissejuhatus.push({
        title: data[0].title.rendered,
        content: data[0].content.rendered,
        titleGer: data[0].acf.saksa_keelne_sissejuhatuse_pealkiri,
        contentGer: data[0].acf.saksa_keelne_sissejuhatus
      });
      $(".right-menu-heading-ger").html("<h3 class='text-center'>"+sissejuhatus[0].titleGer+"</h3>");
    });

    $.getJSON(autoridAPI, function(data){
      for(var i=0; i<data.length; i++) {
        autorid.push({
          id: data[i].id,
          autoriNimi: data[i].title.rendered,
          autoriTekst: data[i].content.rendered,
          autoriTekstGer: data[i].acf.autori_lugu_saksa_keeles,
          autoriPilt: data[i].acf.autori_pilt.url
        });
      };
    });

    $.getJSON(api, function(data){
      for(var i=0;i<data.length;i++){
        var katList = [];
        var gerList = [];
        var autorInfo = [];
        var autorLast = [];
        var helifail = [];
        var videofail = [];
        var latlng = [];
        var pildiURL = [];
/*
        if (typeof data[i].acf.punktiga_seotud_pildid !== "undefined") {
          var idArray = data[i].acf.punktiga_seotud_pildid.split(",");
          for(var i=0; i<idArray.length; i++) {
            $.getJSON("http://linnamuuseum.tartu.ee/baltisaksa-tartu/wp-json/wp/v2/media/"+idArray[i], function(data2){
              pildiURL.push(data2.guid.rendered);
              console.log(data2.guid.rendered);
            });
          };
        };
        */


        if(data[i].acf.kaart !== "") {
          latlng.push(parseFloat(data[i].acf.kaart.lat));
          latlng.push(parseFloat(data[i].acf.kaart.lng));
        }
        else {
          latlng.push(parseFloat(data[i].acf.latitude));
          latlng.push(parseFloat(data[i].acf.longitude));
        }

        if (typeof data[i].pure_taxonomies.kategooriad_saksa_keeles !== "undefined"){
          for(var j=0; j<data[i].pure_taxonomies.kategooriad_saksa_keeles.length; j++){
            gerList.push(data[i].pure_taxonomies.kategooriad_saksa_keeles[j].name);
          }
        }

        if (typeof data[i].pure_taxonomies.kategooriad_eesti_keeles !== "undefined"){
          for(var j=0; j<data[i].pure_taxonomies.kategooriad_eesti_keeles.length; j++){
            katList.push(data[i].pure_taxonomies.kategooriad_eesti_keeles[j].name);
          }
        }

        if (typeof data[i].acf.autor !== "undefined"){
          autorInfo.push(data[i].acf.autor[0].id);
          autorInfo.push(data[i].acf.autor[0].post_title)
          for(autorInfo[0] in autorid) {
            if (autorid.hasOwnProperty(autorInfo[0])){
              autorLast.push(autorid[autorInfo[0]].autoriTekst);
              autorLast.push(autorid[autorInfo[0]].autoriTekstGer);
              autorLast.push(autorid[autorInfo[0]].autoriPilt);
            }
          }
        }

        if (data[i].acf.helifail != false) {
          helifail.push(data[i].acf.helifail.title);
          helifail.push(data[i].acf.helifail.url);
        }

        if (data[i].acf.videofail != false) {
          videofail.push(data[i].acf.videofail.title);
          videofail.push(data[i].acf.videofail.url);
        }

        markerList.push({
          lat: latlng[0],
          lon: latlng[1],
          rightHeading: data[i].title.rendered,
          rightHeadingGer: data[i].acf.pealkiri_saksa_keeles,
          rightContent: data[i].content.rendered,
          rightContentGer: data[i].acf.sisu_saksa_keeles,
          categories: katList,
          categoriesGer: gerList,
          autoriID: autorInfo[0],
          autoriNimi: autorInfo[1],
          autoriTekst: autorLast[0],
          autoriTekstGer: autorLast[1],
          autoriPilt: autorLast[2],
          tolkeAutor: data[i].acf.tõlke_autor,
          eestiTolge: data[i].acf.eesti_keelse_tõlke_ilmumise_aeg,
          ajastu: data[i].acf.kajastatud_ajastu,
          helifailiNimi: helifail[0],
          helifailiUrl: helifail[1],
          videofailiNimi: videofail[0],
          videofailiUrl: videofail[1],
          ajastu: data[i].acf.kajastatud_ajastu,
          tõlkeAutor: data[i].acf.tõlke_autor,
          tõlkeIlmumine: data[i].acf.eesti_keelse_tõlke_ilmumise_aeg
        });
      }
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
        if(langMarker=="est"){
          $(".est-content").css("display", "inline");
          $(".right-menu-meta").css("display", "inline");
        }
        if(langMarker == "ger") {
          $(".ger-content").css("display", "inline");
          $(".right-menu-meta").css("display", "inline");
        }
        $(".right-menu-heading").html("<h3>" + marker.rightHeading + "</h3>");
        $(".right-menu-heading-ger").html("<h3>"+marker.rightHeadingGer+"</h3>")
        $(".right-menu-content").html("<p>"+marker.rightContent+"</p>");
        $(".right-menu-content-ger").html("<p>"+marker.rightContentGer+"</p>");
        $(".right-menu-author").html("Autor: "+marker.autoriNimi);
        $(".right-menu-author-picture").html("<img src='"+marker.autoriPilt+"' class='author-image' />");
        $(".right-menu-author-text").html("<p>"+marker.autoriTekst+"</p>");
        $(".right-menu-author-text-ger").html("<p>"+marker.autoriTekstGer+"</p>");
        $(".right-menu-author-heading").html("<h3>"+marker.autoriNimi+"</h3>");
        $(".right-menu-translation-author").html("Tõlke autor: " + marker.tõlkeAutor);
        $(".right-menu-translation-date").html("Tõlke aasta: "+marker.tõlkeIlmumine);
        $(".right-menu-era").html("Ajastu: "+marker.ajastu);
        $(".right-menu-translation-author-ger").html("Translator: "+marker.tõlkeAutor);
        $(".right-menu-translation-date-ger").html("Date of translation: "+marker.tõlkeIlmumine);
        $(".right-menu-era-ger").html("Era: "+marker.ajastu);

        var kategooriadString = "Kategooriad: ";
        for(var i=0; i<marker.categories.length; i++){
          if (i==marker.categories.length-1){
            kategooriadString+=marker.categories[i];
          }
          else {
            kategooriadString+=marker.categories[i]+", ";
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

  };

  $(".keelGer").click(function(){
    if(authorMarker == false) {
      $(".est-content").css("display", "none");
      $(".right-menu-meta").css("display", "none");
      $(".keelGer").css("display", "none");
      $(".ger-content").css("display", "inline");
      $(".right-menu-meta-ger").css("display", "inline");
      $(".keelEst").css("display", "inline");
      langMarker = "ger";
    }
    else {
      $(".right-menu-author-text").css("display", "none");
      $(".right-menu-author-text-ger").css("display","inline");
      $(".keelGer").css("display", "none");
      $(".keelEst").css("display", "inline");
      langMarker = "ger";
    }

  });

  $(".keelEst").click(function(){
    if(authorMarker == false) {
      $(".ger-content").css("display", "none");
      $(".right-menu-meta-ger").css("display", "none");
      $(".keelEst").css("display", "none");
      $(".est-content").css("display", "inline");
      $(".right-menu-meta").css("display", "inline");
      $(".keelGer").css("display", "inline");
      langMarker = "est";
    }
    else {
      $(".right-menu-author-text-ger").css("display", "none");
      $(".right-menu-author-text").css("display","inline");
      $(".keelEst").css("display", "none");
      $(".keelGer").css("display", "inline");
      langMarker = "est";
    }

  });

  $(".right-menu-author").click(function(){
    $(".ger-content").css("display", "none");
    $(".est-content").css("display", "none");
    $(".right-menu-author-picture").css("display", "inline");
    $(".right-menu-author-heading").css("display", "inline");
    $(".right-menu-author-text").css("display", "inline");
    authorMarker = true;
  });

  $(".left-menu-tutvustus").click(function(){
    authorMarker=false;
    $("#rightMenu").fadeIn();
    $("ger-content").css("display", "none");
    $(".right-menu-content-ger").html("<p>"+sissejuhatus[0].contentGer+"</p>");
    $(".right-menu-heading-ger").html("<h3 class='text-center'>"+sissejuhatus[0].titleGer+"</h3>");
    $(".right-menu-heading").css("display", "inline");
    $(".right-menu-heading").html("<h3 class='text-center'>"+sissejuhatus[0].title+"</h3>");
    $(".right-menu-content").css("display", "inline");
    $(".right-menu-content").html("<p>"+sissejuhatus[0].content+"</p>");
    $(".right-menu-categories").css("display","none");
    $(".right-menu-picture").css("display", "none");
    $(".right-menu-author-picture").css("display", "none");
    $(".right-menu-author-heading").css("display", "none");
    $(".right-menu-author-text").css("display", "none");
    $(".right-menu-meta").css("display", "none");
    $(".right-menu-meta-ger").css("display", "none");
  });

  function openNav() {
    document.getElementById("side-nav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("side-nav").style.width = "0";
  }
