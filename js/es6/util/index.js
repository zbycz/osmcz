// export { utilAsyncMap } from './util';
// export { utilDisplayName } from './util';
// export { utilDisplayNameForPath } from './util';
// export { utilDisplayType } from './util';
// export { utilEditDistance } from './util';
// export { utilEntitySelector } from './util';
// export { utilEntityOrMemberSelector } from './util';
// export { utilFastMouse } from './util';
// export { utilFunctor } from './util';
// export { utilGetAllNodes } from './util';
// export { utilGetPrototypeOf } from './util';
// export { utilGetSetValue } from './get_set_value';
// export { utilNoAuto } from './util';
// export { utilPrefixCSSProperty } from './util';
// export { utilPrefixDOMProperty } from './util';
// export { utilQsString } from './util';
// export { utilRebind } from './rebind';
// export { utilSetTransform } from './util';
// export { utilSessionMutex } from './session_mutex';
// export { utilStringQs } from './util';
// export { utilSuggestNames } from './suggest_names';
// export { utilTagText } from './util';
// export { utilTriggerEvent } from './trigger_event';
// export { utilWrap } from './util';



// Calculates Levenshtein distance between two strings
// see:  https://en.wikipedia.org/wiki/Levenshtein_distance
// first converts the strings to lowercase and replaces diacritic marks with ascii equivalents.
export function utilEditDistance(a, b) {
    a = removeDiacritics(a.toLowerCase());
    b = removeDiacritics(b.toLowerCase());
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    var matrix = [];
    for (var i = 0; i <= b.length; i++) { matrix[i] = [i]; }
    for (var j = 0; j <= a.length; j++) { matrix[0][j] = j; }
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i-1) === a.charAt(j-1)) {
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                    Math.min(matrix[i][j-1] + 1, // insertion
                        matrix[i-1][j] + 1)); // deletion
            }
        }
    }
    return matrix[b.length][a.length];
}



function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007e]/g, function(c) {
        return diacriticsMap[c] || c;
    });
}
