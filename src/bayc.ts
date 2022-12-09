import { ipfs, json } from '@graphprotocol/graph-ts'
import {
  Transfer as TransferEvent
} from '../models/Transfer'

import {
  BoredApe
} from '../models/BAYC'

import {
  User
} from '../models/User'

const ipfshash = "QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"

export function handleTransfer(event: TransferEvent): void {
  let token = BoredApe.load(event.params.tokenId.toString())

  if (!token) {
    token = new BoredApe(event.params.tokenId.toString())
    token.tokenURI = "/" + token.tokenId

    // get metadata from ipfs
    let metadata = ipfs.cat(ipfshash + token.tokenURI)
    if (metadata) {
      const value = json.fromBytes(metadata).toObject()
      if (value) {
        const image = value.get('image')
        
        if (image){
          token.image = image.toString()
          token.ipfsURI = 'ipfs.io/ipfs/' + ipfshash + token.tokenURI
        }

        const ApeAttributes = value.get('attributes')
        if (ApeAttributes){
          let attributes = ApeAttributes.toArray()
          for (let i=0; i < attributes.length; i++){
            let item = attributes[i].toObject();
            let traitName = item.get("trait_type");
            if (traitName) {
              let trait = traitName.toString();
              let traitValue = item.get("value");
              if (traitValue) {
                if (trait == "Hat"){
                  token.hat = traitValue.toString();
                }
                else if (trait == "Eyes") {
                  token.eyes = traitValue.toString();
                }
                else if (trait == "Fur") {
                  token.fur = traitValue.toString();
                }
                else if (trait == "Earring") {
                  token.earring = traitValue.toString();
                }
                else if (trait == "Clothes") {
                  token.clothes = traitValue.toString();
                }
                else if (trait == "Mouth") {
                  token.mouth = traitValue.toString();
                }
                else if (trait == "Background") {
                  token.background = traitValue.toString();
                }
              }
            }
          }
        }
      }
    }
  }
  token.updatedAtTimestamp = event.block.timestamp
  token.owner = event.params.to.toHexString()
  token.save()

  /* if the user does not yet exist, create them */
  let user = User.load(event.params.to.toHexString())
  if (!user) {
    user = new User(event.params.to.toHexString())
    user.save()
  }
}
