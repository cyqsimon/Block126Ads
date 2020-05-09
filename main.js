// ==UserScript==
// @name         Block 126 Ads
// @namespace    https://scheimong.net/
// @version      0.1.8
// @updateURL    https://raw.githubusercontent.com/cyqsimon/Block126Ads/master/main.js
// @downloadURL  https://raw.githubusercontent.com/cyqsimon/Block126Ads/master/main.js
// @description  Removes all ads (at least attempt to) from 126 mail
// @author       Scheimong
// @match        https://*.126.com/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

"use strict";

(function() {
    const remove_by_class = ["gWel-recommend", "gWel-promt", "mailgg", "rd0", "Ab0", "qJ0", "xd0", "tN0", "mailApp", "xH1", "tA1"];
    const remove_by_title = ["网易严选", "携程旅行", "半个电台"];
    const remove_by_selector = [];

    const mutOb = new MutationObserver((mutList, ob) => {
        for(let c of remove_by_class) {
            let eList = document.querySelectorAll(`.${c}`);
            tryRemoveAll(eList);
        }

        for(let t of remove_by_title) {
            let eList = document.querySelectorAll(`[title=${t}]`);
            tryRemoveAll(eList);
        }

        for(let s of remove_by_selector) {
            let eList = document.querySelectorAll(s);
            tryRemoveAll(eList);
        }
    });

    mutOb.observe(document, {childList: true, subtree: true});

    function tryRemoveAll(eList) {
        if(eList.length == 0) { // Not yet in DOM
            return false;
        }
        else { // Remove
            for(let e of eList) {
                e.remove();
                console.log(`Known ad removed! ${e}`);
            }
            return true;
        }
    }
})();
