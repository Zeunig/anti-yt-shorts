chrome.storage.sync.get("remove_yt_shorts").then((promise) => {
    if(promise.remove_yt_shorts === true || promise.remove_yt_shorts === undefined) {
        window.location.href = window.location.href.replace("shorts/", "watch?v=");
    }
});