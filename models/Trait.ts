import {
  Entity,
  Value,
  ValueKind,
  store,
} from "@graphprotocol/graph-ts";

export class Trait extends Entity {
  constructor(tokenId: string, traitName: string, collection: string) {
    super();
    let id = collection + "_" + tokenId + "_" + traitName;
    this.set("id", Value.fromString(id));
    this.set("tokenId", Value.fromString(tokenId));
    this.set("traitName", Value.fromString(traitName));
    this.set("collection", Value.fromString(collection));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value!.toString();
  }

  get traitName(): string {
    let value = this.get("traitName");
    return value!.toString();
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  get collection(): string {
    let value = this.get("collection");
    return value!.toString();
  }

  set traitValue(value: string){
    this.set("traitValue", Value.fromString(value));
  }

  get traitValue(): string {
    let value = this.get("traitValue");
    return value!.toString();
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NFT entity without an ID");
    if (id) {
      store.set("Trait", id.toString(), this);
    }
  }

  static load(id: string): Trait | null {
    return changetype<Trait | null>(store.get("Trait", id));
  }
}