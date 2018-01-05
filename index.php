<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JSON1 and AJAX</title>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="http://kaart.1473350.ee/wp-content/themes/kaart-3/style.css" />
</head>
<script src="http://maps.google.com/maps/api/js?sensor=false&libraries=places" type="text/javascript"></script>

<body onload="initialize();">
  <div id="container">
    <div id="nav">Nav Menu</div>
    <div id="map"></div>
  </div>

  <script>
  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(40.435833800555567, -78.44189453125),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 11
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  };
  </script>
</body>
</html>
