chrome.storage.sync.get("remove_yt_shorts").then((promise) => {
    if(promise.remove_yt_shorts === true || promise.remove_yt_shorts === undefined) {
        var retry_counter = 0;
        async function removeShortsFromRecommended() {
            var query = document.querySelectorAll('[is-shorts=""]');
            if(query.length == 0) {
                retry_counter++;
                if(retry_counter == 10) {
                    return;
                }
                setTimeout(removeShortsFromRecommended, 100);
            }else {
                query.forEach((element) => {
                    element.remove();
                });
            } 
        }
        async function removeShortsMenu() {
            var query = document.querySelectorAll("#items ytd-guide-entry-renderer");
            if(query.length < 1) {
                setTimeout(removeShortsMenu, 100);
            }else {
                query[1].remove();
            }
        }
        async function removeShortsMenuOnSmallerScreen() {
            var query = document.querySelectorAll(".ytd-mini-guide-renderer ytd-mini-guide-entry-renderer");
            if(query.length < 1) {
                setTimeout(removeShortsMenuOnSmallerScreen, 100);
            }else {
                query[1].remove();
            }
        }
        const startRemoval = async function() {
            await Promise.all([removeShortsFromRecommended(), removeShortsMenu(), removeShortsMenuOnSmallerScreen()]).then((promise) => {
                console.log("Removed YT Shorts");
            }).catch((error) => {
                console.error(error);
            });
        }
        startRemoval();
    }
});