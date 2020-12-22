// ==UserScript==
// @name         Block 126 Ads
// @namespace    https://scheimong.net/
// @version      0.1.9
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
    const removeByClass = [
        "gWel-recommend",
        "gWel-promt",
        "mailgg",
        "rd0",
        "Ab0",
        "qJ0",
        "xd0",
        "tN0",
        "mailApp",
        "xH1",
        "tA1",
    ];
    const removeByTitle = [
        "网易严选",
        "携程旅行",
        "半个电台",
    ];
    const removeBySelector = [];

    const mutOb = new MutationObserver((mutList, ob) => {
        for (let c of removeByClass) {
            let eList = document.querySelectorAll(`.${c}`);
            tryRemoveAll(eList);
        }

        for (let t of removeByTitle) {
            let eList = document.querySelectorAll(`[title=${t}]`);
            tryRemoveAll(eList);
        }

        for (let s of removeBySelector) {
            let eList = document.querySelectorAll(s);
            tryRemoveAll(eList);
        }
    });

    mutOb.observe(document, { childList: true, subtree: true });

    function tryRemoveAll(eList) {
        if (eList.length == 0) { // Not yet in DOM
            return false;
        }
        else { // Remove
            for (let e of eList) {
                e.remove();
                console.log("Known ad removed!", e);
            }
            return true;
        }
    }
})();
