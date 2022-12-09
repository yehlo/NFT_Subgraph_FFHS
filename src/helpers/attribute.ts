import { JSONValue, TypedMap } from '@graphprotocol/graph-ts';
import {
  Trait
} from '../../models/Trait'

export function processAttribute(attribute: TypedMap<string, JSONValue>, tokenId: string, collection: string): void { 

  // currently do not process other attributes than traits
  // levels, boosts and stats are due in a future release

  // generally if the object contains the key display_type it's not a trait
  let displayType = attribute.get("display_type");
  if (displayType){
    return;
  }

  let traitName = attribute.get("trait_type");
  if (traitName){
    let trait = traitName.toString();
    // process a trait only once, if it exists skip everything else
    let traitObj = Trait.load(collection + "_" + tokenId + "_" + trait)
    if (traitObj){
      return;
    }


    let traitValue = attribute.get("value");
    if (traitValue){
      traitObj = new Trait(tokenId, trait, collection)
      traitObj.traitValue = traitValue.toString();
      traitObj.save();
    }
  }
}
