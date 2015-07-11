var { Map, Seq } = require('immutable');

function key(prop) {
    return /^\d+$/.test(prop) ? +prop : prop;
}

function NumberKeyedMap(obj, converter) {
    var map = Map();
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            map = map.set(key(i), converter(obj[i]));
        }
    }
    return map;
}

/**
 * Forced into this situation by the limitations of JavaScript, and the semantics
 * of Immutable.js.
 *
 * Basically, since we are using Numbers as keys in maps in our stores, we have
 * broken Serialize/Deserialize when using JSON as the serialization strategy, since
 * when parsing JSON, numbered keys will end up as strings.
 *
 * This fromJS function will turn all-digit-keys into proper numbers.
 * @param json
 * @returns {Immutable.Map|Immutable.List}
 */
export default function fromJSSpecial(json) {
    if (json && (json.constructor === Object || json.constructor === undefined)) {
        return NumberKeyedMap(json, fromJSSpecial);
    }
    if (Array.isArray(json)) {
        return Seq.Indexed(json).map(fromJSSpecial).toList();
    }
    return json;
}