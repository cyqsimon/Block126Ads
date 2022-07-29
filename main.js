// ==UserScript==
// @name         Block 126 Ads
// @namespace    https://scheimong.net/
// @version      0.1.14
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
        ".Ab0",
        ".gWel-promt",
        ".gWel-recommend",
        ".mailApp",
        ".mailgg",
        ".qJ0",
        ".rd0",
        ".tA1",
        ".tN0",
        ".xd0",
        ".xH1",
        // id
        "#_mail_component_128_128",
        // title
        "[title=半个电台]",
        "[title=网易严选]",
        "[title=携程旅行]",
    ];

    const mutOb = new MutationObserver((mutList, ob) => {
        let allSelected = removeList.flatMap((s) => Array.from(document.querySelectorAll(s)));
        let allSelectedUnique = new Set(allSelected);

        if (allSelectedUnique.size != 0) {
            allSelectedUnique.forEach((el) => el.remove());
            console.log(`${allSelectedUnique.size} known ad(s) removed!`);
        }
    });
    mutOb.observe(document, { childList: true, subtree: true });
})();
