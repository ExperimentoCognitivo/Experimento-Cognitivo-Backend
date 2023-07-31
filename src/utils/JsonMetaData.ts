const JSON_METADATA_KEY = "JsonProperty";

export interface JsonMetaData<T> {
  name?: string;
  clazz?: { new(...args: any[]): T };
}

class DecoratorMetaData<T> implements JsonMetaData<T> {
  constructor(public name?: string, public clazz?: { new(...args: any[]): T }) {
  }
}

/**
 * Allows to annotate object fields for JSON deserialization.
 * Usage :
 * - @JsonProperty(string) can be used if the JSON attribute name is different than the field's name. The string must
 * give the JSON attribute name.
 * - @JsonProperty(JsonMetaData) : clazz field is used to indicate that the field needs to be mapped as an instance
 * of this class.
 *
 * @param metadata the JSON field name or a JsonMetaData object that contains the JSON field name and / or the target
 * class for the subsequent field.
 */
export function JsonProperty<T>(metadata?: JsonMetaData<T> | string) {
  let decoratorMetaData;

  if (isTargetType(metadata, "string")) {
    decoratorMetaData = new DecoratorMetaData(metadata as string);
  } else if (isTargetType(metadata, "object")) {
    decoratorMetaData = metadata as JsonMetaData<T>;
  } else {
    console.log("index.ts: meta data in Json property is undefined. meta data: " + metadata);
    throw new Error("index.ts: meta data in Json property is undefined. meta data: " + metadata);
  }
  return Reflect.metadata(JSON_METADATA_KEY, decoratorMetaData);
}


export function isTargetType(val: any, type: "object" | "string"): boolean {
  return typeof val === type;
}


export function getClazz<T>(target: T, propertyKey: string): { new(): T } {
  return Reflect.getMetadata("design:type", target, propertyKey);
}

export function getJsonProperty<T>(target: any, propertyKey: string): JsonMetaData<T> {
  return Reflect.getMetadata(JSON_METADATA_KEY, target, propertyKey);
}
