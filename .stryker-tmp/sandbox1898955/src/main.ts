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
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import { TypeOrmExceptionFilter } from "./helper/filter/typeorm-exception.filter";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Admin } from "./admin/entities/admin.entity";
import { Technician } from "./technician/entities/technician.entity";
import { Manager } from "./manager/entities/manager.entity";
import { Resident } from "./resident/entities/resident.entity";
import { Employee } from "./employee/entities/employee.entity";
import path from "path";
async function bootstrap() {
  if (stryMutAct_9fa48("580")) {
    {}
  } else {
    stryCov_9fa48("580");
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(path.join(process.cwd(), stryMutAct_9fa48("581") ? "" : (stryCov_9fa48("581"), "doc")));
    app.useGlobalPipes(new ValidationPipe(stryMutAct_9fa48("582") ? {} : (stryCov_9fa48("582"), {
      whitelist: stryMutAct_9fa48("583") ? false : (stryCov_9fa48("583"), true),
      forbidNonWhitelisted: stryMutAct_9fa48("584") ? false : (stryCov_9fa48("584"), true),
      transform: stryMutAct_9fa48("585") ? false : (stryCov_9fa48("585"), true)
    })));
    app.enableCors();
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalFilters(new TypeOrmExceptionFilter());
    const config = new DocumentBuilder().setTitle(stryMutAct_9fa48("586") ? "" : (stryCov_9fa48("586"), "HomeLand example")).setDescription(stryMutAct_9fa48("587") ? "" : (stryCov_9fa48("587"), "The HomeLand API description")).setVersion(stryMutAct_9fa48("588") ? "" : (stryCov_9fa48("588"), "1.0")).addBearerAuth().build();
    const option: SwaggerDocumentOptions = stryMutAct_9fa48("589") ? {} : (stryCov_9fa48("589"), {
      deepScanRoutes: stryMutAct_9fa48("590") ? false : (stryCov_9fa48("590"), true),
      extraModels: stryMutAct_9fa48("591") ? [] : (stryCov_9fa48("591"), [Admin, Technician, Manager, Resident, Employee])
    });
    const document = SwaggerModule.createDocument(app, config, option);
    SwaggerModule.setup(stryMutAct_9fa48("592") ? "" : (stryCov_9fa48("592"), "api"), app, document, stryMutAct_9fa48("593") ? {} : (stryCov_9fa48("593"), {
      customCssUrl: stryMutAct_9fa48("594") ? "" : (stryCov_9fa48("594"), "/style.css"),
      swaggerOptions: stryMutAct_9fa48("595") ? {} : (stryCov_9fa48("595"), {
        useUnsafeMarkdown: stryMutAct_9fa48("596") ? false : (stryCov_9fa48("596"), true)
      })
    }));
    await app.listen(stryMutAct_9fa48("599") ? process.env.PORT && 3000 : stryMutAct_9fa48("598") ? false : stryMutAct_9fa48("597") ? true : (stryCov_9fa48("597", "598", "599"), process.env.PORT || 3000));
  }
}
bootstrap();