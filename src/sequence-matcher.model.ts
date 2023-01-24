export class SequenceMatcherModel {
    private matchingBlocks: any;
    private opcodes: any;
    private fullbcount: any;
    private junk: any = {};
    private b2j: any;

    constructor(private isjunk: any, private a: any, private b: any) {
        this.setSeqs();
    }

    public GetGroupedOpcodes(n) {
        let codes, group, groups, i1, i2, j1, j2, nn, tag, _i, _len, _ref, _ref1, _ref2, _ref3;
        if (n == null) {
            n = 3;
        }

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
    }

    private getOpCodes(): any {
        let ai, answer, bj, i, j, size, tag, _i, _len, _ref, _ref1, _ref2;
        if (this.opcodes) {
            return this.opcodes;
        }
        i = j = 0;
        this.opcodes = answer = [];
        _ref = this.getMatchingBlocks();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            _ref1 = _ref[_i];
            ai = _ref1[0];
            bj = _ref1[1];
            size = _ref1[2];
            tag = "";
            if (i < ai && j < bj) {
                tag = "replace";
            } else if (i < ai) {
                tag = "delete";
            } else if (j < bj) {
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
    }

    private getMatchingBlocks(): any {
        let ahi, alo, bhi, blo, i, i1, i2, j, j1, j2, k, k1, k2, la, lb, matchingBlocks, nonAdjacent, queue, x, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
        if (this.matchingBlocks) {
            return this.matchingBlocks;
        }
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
            } else {
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
    }

    private findLongestMatch(alo, ahi, blo, bhi): any {
        let a, b, b2j, besti, bestj, bestsize, i, j, j2len, k, newj2len, _i, _j, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
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
        while (besti > alo && bestj > blo && !this.junk[b[bestj - 1]] && a[besti - 1] === b[bestj - 1]) {
            _ref4 = [besti - 1, bestj - 1, bestsize + 1];
            besti = _ref4[0];
            bestj = _ref4[1];
            bestsize = _ref4[2];
        }
        while (besti + bestsize < ahi && bestj + bestsize < bhi && !this.junk[b[bestj + bestsize]] && a[besti + bestsize] === b[bestj + bestsize]) {
            bestsize++;
        }
        while (besti > alo && bestj > blo && !!this.junk[b[bestj - 1]] && a[besti - 1] === b[bestj - 1]) {
            _ref5 = [besti - 1, bestj - 1, bestsize + 1];
            besti = _ref5[0];
            bestj = _ref5[1];
            bestsize = _ref5[2];
        }
        while (besti + bestsize < ahi && bestj + bestsize < bhi && !!this.junk[b[bestj + bestsize]] && a[besti + bestsize] === b[bestj + bestsize]) {
            bestsize++;
        }
        return [besti, bestj, bestsize];
    }


    private _arrayCmp(a, b) {
        let i, la, lb, _i, _ref, _ref1;
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
    }

    private setSeqs(): void {
        this.setSeq1();
        this.setSeq2();
    }

    private setSeq1(): any {
        return this.matchingBlocks = this.opcodes = null;
    }

    private setSeq2(): any {
        this.fullbcount = null;
        return this._chainB();
    }

    private _chainB(): void {
        let b, elt, i, indices, isjunk, _i, _j, _len, _len1, _ref;
        b = this.b;
        this.b2j = {};
        for (i = _i = 0, _len = b.length; _i < _len; i = ++_i) {
            elt = b[i];
            indices = !!this.b2j[elt] ? this.b2j[elt] : this.b2j[elt] = [];
            indices.push(i);
        }
        this.junk = {};
        isjunk = this.isjunk;
        if (isjunk) {
            _ref = Object.keys(this.b2j);
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                elt = _ref[_j];
                if (isjunk(elt)) {
                    this.junk[elt] = true;
                    delete this.b2j[elt];
                }
            }
        }
    }
}