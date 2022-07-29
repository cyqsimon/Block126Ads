// ==UserScript==
// @name         Block 126 Ads
// @namespace    https://scheimong.net/
// @version      0.2.0
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
        "[title=企业邮箱]",
    ];

    const mutOb = new MutationObserver((mutList, ob) => {
        let allSelections = removeList.flatMap((s) => Array.from(document.querySelectorAll(s)).map((el) => [s, el]));
        let uniqueElements = new Set(allSelections.map(([s, el]) => el));

        if (uniqueElements.size != 0) {
            let elementSelectorTable = Array
                .from(uniqueElements)
                .flatMap((el0) => {
                    let subTable = allSelections
                        .filter(([s, el1]) => el0 === el1)
                        .map(([s, el1]) => ({selectedBy: s}));
                    subTable[0].element = el0;
                    return subTable;
                });

            uniqueElements.forEach(el => el.remove());

            console.log(`${uniqueElements.size} known ad(s) removed!`);
            console.table(elementSelectorTable, ["element", "selectedBy"]);
        }
    });
    mutOb.observe(document, { childList: true, subtree: true });
})();
