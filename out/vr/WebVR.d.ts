/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Based on @tojiro's vr-samples-utils.js
 */
declare var WEBVR: {
    createButton: (renderer: any) => HTMLButtonElement | HTMLAnchorElement;
    checkAvailability: () => void;
    getMessageContainer: () => HTMLDivElement;
    getButton: () => HTMLDivElement;
    getVRDisplay: () => void;
};
