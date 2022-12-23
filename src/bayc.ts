import { ipfs, json } from '@graphprotocol/graph-ts'
import {
  Transfer as TransferEvent
} from '../models/Transfer'

import {
  BoredApe
} from '../models/BAYC'

import {
  processAttribute
} from './helpers/attribute'

import {
  processUser
} from './helpers/user'

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
          let imageStr = image.toString().split("//")[1]
          token.image = 'ipfs.io/ipfs/' + imageStr
          token.ipfsURI = 'ipfs.io/ipfs/' + ipfshash + token.tokenURI
        }

        const ApeAttributes = value.get('attributes')
        if (ApeAttributes){
          let attributes = ApeAttributes.toArray()
          for (let i=0; i < attributes.length; i++){
            processAttribute(attributes[i].toObject(), token.id, token.collection)
          }
        }
      }
    }
  }
  token.updatedAtTimestamp = event.block.timestamp
  token.owner = event.params.to.toHexString()
  token.save()

  processUser(event.params.to.toHexString())
}
