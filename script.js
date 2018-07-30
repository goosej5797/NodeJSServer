
function callApi(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.status == 200) {
        // Typical action to be performed when the document is ready:
        console.log("COMPLETED REQUEST");
        document.getElementById("demo").innerHTML = xhttp.responseText;
    }
    };
    xhttp.open("GET", "api/search?name=Josh", true);
    xhttp.send();
    console.log("SENT THE REQUEST");
}
