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
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request } from "express";
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError, TypeORMError } from "typeorm";

/**
 * Catch TypeOrmError and return a user friendly error message
 */
@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (stryMutAct_9fa48("536")) {
      {}
    } else {
      stryCov_9fa48("536");
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      let message = (exception as any).message.message;
      let code = stryMutAct_9fa48("537") ? "" : (stryCov_9fa48("537"), "HttpException");
      Logger.error(message, (exception as any).stack, stryMutAct_9fa48("538") ? `` : (stryCov_9fa48("538"), `${request.method} ${request.url}`));
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      switch (exception.constructor) {
        case HttpException:
          if (stryMutAct_9fa48("539")) {} else {
            stryCov_9fa48("539");
            status = (exception as HttpException).getStatus();
            break;
          }
        case QueryFailedError:
          if (stryMutAct_9fa48("540")) {} else {
            stryCov_9fa48("540");
            // this is a TypeOrm error
            status = HttpStatus.UNPROCESSABLE_ENTITY;
            message = (exception as QueryFailedError).message;
            code = (exception as any).code;
            break;
          }
        case EntityNotFoundError:
          if (stryMutAct_9fa48("541")) {} else {
            stryCov_9fa48("541");
            // this is another TypeOrm error
            status = HttpStatus.UNPROCESSABLE_ENTITY;
            message = (exception as EntityNotFoundError).message;
            code = (exception as any).code;
            break;
          }
        case CannotCreateEntityIdMapError:
          if (stryMutAct_9fa48("542")) {} else {
            stryCov_9fa48("542");
            // and another
            status = HttpStatus.UNPROCESSABLE_ENTITY;
            message = (exception as CannotCreateEntityIdMapError).message;
            code = (exception as any).code;
            break;
          }
        default:
          if (stryMutAct_9fa48("543")) {} else {
            stryCov_9fa48("543");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
          }
      }
      response.status(status).json(GlobalResponseError(status, message, code, request));
    }
  }
}
export const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (statusCode: number, message: string, code: string, request: Request): IResponseError => {
  if (stryMutAct_9fa48("544")) {
    {}
  } else {
    stryCov_9fa48("544");
    return stryMutAct_9fa48("545") ? {} : (stryCov_9fa48("545"), {
      statusCode: statusCode,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method
    });
  }
};
export interface IResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}