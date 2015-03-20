var Util = {
    transformKeys: function (keysMap, obj) {
        var result = {};
        for(var key in obj) {
            if (obj.hasOwnProperty(key) && keysMap.hasOwnProperty(key)) {
                var newKey = keysMap[key];
                if (typeof(newKey) == "object") {
                    result[key] = this.transformKeys(newKey, obj[key])
                } else {
                    result[newKey] = obj[key];
                }
            } else {
                result[key] = obj[key];
            };
        };
        return result;
    }

}

module.exports = Util;
