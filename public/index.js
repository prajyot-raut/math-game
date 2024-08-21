if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered.");
        console.log(registration);
    }).catch(error => {
        console.log("SW failed.");
        console.log(error);
    })
} else {
    alert("Your browser don't support Service Worker.");
}