<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Kaardirakendus</title>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="http://kaart.1473350.ee/wp-content/themes/kaart-3/style.css" />
</head>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAs8Bmb6fzACSu3RDyMWV7JVxrXKp6D9o&callback=initMap" type="text/javascript"></script>

<body onload="initialize();">
  <div id="container">
    <div id="nav">Nav Menu</div>
    <h1>Kaardirakendus</h1>
    <div id="map"></div>
  </div>

  <script>
  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(58.382014, 26.728904),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 15
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  };
  </script>
</body>
</html>
