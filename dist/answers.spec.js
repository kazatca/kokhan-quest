"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const answers_1 = require("./answers");
const makeCheck = (i) => (text) => chai_1.expect(answers_1.default[i](text), text).to.be.true;
describe('Answers', () => {
    it('1', () => {
        const c = makeCheck(0);
        c('сняла со стены крест и швырнула в камин');
        c('взяла со стены крест и швырнула в камин');
        c('взяла со стены крест и швырнула в огонь');
        c('схватила со стены распятье и швырнула в огонь');
        c('схватила со стены распятие и швырнула в огонь');
    });
    it('2', () => {
        const c = makeCheck(1);
        c('все идем бухать к Аквамену');
        c('все идем бухать к аквамэну');
        c('вперед бухать к аквамэну');
        c('к аквамэну бухать');
    });
    it('3', () => {
        const c = makeCheck(2);
        c('отсоси у аквалангиста');
    });
    it('4', () => {
        const c = makeCheck(3);
        c('там 19 Чюбров в соседнем вагоне');
        c('там 19 Чубров в соседнем вагоне');
        c('там 19 Чубров в вагоне');
    });
    it('5', () => {
        const c = makeCheck(4);
        c('в лошадь глухого Джима');
        c('в лошадь глухова джима');
        c('в коня глухова джима');
    });
    xit('6', () => {
        const c = makeCheck(5);
        c('xxx');
    });
    xit('7', () => {
        const c = makeCheck(6);
        c('xxx');
    });
});
//# sourceMappingURL=answers.spec.js.map