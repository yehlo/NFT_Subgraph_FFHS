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
}