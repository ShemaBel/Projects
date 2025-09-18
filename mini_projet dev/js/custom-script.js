document.addEventListener("DOMContentLoaded", function() {
    var tiltInstance = null;

    document.getElementById("closeButton").addEventListener("click", function() {
        if (tiltInstance) {
            tiltInstance.destroy();
            tiltInstance = null;
        }
    });
    document.getElementById("startButton").addEventListener("click", function() {
        if (!tiltInstance) {
            VanillaTilt.init(document.querySelector("[data-tilt]"));
            tiltInstance = document.querySelector("[data-tilt]").vanillaTilt;
        }
    });
});
