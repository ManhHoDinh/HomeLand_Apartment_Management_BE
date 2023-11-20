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
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "./helper/decorator/auth.decorator";
import { PersonRole } from "./helper/class/profile.entity";
@ApiTags("DEVELOPMENT ONLY")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService /* private readonly personRepository: PersonRepository,*/) {}
  @Auth()
  @Get()
  getHello(): string {
    if (stryMutAct_9fa48("182")) {
      {}
    } else {
      stryCov_9fa48("182");
      return this.appService.getHello();
    }
  }

  // /**
  //  * Create account without need send token in header
  //  */
  // @Post("/demo_account/:id")
  // createAccount(
  //     @Param("id") id: string,
  //     @Body() createAccountDto: CreateAccountDto,
  // ) {
  //     return this.personRepository.createAccount(id, createAccountDto);
  // }

  /**
   * Create person profile without need send token in header
   */
  // @ApiOperation({ summary: "Create person profile" })
  // @ApiConsumes("multipart/form-data")
  // @ApiUnprocessableEntityResponse({
  //     description: "Email or phone number already exists",
  // })
  // @ApiCreatedResponse({
  //     description: "Create person profile successfully",
  // })
  // @Post("/demo_person")
  // @UseInterceptors(
  //     FileFieldsInterceptor([
  //         {
  //             name: "front_identify_card_photo",
  //             maxCount: 1,
  //         },
  //         {
  //             name: "back_identify_card_photo",
  //             maxCount: 1,
  //         },
  //     ]),
  // )
  // createPerson(
  //     @UploadedFiles()
  //     files: {
  //         front_identify_card_photo: MemoryStoredFile[];
  //         back_identify_card_photo: MemoryStoredFile[];
  //     },
  //     @Body() createPersonDto: CreatePersonDto,
  // ) {
  //     createPersonDto.front_identify_card_photo =
  //         files.front_identify_card_photo[0];
  //     createPersonDto.back_identify_card_photo =
  //         files.back_identify_card_photo[0];
  //     return this.personRepository.create(createPersonDto);
  // }
}