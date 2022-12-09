import { ipfs, json } from '@graphprotocol/graph-ts'

import {
  Transfer as TransferEvent
} from '../models/Transfer'

import {
  CryptoCoven
} from '../models/CryptoCoven'

import { processAttribute } from './helpers/attribute'
import { processUser } from './helpers/user'

const ipfshash = "QmSr3vdMuP2fSxWD7S26KzzBWcAN1eNhm4hk1qaR3x3vmj"

export function handleTransfer(event: TransferEvent): void {
  /* load the token from the existing Graph Node */
  let token = CryptoCoven.load(event.params.tokenId.toString())
  if (!token) {
    /* if the token does not yet exist, create it */
    token = new CryptoCoven(event.params.tokenId.toString())
 
    token.tokenURI = "/" + token.tokenId + ".json"

    /* combine the ipfs hash and the token ID to fetch the token metadata from IPFS */
    let metadata = ipfs.cat(ipfshash + token.tokenURI)
    if (metadata) {
      const value = json.fromBytes(metadata).toObject()
      if (value) {
        /* using the metatadata from IPFS, update the token object with the values  */
        const image = value.get('image')
        const name = value.get('name')
        const description = value.get('description')
        const externalURL = value.get('external_url')

        if (name && image && description && externalURL) {
          token.name = name.toString()
          token.image = image.toString()
          token.externalURL = externalURL.toString()
          token.description = description.toString()
          token.ipfsURI = 'ipfs.io/ipfs/' + ipfshash + token.tokenURI
        }

        const CovenAttributes = value.get('attributes')
        if (CovenAttributes){
          let attributes = CovenAttributes.toArray()
          for (let i=0; i < attributes.length; i++){
            processAttribute(attributes[i].toObject(), token.tokenId, token.collection)
          }
        }

        // const coven = value.get('coven')
        // if (coven != null) {
        //   let covenData = coven.toObject()
        //   const type = covenData.get('type')
        //   if (type) {

        //     token.type = type.toString()
        //   }

        //   const birthChart = covenData.get('birthChart')
        //   if (birthChart) {
        //     const birthChartData = birthChart.toObject()
        //     const sun = birthChartData.get('sun')
        //     const moon = birthChartData.get('moon')
        //     const rising = birthChartData.get('rising')
        //     if (sun && moon && rising) {
        //       token.sun = sun.toString()
        //       token.moon = moon.toString()
        //       token.rising = rising.toString()
        //     }
        //   }
        // }
          
      }
    }
  }
  token.updatedAtTimestamp = event.block.timestamp

  /* set or update the owner field and save the token to the Graph Node */
  token.owner = event.params.to.toHexString()
  token.save()
  
  processUser(event.params.to.toHexString())
 }