(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vkbeautify"), require("x2js"));
	else if(typeof define === 'function' && define.amd)
		define("jasmine-snapshot", ["vkbeautify", "x2js"], factory);
	else if(typeof exports === 'object')
		exports["jasmine-snapshot"] = factory(require("vkbeautify"), require("x2js"));
	else
		root["jasmine-snapshot"] = factory(root["vkbeautify"], root["x2js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var nativeWarn = console.warn;
console.warn = function () {
    if ((arguments.length > 0)
        && (typeof arguments[0] === "string")
        && (arguments[0].indexOf("[xmldom ") !== -1)) {
        return;
    }
    nativeWarn.apply(console, arguments);
};
var nativeError = console.error;
console.error = function () {
    if ((arguments.length > 0)
        && (typeof arguments[0] === "string")
        && (arguments[0].indexOf("entity not found") !== -1)) {
        return;
    }
    nativeError.apply(console, arguments);
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceMatcherModel = void 0;
var SequenceMatcherModel = (function () {
    function SequenceMatcherModel(a, b) {
        this.a = a;
        this.b = b;
        this._chainB();
    }
    SequenceMatcherModel.prototype.GetGroupedOpcodes = function () {
        var codes, group, groups, i1, i2, j1, j2, nn, tag, _i, _len, _ref, _ref1, _ref2, _ref3;
        var n = 3;
        codes = this.getOpCodes();
        if (!codes.length) {
            codes = [["equal", 0, 1, 0, 1]];
        }
        if (codes[0][0] === "equal") {
            _ref = codes[0];
            tag = _ref[0];
            i1 = _ref[1];
            i2 = _ref[2];
            j1 = _ref[3];
            j2 = _ref[4];
            codes[0] = [tag, Math.max(i1, i2 - n), i2, Math.max(j1, j2 - n), j2];
        }
        if (codes[codes.length - 1][0] === "equal") {
            _ref1 = codes[codes.length - 1];
            tag = _ref1[0];
            i1 = _ref1[1];
            i2 = _ref1[2];
            j1 = _ref1[3];
            j2 = _ref1[4];
            codes[codes.length - 1] = [tag, i1, Math.min(i2, i1 + n), j1, Math.min(j2, j1 + n)];
        }
        nn = n + n;
        groups = [];
        group = [];
        for (_i = 0, _len = codes.length; _i < _len; _i++) {
            _ref2 = codes[_i];
            tag = _ref2[0];
            i1 = _ref2[1];
            i2 = _ref2[2];
            j1 = _ref2[3];
            j2 = _ref2[4];
            if (tag === "equal" && i2 - i1 > nn) {
                group.push([tag, i1, Math.min(i2, i1 + n), j1, Math.min(j2, j1 + n)]);
                groups.push(group);
                group = [];
                _ref3 = [Math.max(i1, i2 - n), Math.max(j1, j2 - n)];
                i1 = _ref3[0];
                j1 = _ref3[1];
            }
            group.push([tag, i1, i2, j1, j2]);
        }
        if (group.length && !(group.length === 1 && group[0][0] === "equal")) {
            groups.push(group);
        }
        return groups;
    };
    SequenceMatcherModel.prototype.getOpCodes = function () {
        var ai, answer, bj, i, j, size, tag, _i, _len, _ref, _ref1, _ref2;
        i = j = 0;
        answer = [];
        _ref = this.getMatchingBlocks();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            _ref1 = _ref[_i];
            ai = _ref1[0];
            bj = _ref1[1];
            size = _ref1[2];
            tag = "";
            if (i < ai && j < bj) {
                tag = "replace";
            }
            else if (i < ai) {
                tag = "delete";
            }
            else if (j < bj) {
                tag = "insert";
            }
            if (tag) {
                answer.push([tag, i, ai, j, bj]);
            }
            _ref2 = [ai + size, bj + size];
            i = _ref2[0];
            j = _ref2[1];
            if (size) {
                answer.push(["equal", ai, i, bj, j]);
            }
        }
        return answer;
    };
    SequenceMatcherModel.prototype.getMatchingBlocks = function () {
        var ahi, alo, bhi, blo, i, i1, i2, j, j1, j2, k, k1, k2, la, lb, matchingBlocks, nonAdjacent, queue, x, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
        _ref = [this.a.length, this.b.length];
        la = _ref[0];
        lb = _ref[1];
        queue = [[0, la, 0, lb]];
        matchingBlocks = [];
        while (queue.length) {
            _ref1 = queue.pop();
            alo = _ref1[0];
            ahi = _ref1[1];
            blo = _ref1[2];
            bhi = _ref1[3];
            _ref2 = x = this.findLongestMatch(alo, ahi, blo, bhi);
            i = _ref2[0];
            j = _ref2[1];
            k = _ref2[2];
            if (k) {
                matchingBlocks.push(x);
                if (alo < i && blo < j) {
                    queue.push([alo, i, blo, j]);
                }
                if (i + k < ahi && j + k < bhi) {
                    queue.push([i + k, ahi, j + k, bhi]);
                }
            }
        }
        matchingBlocks.sort(this._arrayCmp);
        i1 = j1 = k1 = 0;
        nonAdjacent = [];
        for (_i = 0, _len = matchingBlocks.length; _i < _len; _i++) {
            _ref3 = matchingBlocks[_i];
            i2 = _ref3[0];
            j2 = _ref3[1];
            k2 = _ref3[2];
            if (i1 + k1 === i2 && j1 + k1 === j2) {
                k1 += k2;
            }
            else {
                if (k1) {
                    nonAdjacent.push([i1, j1, k1]);
                }
                _ref4 = [i2, j2, k2];
                i1 = _ref4[0];
                j1 = _ref4[1];
                k1 = _ref4[2];
            }
        }
        if (k1) {
            nonAdjacent.push([i1, j1, k1]);
        }
        nonAdjacent.push([la, lb, 0]);
        return nonAdjacent;
    };
    SequenceMatcherModel.prototype.findLongestMatch = function (alo, ahi, blo, bhi) {
        var a, b, b2j, besti, bestj, bestsize, i, j, j2len, k, newj2len, _i, _j, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        _ref = [this.a, this.b, this.b2j];
        a = _ref[0];
        b = _ref[1];
        b2j = _ref[2];
        _ref1 = [alo, blo, 0];
        besti = _ref1[0];
        bestj = _ref1[1];
        bestsize = _ref1[2];
        j2len = {};
        for (i = _i = alo; alo <= ahi ? _i < ahi : _i > ahi; i = alo <= ahi ? ++_i : --_i) {
            newj2len = {};
            _ref2 = (!!b2j[a[i]] ? b2j[a[i]] : []);
            for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
                j = _ref2[_j];
                if (j < blo) {
                    continue;
                }
                if (j >= bhi) {
                    break;
                }
                k = newj2len[j] = (j2len[j - 1] || 0) + 1;
                if (k > bestsize) {
                    _ref3 = [i - k + 1, j - k + 1, k];
                    besti = _ref3[0];
                    bestj = _ref3[1];
                    bestsize = _ref3[2];
                }
            }
            j2len = newj2len;
        }
        while (besti > alo && bestj > blo && a[besti - 1] === b[bestj - 1]) {
            _ref4 = [besti - 1, bestj - 1, bestsize + 1];
            besti = _ref4[0];
            bestj = _ref4[1];
            bestsize = _ref4[2];
        }
        while (besti + bestsize < ahi && bestj + bestsize < bhi && a[besti + bestsize] === b[bestj + bestsize]) {
            bestsize++;
        }
        return [besti, bestj, bestsize];
    };
    SequenceMatcherModel.prototype._arrayCmp = function (a, b) {
        var i, la, lb, _i, _ref, _ref1;
        _ref = [a.length, b.length];
        la = _ref[0];
        lb = _ref[1];
        for (i = _i = 0, _ref1 = Math.min(la, lb); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
            if (a[i] < b[i]) {
                return -1;
            }
            if (a[i] > b[i]) {
                return 1;
            }
        }
        return la - lb;
    };
    SequenceMatcherModel.prototype._chainB = function () {
        var b, elt, i, indices, _i, _len;
        b = this.b;
        this.b2j = {};
        for (i = _i = 0, _len = b.length; _i < _len; i = ++_i) {
            elt = b[i];
            indices = !!this.b2j[elt] ? this.b2j[elt] : this.b2j[elt] = [];
            indices.push(i);
        }
    };
    return SequenceMatcherModel;
}());
exports.SequenceMatcherModel = SequenceMatcherModel;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotXMLInner = exports.SnapshotJSInner = exports.expectxml = exports.expectjs = exports.MatchesJSSnapshot = exports.MatchesJSONSnapshot = exports.MatchesXMLSnapshot = exports.MatchesSnapshot = exports.unifiedDiff = exports._formatRangeUnified = exports.ResetExceptionList = exports.KeyExceptionList = exports.registerSnapshots = void 0;
var vkbeautify_1 = __webpack_require__(2);
var X2JS = __webpack_require__(3);
__webpack_require__(0);
var sequence_matcher_model_1 = __webpack_require__(1);
var current_snapshot_object = {};
function registerSnapshots(snapshot_object, name) {
    current_snapshot_object = snapshot_object;
    current_suite = new AutoSnapshotSuite(current_level, name);
}
exports.registerSnapshots = registerSnapshots;
var AutoSnapshot = (function () {
    function AutoSnapshot() {
    }
    return AutoSnapshot;
}());
var auto_snapshot_siute_history = new Array();
var AutoSnapshotSuite = (function () {
    function AutoSnapshotSuite(snapshot_level, suite_name) {
        this.snapshots = Array();
        this.level = 0;
        this.fail_counter_for_autosnapshot = 0;
        this.last_automagic_snapshot_spec = "";
        this.last_automagic_snapshot_number = 0;
        this.level = snapshot_level;
        this.name = suite_name;
    }
    AutoSnapshotSuite.prototype.getSnapshotAutomagically_saveActual = function (actual) {
        var auto_snapshot = new AutoSnapshot();
        if (current_spec === this.last_automagic_snapshot_spec) {
            this.last_automagic_snapshot_number++;
        }
        else {
            this.last_automagic_snapshot_number = 1;
            this.last_automagic_snapshot_spec = current_spec;
        }
        auto_snapshot.key = create_one_liner("".concat(current_spec, " ").concat(this.last_automagic_snapshot_number));
        auto_snapshot.text = create_one_liner(actual);
        this.snapshots.push(auto_snapshot);
        var snapshot = current_snapshot_object[auto_snapshot.key];
        return snapshot ? snapshot : "";
    };
    AutoSnapshotSuite.prototype.hasFailure = function () {
        return this.fail_counter_for_autosnapshot > 0;
    };
    AutoSnapshotSuite.prototype.reportFailure = function (diff) {
        this.snapshots[this.snapshots.length - 1].diff = diff;
        this.fail_counter_for_autosnapshot++;
    };
    AutoSnapshotSuite.prototype.getText = function () {
        var snapshot_file_text = "\n**** If actual is valid, update your snapshot with the following ****\n{";
        var has_snapshots = false;
        for (var _a = 0, _b = this.snapshots; _a < _b.length; _a++) {
            var snapshot = _b[_a];
            has_snapshots = true;
            snapshot_file_text += "\n\t\"".concat(snapshot.key, "\": `").concat(snapshot.text, "`,");
        }
        if (has_snapshots) {
            snapshot_file_text = snapshot_file_text.slice(0, snapshot_file_text.length - 1);
            snapshot_file_text += "\n}\n\n";
        }
        return snapshot_file_text;
    };
    AutoSnapshotSuite.prototype.pushToHistory = function () {
        auto_snapshot_siute_history.push(this);
    };
    AutoSnapshotSuite.prototype.getHTML = function () {
        if (typeof document !== 'undefined') {
            document.body.style.fontFamily = "Courier New";
            document.body.style.whiteSpace = "nowrap";
        }
        if (!this.name) {
            throw "name not defined for snapshot suite";
        }
        if (!this.hasFailure()) {
            return "<p style=\"color: green; font-size: 25px; font-weight: bold;\">===Auto snapshot suite, ".concat(this.name, ", has no problems!===</p>");
        }
        var snapshot_file_html = "<p style=\"color: red; font-size: 25px; font-weight: bold;\">===Suite, ".concat(this.name, ", had problems===</p>");
        this.snapshots.forEach(function (snapshot) {
            if (snapshot.diff) {
                snapshot_file_html += "<div>>Test: \"".concat(snapshot.key, "\" did not match the snapshot:</div><br //>");
                snapshot.diff.forEach(function (d) {
                    if (d.length >= 3 && (d.slice(0, 3) === "---" || d.slice(0, 3) === "+++") || d.slice(0, 2) === "@@") {
                        return;
                    }
                    else if (d.charAt(0) === "-") {
                        snapshot_file_html += "<span style=\"color: red\">".concat(d.replace(/&nbsp;/g, "&amp;nbsp;").replace(/ /g, "&nbsp;"), "</span><br //>");
                    }
                    else if (d.charAt(0) === "+") {
                        snapshot_file_html += "<span style=\"color: green\">".concat(d.replace(/&nbsp;/g, "&amp;nbsp;").replace(/ /g, "&nbsp;"), "</span><br //>");
                    }
                    else {
                        snapshot_file_html += "".concat(d.replace(/&nbsp;/g, "&amp;nbsp;").replace(/ /g, "&nbsp;"), "<br //>");
                    }
                });
            }
        });
        snapshot_file_html += "<p style=\"text-decoration: underline; font-weight: bold;\">If actual is valid, update your snapshot with the following <//p>";
        snapshot_file_html += "<div style='color: blue;'>{";
        var has_snapshots = false;
        for (var _a = 0, _b = this.snapshots; _a < _b.length; _a++) {
            var snapshot = _b[_a];
            has_snapshots = true;
            snapshot_file_html += "<br //>&nbsp;&nbsp;&nbsp;&nbsp;\"".concat(snapshot.key, "\": `").concat(snapshot.text.replace(/&nbsp;/g, "&amp;nbsp;"), "`,");
        }
        if (has_snapshots) {
            snapshot_file_html = snapshot_file_html.slice(0, snapshot_file_html.length - 1);
            snapshot_file_html += "<br //>}</div></p>";
        }
        return snapshot_file_html;
    };
    return AutoSnapshotSuite;
}());
var current_suite;
var current_spec = "";
var current_level = 0;
jasmine.getEnv().addReporter({
    suiteStarted: function (result) {
        current_level++;
    },
    specStarted: function (result) {
        current_spec = result.fullName;
    },
    suiteDone: function (result) {
        current_level--;
        if (current_suite && current_level < current_suite.level) {
            if (current_suite.hasFailure()) {
            }
            current_suite.pushToHistory();
            current_suite = null;
        }
    },
    jasmineDone: function (results) {
        if (current_suite) {
            if (current_suite.hasFailure()) {
            }
            current_suite.pushToHistory();
            current_suite = null;
        }
        if (auto_snapshot_siute_history.length === 0) {
            return;
        }
        var html_summary = auto_snapshot_siute_history.reduce(function (prev_html, curr_suite) {
            return prev_html + "<br //>" + curr_suite.getHTML();
        }, "");
        if (typeof document !== 'undefined') {
            document.body.innerHTML = html_summary + document.body.innerHTML;
        }
        else {
            console.log(html_summary);
        }
    }
});
exports.KeyExceptionList = ["typeof"];
function ResetExceptionList() {
    exports.KeyExceptionList = ["typeof"];
}
exports.ResetExceptionList = ResetExceptionList;
function _formatRangeUnified(start, stop) {
    var beginning, length;
    beginning = start + 1;
    length = stop - start;
    if (length === 1) {
        return "" + beginning;
    }
    if (!length) {
        beginning--;
    }
    return "" + beginning + "," + length;
}
exports._formatRangeUnified = _formatRangeUnified;
function unifiedDiff(a, b) {
    var file1Range, file2Range, first, group, i1, i2, j1, j2, last, line, tag, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    var lineterm = "\n";
    var lines = [];
    var started = false;
    _ref1 = new sequence_matcher_model_1.SequenceMatcherModel(a, b).GetGroupedOpcodes();
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        group = _ref1[_i];
        if (!started) {
            started = true;
            lines.push("--- " + lineterm);
            lines.push("+++ " + lineterm);
        }
        _ref2 = [group[0], group[group.length - 1]];
        first = _ref2[0];
        last = _ref2[1];
        file1Range = _formatRangeUnified(first[1], last[2]);
        file2Range = _formatRangeUnified(first[3], last[4]);
        lines.push("@@ -" + file1Range + " +" + file2Range + " @@" + lineterm);
        for (_j = 0, _len1 = group.length; _j < _len1; _j++) {
            _ref3 = group[_j];
            tag = _ref3[0];
            i1 = _ref3[1];
            i2 = _ref3[2];
            j1 = _ref3[3];
            j2 = _ref3[4];
            if (tag === "equal") {
                _ref4 = a.slice(i1, i2);
                for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
                    line = _ref4[_k];
                    lines.push(" " + line);
                }
                continue;
            }
            if (tag === "replace" || tag === "delete") {
                _ref5 = a.slice(i1, i2);
                for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
                    line = _ref5[_l];
                    lines.push("-" + line);
                }
            }
            if (tag === "replace" || tag === "insert") {
                _ref6 = b.slice(j1, j2);
                for (_m = 0, _len4 = _ref6.length; _m < _len4; _m++) {
                    line = _ref6[_m];
                    lines.push("+" + line);
                }
            }
        }
    }
    return lines;
}
exports.unifiedDiff = unifiedDiff;
function MatchesSnapshot(snapshot, actual, automagic) {
    if (actual !== snapshot) {
        var diff = unifiedDiff(snapshot.split("\n"), actual.split("\n"));
        if (automagic) {
            if (!current_suite) {
                throw "autoagic snapshot with no registered snapshot object";
            }
            current_suite.reportFailure(diff);
        }
        var diff_string_1 = "\n";
        diff_string_1 += "**** ".concat(current_spec, " diff *****\n\n");
        diff.forEach(function (d) {
            if (d !== "--- \n" && d !== "+++ \n" &&
                !(d.length > 5 && d.slice(0, 2) === "@@")) {
                diff_string_1 += d + "\n";
            }
        });
        diff_string_1 += "\n";
        if (!automagic) {
            var one_line_actual = create_one_liner(actual);
            diff_string_1 += "**** If the Actual is valid, update the snapshot with this ****\n";
            diff_string_1 += " ----- Formatted ------\n".concat(actual, "\n\n ----- Single Line ------\n").concat(one_line_actual);
        }
        console.error(diff_string_1);
        fail("Actual does not match snapshot. See above. ");
    }
}
exports.MatchesSnapshot = MatchesSnapshot;
function create_one_liner(actual) {
    var one_line_actual = actual.replace(/\n/g, "").replace(/\t/g, "").replace(/\\"/g, "\\\\\\\"");
    while (one_line_actual.indexOf("  ") !== -1) {
        one_line_actual = one_line_actual.replace(/(  )/g, " ");
    }
    return one_line_actual;
}
function MatchesXMLSnapshot(snapshot, actual) {
    expectxml(actual).toMatchSnapshot(snapshot);
}
exports.MatchesXMLSnapshot = MatchesXMLSnapshot;
function MatchesJSONSnapshot(snapshot, actual) {
    var prettyActual = actual ? (0, vkbeautify_1.json)(actual) : actual;
    var prettySnapshot = snapshot ? (0, vkbeautify_1.json)(snapshot) : snapshot;
    MatchesSnapshot(prettySnapshot, prettyActual);
}
exports.MatchesJSONSnapshot = MatchesJSONSnapshot;
function MatchesJSSnapshot(snapshot, actual) {
    expectjs(actual).toMatchSnapshot(snapshot);
}
exports.MatchesJSSnapshot = MatchesJSSnapshot;
function expectjs(actual) {
    return new SnapshotJSInner(actual);
}
exports.expectjs = expectjs;
function expectxml(xml_actual) {
    return new SnapshotXMLInner(xml_actual);
}
exports.expectxml = expectxml;
var SnapshotInner = (function () {
    function SnapshotInner(actual) {
        this.actual = actual;
    }
    SnapshotInner.prototype.afterApplying = function (transformFunction) {
        this.actual = transformFunction(this.actual);
        return this;
    };
    return SnapshotInner;
}());
var SnapshotJSInner = (function (_super) {
    __extends(SnapshotJSInner, _super);
    function SnapshotJSInner(actual) {
        var _this = _super.call(this, actual) || this;
        _this.parsed_values = new Array();
        _this.actual = actual;
        return _this;
    }
    SnapshotJSInner.prototype.toMatchSnapshot = function (snapshot) {
        var prettyActual = this.actual ? this.getOrderedStringifyAndClean() : "";
        if (prettyActual) {
            prettyActual = JSON.stringify(JSON.parse(prettyActual), null, "\n");
        }
        var prettySnapshot = snapshot;
        var use_autosnapshot = false;
        if (snapshot === null || snapshot === undefined) {
            if (!current_suite) {
                throw "Use of autosnapshot without registering snapshot object";
            }
            use_autosnapshot = true;
            var auto_snapshot = current_suite.getSnapshotAutomagically_saveActual(prettyActual);
            prettySnapshot = auto_snapshot ? JSON.stringify(JSON.parse(auto_snapshot), null, "\n") : "";
        }
        else {
            prettySnapshot = snapshot ? JSON.stringify(JSON.parse(snapshot), null, "\n") : snapshot;
        }
        MatchesSnapshot(prettySnapshot, prettyActual, use_autosnapshot);
    };
    SnapshotJSInner.prototype.getOrderedStringifyAndClean = function () {
        var keys = this.collectAllKeysAndRemoveCircular(this.actual);
        return JSON.stringify(this.actual, keys);
    };
    SnapshotJSInner.prototype.collectAllKeysAndRemoveCircular = function (js_object) {
        var _this = this;
        var allKeys = new Array();
        var json = JSON.stringify(js_object, function (key, val) {
            if (_this.isIEPooOrCurcularReferences(key, val)) {
                return;
            }
            allKeys.push(key);
            return val;
        });
        this.actual = JSON.parse(json);
        return allKeys.sort(function (a, b) { return (a > b) ? 1 : -1; });
    };
    SnapshotJSInner.prototype.isIEPooOrCurcularReferences = function (key, value) {
        if (typeof key === "string" && exports.KeyExceptionList.some(function (ex) { return key.indexOf(ex) !== -1; })) {
            return true;
        }
        else if (this.IsCurcularDependency(value)) {
            return true;
        }
        return false;
    };
    SnapshotJSInner.prototype.IsCurcularDependency = function (value) {
        if (value && typeof value === "object") {
            if (this.parsed_values.indexOf(value) === -1) {
                this.parsed_values.push(value);
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    return SnapshotJSInner;
}(SnapshotInner));
exports.SnapshotJSInner = SnapshotJSInner;
var SnapshotXMLInner = (function (_super) {
    __extends(SnapshotXMLInner, _super);
    function SnapshotXMLInner(xml_actual) {
        var _this = _super.call(this, xml_actual) || this;
        _this.actual = xml_actual;
        return _this;
    }
    SnapshotXMLInner.prototype.toMatchSnapshot = function (snapshot) {
        var X2JS2 = X2JS;
        var x2js = new X2JS2();
        var js_actual = x2js.xml2js(this.actual);
        expectjs(js_actual).toMatchSnapshot(snapshot);
    };
    return SnapshotXMLInner;
}(SnapshotInner));
exports.SnapshotXMLInner = SnapshotXMLInner;


/***/ })
/******/ ]);
});
//# sourceMappingURL=jasmine-snapshot.js.map