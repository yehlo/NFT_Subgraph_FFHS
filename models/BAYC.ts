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

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get eyes(): string {
    let value = this.get("eyes");
    return value!.toString();
  }

  set eyes(value: string) {
    this.set("eyes", Value.fromString(value));
  }

  get fur(): string {
    let value = this.get("fur");
    return value!.toString();
  }

  set fur(value: string) {
    this.set("fur", Value.fromString(value));
  }

  get earring(): string {
    let value = this.get("earring");
    return value!.toString();
  }

  set earring(value: string) {
    this.set("earring", Value.fromString(value));
  }

  get clothes(): string {
    let value = this.get("clothes");
    return value!.toString();
  }

  set clothes(value: string) {
    this.set("clothes", Value.fromString(value));
  }

  get mouth(): string {
    let value = this.get("mouth");
    return value!.toString();
  }

  set mouth(value: string) {
    this.set("mouth", Value.fromString(value));
  }

  get background(): string {
    let value = this.get("background");
    return value!.toString();
  }

  set background(value: string) {
    this.set("background", Value.fromString(value));
  }
}