// ==UserScript==
// @name         Amazon Prime Video XRay Remover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes XRay elements from Amazon Prime Video
// @author       Durmuş Karaca
// @match        https://www.amazon.com/*/video/*
// @match        https://www.primevideo.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const xrayClasses = [
        'collapsibleXrayVodHeader',
        'xrayQuickView',
        'xray-container',
        'webPlayerXrayContainer',
        'xray-overlay',
        'xray-panel'
    ];

    function removeXrayElements() {
        xrayClasses.forEach(className => {
            const elements = document.getElementsByClassName(className);
            while (elements.length > 0) {
                elements[0].remove();
            }
        });
    }

    // Watch for DOM changes
    const observer = new MutationObserver((mutations) => {
        removeXrayElements();
    });

    // Handle page load
    document.addEventListener('DOMContentLoaded', () => {
        removeXrayElements();
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

    // Handle SPA navigation
    window.addEventListener('popstate', removeXrayElements);
    window.addEventListener('pushstate', removeXrayElements);
    window.addEventListener('replacestate', removeXrayElements);
})();