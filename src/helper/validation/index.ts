import { isString } from "class-validator";
import { difference } from "lodash";
import { MemoryStoredFile } from "nestjs-form-data";
import { DeleteResult, UpdateResult } from "typeorm";

export function MBtoBytes(mb: number) {
    return mb * 1000000;
}

export function isQueryAffected(result: UpdateResult | DeleteResult): boolean {
    if (result.affected && result.affected > 0) return true;
    return false;
}

export function isPromiseFulfilledResult<T>(
    result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> {
    return result.status === "fulfilled";
}

export function isPromiseFulfilledResultArray<T>(
    results: PromiseSettledResult<T>[],
): results is PromiseFulfilledResult<T>[] {
    return results.every((result) => result.status === "fulfilled");
}

export function newImageHaveStrangeURL(
    newImages: (string | MemoryStoredFile)[],
    oldImageURLS: string[],
) {
    const newImageURLS = newImages.filter((image): image is string =>
        isString(image),
    );

    if (difference(newImageURLS, oldImageURLS).length > 0) return true;
    return false;
}
