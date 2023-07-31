import { getClazz, getJsonProperty } from "./JsonMetaData";
import { ObjectUtils } from "./object-utils";

//http://cloudmark.github.io/Json-Mapping/
export default class JsonMapUtils {

  static deserialize<T>(clazz: { new(...args: any[]): T } | undefined, jsonObject: any) {
    if ((clazz === undefined) || (jsonObject === undefined)) {
      return undefined;
    }

    let instance: any = new clazz();

    Object.keys(instance).forEach((key) => {
      let propertyMetadataFn: (IJsonMetaData: any) => any = (propertyMetadata) => {
        let propertyName = propertyMetadata.name || key;
        let innerJson = jsonObject ? jsonObject[propertyName] : undefined;

        let clazzDefault = getClazz(instance, key);
        let clazzCustom = propertyMetadata.clazz;
        let clazz;
        // Development mode issue : when using "isolatedModule" compilation option for faster building, reflect does not
        // emit the correct metadata type for objects ouside the project (for example : Map)
        // To solve this, if we find a custom metadata on a field marked as an object by reflect, we use the type from
        // the custom metadata.
        if (clazzCustom && clazzDefault.name === "Object") {
          clazz = clazzCustom;
        } else {
          clazz = clazzDefault || clazzCustom;
        }

        if (JsonMapUtils.isArray(clazz)) {
          let metadata = getJsonProperty(instance, key);
          if (metadata.clazz || JsonMapUtils.isPrimitive(clazz)) {
            if (innerJson && JsonMapUtils.isArray(innerJson)) {
              return innerJson.map((item: any) => JsonMapUtils.deserialize(metadata.clazz, item));
            } else {
              return undefined;
            }
          } else {
            return innerJson;
          }

        } else if (clazz === Map) {
          let map = new Map();
          if (ObjectUtils.isDefined(innerJson)) {
            for (let k of Object.keys(innerJson)) {
              map.set(k, innerJson[k]);
            }
          }
          return map;
        } else if (!JsonMapUtils.isPrimitive(clazz)) {
          return JsonMapUtils.deserialize(clazz, innerJson);
        } else {
          return jsonObject ? jsonObject[propertyName] : undefined;
        }
      };

      let propertyMetadata = getJsonProperty(instance, key);
      if (propertyMetadata) {
        instance[key] = propertyMetadataFn(propertyMetadata);
      } else if (jsonObject && jsonObject[key] !== undefined) {
        instance[key] = jsonObject[key];
      }
    });
    return instance;
  }

  private static isPrimitive(obj: Object) {
    switch (typeof obj) {
      case "string":
      case "number":
      case "boolean":
        return true;
    }
    return !!(obj instanceof String || obj === String ||
      obj instanceof Number || obj === Number ||
      obj instanceof Boolean || obj === Boolean);
  }

  private static isArray(object: Object) {
    if (object === Array) {
      return true;
    } else if (typeof Array.isArray === "function") {
      return Array.isArray(object);
    } else {
      return !!(object instanceof Array);
    }
  }
}

