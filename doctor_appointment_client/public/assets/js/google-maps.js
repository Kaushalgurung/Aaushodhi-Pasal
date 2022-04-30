function initMap() {
    // Latitude and Longitude
    var myLatLng = { lat: -34.397, lng: 150.644 };

    var map = new google.maps.Map(document.getElementById('google-maps'), {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Kathmandu, Nepal' // Title Location
    });
}