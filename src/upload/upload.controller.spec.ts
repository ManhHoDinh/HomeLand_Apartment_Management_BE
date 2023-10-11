import { Test, TestingModule } from "@nestjs/testing";
import { UploadService } from "./upload.service";

describe("UploadController", () => {
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UploadService],
        }).compile();
    });

    it("should be defined", () => {
        expect(module).toBeDefined();
    });
});
