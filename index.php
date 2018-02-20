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
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <div id="container">
    <div class="side-nav" id="side-nav">
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a href="#" class="left-menu-tutvustus"><h3>Tutvustus</h3></a>
      <a data-toggle="collapse" href="#collapse-kategooriad" aria-expanded="false" aria-controls="collapse-kategooriad"><h3>Kategooriad</h3></a>
      <div class="collapse" id="collapse-kategooriad">
      </div>
      <a href="#" onClick="openModal();"><h3>Ajaloolised kaardid</h3></a>
    </div>
    <div id="nav2">
      <span id="menu-burger" style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>
      <a href="https://www.linnamuuseum.tartu.ee"><img id="pilt" src="https://kaart.1473350.ee/wp-content/uploads/2018/01/linnamuuseum.png" /></a>
    </div>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-0 col-xs-0">

      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div id="rightMenu">
          <a href="#" id="closeRight">&times;</a>
          <img class="float-right keelEst" src="https://kaart.1473350.ee/wp-content/uploads/2018/02/est-flag.png" />
          <img class="float-right keelGer" src="https://kaart.1473350.ee/wp-content/uploads/2018/02/flag-ger.png" /><br  />
          <div class="est-content">
            <div class="right-menu-heading">
            </div>
            <div class="right-menu-content">
            </div>
            <div class="right-menu-categories">
            </div>
          </div>
          <div class="ger-content">
            <div class="right-menu-heading-ger">
            </div>
            <div class="right-menu-content-ger">
            </div>
            <div class="right-menu-categories-ger">
            </div>
          </div>
          <div class="right-menu-author-heading">
          </div>
          <div class="right-menu-author-picture">
          </div>
          <div class="right-menu-meta">
            <div class="right-menu-translation-author">
            </div>
            <div class="right-menu-translation-date">
            </div>
            <div class="right-menu-era">
            </div>
            <div class="right-menu-author">
            </div>
          </div>
          <div class="right-menu-meta-ger">
            <div class="right-menu-translation-author-ger">
            </div>
            <div class="right-menu-translation-date-ger">
            </div>
            <div class="right-menu-era-ger">
            </div>
            <div class="right-menu-author">
            </div>
          </div>

          <div class="right-menu-author-text-ger">
          </div>
          <div class="right-menu-author-text">
          </div>
        </div>
      </div>
    </div>

    <div id="map"></div>
  </div>

  <script src="main.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAs8Bmb6fzACSu3RDyMWV7JVxrXKp6D9o&callback=initMap" type="text/javascript"></script>

</body>
</html>
