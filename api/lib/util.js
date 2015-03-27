var Util = {
    transformKeys: function(keysMap, obj) {
        var result = {};
        for (var key in obj) {
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
    },

    stringifyFields: function(fields) {
        if (typeof fields != "object") return false;
        var str = '';
        fields.forEach(function(field, i) {
            if (typeof field == 'object') {
                for (var key in field) {
                    var subStr = '(' + this.stringifyFields(field[key]) + ')';
                    str += (key + subStr);
                }
            } else {
                str += field;
            };

            if (i != (fields.length - 1)) {
                str += ',';
            };
        }.bind(this));
        return str;
    }
}

module.exports = Util;
