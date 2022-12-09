import {
  Value,
} from "@graphprotocol/graph-ts";

import { NFT } from "./NFT";

export class CryptoCoven extends NFT {
  constructor(id: string) {
    super("CryptoCoven_" + id, id);
    this.set("collection", Value.fromString("CryptoCoven"))
  }

  static load(id: string): CryptoCoven | null {
    return changetype<CryptoCoven | null>(NFT.load(id, "CryptoCoven"))
  }

  get externalURL(): string {
    let value = this.get("externalURL");
    return value!.toString();
  }

  set externalURL(value: string) {
    this.set("externalURL", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get type(): string | null {
    let value = this.get("type");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set type(value: string | null) {
    if (!value) {
      this.unset("type");
    } else {
      this.set("type", Value.fromString(<string>value));
    }
  }

  get sun(): string | null {
    let value = this.get("sun");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set sun(value: string | null) {
    if (!value) {
      this.unset("sun");
    } else {
      this.set("sun", Value.fromString(<string>value));
    }
  }

  get moon(): string | null {
    let value = this.get("moon");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set moon(value: string | null) {
    if (!value) {
      this.unset("moon");
    } else {
      this.set("moon", Value.fromString(<string>value));
    }
  }

  get rising(): string | null {
    let value = this.get("rising");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set rising(value: string | null) {
    if (!value) {
      this.unset("rising");
    } else {
      this.set("rising", Value.fromString(<string>value));
    }
  }
}