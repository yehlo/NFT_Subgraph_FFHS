import {
  Value,
} from "@graphprotocol/graph-ts";

import { NFT } from "./NFT";

export class BoredApe extends NFT {
  constructor(id: string) {
    super("BoredApe_" + id, id);
    this.set("collection", Value.fromString("BoredApe"))
  }

  static load(id: string): BoredApe | null {
    return changetype<BoredApe | null>(NFT.load(id, "BoredApe"))
  }
}