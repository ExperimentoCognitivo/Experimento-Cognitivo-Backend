/**
 * Created by akahn on 23.11.2016.
 */

export class ObjectUtils {

  public static isNullOrUndefined(obj: any) {
    return !ObjectUtils.isDefined(obj);
  }

  public static isDefined(obj: any) {
    return obj !== null && obj !== undefined;
  }

  public static isEmpty(array: any[]) {
    return ObjectUtils.isNullOrUndefined(array) || array.length === 0;
  }

  public static isNotEmpty(array: any[]) {
    return !ObjectUtils.isEmpty(array);
  }

  public static extractFromPath(obj: any, path: string) {
    if (ObjectUtils.isNullOrUndefined(obj)) {
      return obj;
    }
    return path.split(".").reduce(function (prev, curr) {
      return prev ? prev[curr] : undefined;
    }, obj);
  }
}