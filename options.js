function handle(cb) {
    console.log(chrome.storage);
    chrome.storage.sync.get("remove_yt_shorts").then((promise) => {
        var remove_yt_shorts = promise.remove_yt_shorts;
        if(remove_yt_shorts === undefined || remove_yt_shorts === false) {
            chrome.storage.sync.set({
                remove_yt_shorts: true,
            });
        }else if (remove_yt_shorts === true) {
            chrome.storage.sync.set({
                remove_yt_shorts: false,
            });
        }else {
            console.warn("If storage.remove_yt_shorts isn't undefined,false or true, then wtf is it? It's " + remove_yt_shorts + "\nanyways, resetting it to true");
            chrome.storage.sync.set({
                remove_yt_shorts: true,
            });
        }
        changeColor();
        chrome.tabs.query({}, function(tabs) {
            for(tab in tabs) {
                if(tabs[tab].url.includes("youtube.com")) {
                    chrome.tabs.reload(tabs[tab].id);
                }
            }
        });
    });
    
    
}
function changeColor() {
    chrome.storage.sync.get("remove_yt_shorts").then((promise) => {
        console.log(promise.remove_yt_shorts);
        if(promise.remove_yt_shorts === true) {
            document.getElementById("removal").style.backgroundColor = "green";
        }else {
            document.getElementById("removal").style.backgroundColor = "red";
    
        }
    });
}
document.getElementById("removal").addEventListener("click", handle);
changeColor();