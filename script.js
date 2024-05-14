// Function to open a specific tab content
function openTab(evt, tabName) {
    // Get all elements with class="tabcontent" and hide them
    var tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach(function(item) {
        item.style.display = "none";
    });

    // Get all elements with class="tablinks" and remove the class "active"
    var tablinks = document.querySelectorAll(".tablinks");
    tablinks.forEach(function(item) {
        item.classList.remove("active");
    });

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}
