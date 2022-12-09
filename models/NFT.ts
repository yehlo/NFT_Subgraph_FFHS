import {
  Entity,
  Value,
  ValueKind,
  store,
  BigInt
} from "@graphprotocol/graph-ts";

export class NFT extends Entity {
  constructor(id: string, tokenId: string) {
    super();
    this.set("id", Value.fromString(id));
    this.set("tokenId", Value.fromString(tokenId));
  }

  set tokenId(value: string){
    this.set("tokenId", Value.fromString(value));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value!.toString();
  }

  set collection(value: string){
    this.set("collection", Value.fromString(value));
  }

  get collection(): string {
    let value = this.get("collection");
    return value!.toString();
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NFT entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NFT must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      let collection = this.get("collection");
      assert(collection != null, "Cannot save NFT entity without target collection")
      store.set(collection!.toString(), id.toString(), this);
    }
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenURI(): string {
    let value = this.get("tokenURI");
    return value!.toString();
  }

  set tokenURI(value: string) {
    this.set("tokenURI", Value.fromString(value));
  }

  get externalURL(): string {
    let value = this.get("externalURL");
    return value!.toString();
  }

  set externalURL(value: string) {
    this.set("externalURL", Value.fromString(value));
  }

  get ipfsURI(): string {
    let value = this.get("ipfsURI");
    return value!.toString();
  }

  set ipfsURI(value: string) {
    this.set("ipfsURI", Value.fromString(value));
  }

  get image(): string {
    let value = this.get("image");
    return value!.toString();
  }

  set image(value: string) {
    this.set("image", Value.fromString(value));
  }

  get updatedAtTimestamp(): BigInt {
    let value = this.get("updatedAtTimestamp");
    return value!.toBigInt();
  }

  set updatedAtTimestamp(value: BigInt) {
    this.set("updatedAtTimestamp", Value.fromBigInt(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  static load(id: string, collection: string ): NFT | null {
    return changetype<NFT | null>(store.get(collection, id));
  }
}