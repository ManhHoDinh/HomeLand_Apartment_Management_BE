import { Injectable } from '@nestjs/common';

export abstract class BaseIdGenerator {
  abstract generateId(): number;
}

@Injectable()
export class IdGeneratorService extends BaseIdGenerator {
  public generateId() {
    return Date.now();
  }
}
