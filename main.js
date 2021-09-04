// ==UserScript==
// @name         Block 126 Ads
// @namespace    https://scheimong.net/
// @version      0.1.12
// @updateURL    https://raw.githubusercontent.com/cyqsimon/Block126Ads/master/main.js
// @downloadURL  https://raw.githubusercontent.com/cyqsimon/Block126Ads/master/main.js
// @description  Removes all ads (at least attempt to) from 126 mail
// @author       Scheimong
// @match        https://*.126.com/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

"use strict";

(function () {
    const removeList = [
        // class
        ".gWel-recommend",
        ".gWel-promt",
        ".mailgg",
        ".rd0",
        ".Ab0",
        ".qJ0",
        ".xd0",
        ".tN0",
        ".mailApp",
        ".xH1",
        ".tA1",
        ".rJ0",
        // title
        "[title=网易严选]",
        "[title=携程旅行]",
        "[title=半个电台]",
    ];

    const mutOb = new MutationObserver((mutList, ob) => {
        for (let s of removeList) {
            let eList = document.querySelectorAll(s);
            removeAll(eList);
        }
    });

    mutOb.observe(document, { childList: true, subtree: true });

    function removeAll(eList) {
        for (let e of eList) {
            e.remove();
            console.log("Known ad removed!", e);
        }
    }
})();
