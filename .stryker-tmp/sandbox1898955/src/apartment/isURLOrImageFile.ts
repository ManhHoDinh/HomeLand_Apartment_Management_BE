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
import { IsUrl, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, validateOrReject, ValidationError } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";
import { commonImageMIMETypes } from "../helper/constant";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "@nestjs/common";
class ImageFileContainer {
  @IsFile()
  @MaxFileSize(10e6)
  @HasMimeType(commonImageMIMETypes)
  value: MemoryStoredFile;
}
class URLContainer {
  @IsUrl()
  value: string;
}

/**
 * @classdesc A class that validate if the value is a valid URL or a valid image file
 */
@ValidatorConstraint({
  async: true
})
export class IsURLOrImageFile implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments | undefined): Promise<boolean> {
    if (stryMutAct_9fa48("167")) {
      {}
    } else {
      stryCov_9fa48("167");
      try {
        if (stryMutAct_9fa48("168")) {
          {}
        } else {
          stryCov_9fa48("168");
          await Promise.any(stryMutAct_9fa48("169") ? [] : (stryCov_9fa48("169"), [validateOrReject(plainToInstance(ImageFileContainer, stryMutAct_9fa48("170") ? {} : (stryCov_9fa48("170"), {
            value
          }))), validateOrReject(plainToInstance(URLContainer, stryMutAct_9fa48("171") ? {} : (stryCov_9fa48("171"), {
            value
          })))]));
          return stryMutAct_9fa48("172") ? false : (stryCov_9fa48("172"), true);
        }
      } catch (error) {
        if (stryMutAct_9fa48("173")) {
          {}
        } else {
          stryCov_9fa48("173");
          if (stryMutAct_9fa48("175") ? false : stryMutAct_9fa48("174") ? true : (stryCov_9fa48("174", "175"), error instanceof AggregateError)) {
            if (stryMutAct_9fa48("176")) {
              {}
            } else {
              stryCov_9fa48("176");
              throw new BadRequestException(stryMutAct_9fa48("177") ? {} : (stryCov_9fa48("177"), {
                message: stryMutAct_9fa48("178") ? `` : (stryCov_9fa48("178"), `${stryMutAct_9fa48("179") ? validationArguments.property : (stryCov_9fa48("179"), validationArguments?.property)} fail to validate any of the following constrains`),
                constraints: error.errors.reduce((msg, err: ValidationError[]) => {
                  if (stryMutAct_9fa48("180")) {
                    {}
                  } else {
                    stryCov_9fa48("180");
                    msg.push(err[0].constraints);
                    return msg;
                  }
                }, stryMutAct_9fa48("181") ? ["Stryker was here"] : (stryCov_9fa48("181"), []))
              }));
            }
          }
          throw new error();
        }
      }
    }
  }
}