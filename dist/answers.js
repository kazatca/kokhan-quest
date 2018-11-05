"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const answers = [
    ansr => !!ansr.match(/распят(и|ь)е|крест/i) && !!ansr.match(/камин|огонь/i),
    ansr => !!ansr.match(/бухать/i) && !!ansr.match(/аквам(э|е)н/i),
    ansr => !!ansr.match(/отсоси/i) && !!ansr.match(/аквалангист/i),
    ansr => !!ansr.match(/19/) && !!ansr.match(/ч(у|ю)бр/i),
    ansr => !!ansr.match(/лошадь|кон/i) && !!ansr.match(/глух/) && !!ansr.match(/джим/i),
    ansr => !!ansr.match(/ника/i) && !!ansr.match(/бомб/i),
    ansr => !!ansr.length
];
exports.default = answers;
//# sourceMappingURL=answers.js.map