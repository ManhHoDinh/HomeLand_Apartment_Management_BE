/**
 * number of rounds for hashing algorithm
 */
// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export const hashRounds = 10;
export const commonImageMIMETypes = stryMutAct_9fa48("519") ? [] : (stryCov_9fa48("519"), [stryMutAct_9fa48("520") ? "" : (stryCov_9fa48("520"), "image/jpeg"), stryMutAct_9fa48("521") ? "" : (stryCov_9fa48("521"), "image/png"), stryMutAct_9fa48("522") ? "" : (stryCov_9fa48("522"), "image/gif"), stryMutAct_9fa48("523") ? "" : (stryCov_9fa48("523"), "image/bmp"), stryMutAct_9fa48("524") ? "" : (stryCov_9fa48("524"), "image/webp"), stryMutAct_9fa48("525") ? "" : (stryCov_9fa48("525"), "image/svg+xml"), stryMutAct_9fa48("526") ? "" : (stryCov_9fa48("526"), "image/tiff"), stryMutAct_9fa48("527") ? "" : (stryCov_9fa48("527"), "image/x-icon"), stryMutAct_9fa48("528") ? "" : (stryCov_9fa48("528"), "image/vnd.microsoft.icon"), stryMutAct_9fa48("529") ? "" : (stryCov_9fa48("529"), "image/vnd.wap.wbmp"), stryMutAct_9fa48("530") ? "" : (stryCov_9fa48("530"), "image/x-xbitmap"), stryMutAct_9fa48("531") ? "" : (stryCov_9fa48("531"), "image/x-xpixmap"), stryMutAct_9fa48("532") ? "" : (stryCov_9fa48("532"), "image/x-xwindowdump")]);