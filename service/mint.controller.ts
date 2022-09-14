import axios from 'axios';
import logger from "../config/logger";
import { Request, Response } from 'express';
import { getNFTID, setNFTID } from './redis';

export const mint = async (request: Request, response: Response) => {
    let nftId = await getNFTID();
    let newNftId = parseInt(nftId ? nftId : "0") + 1
    let thenticAPIResponse = await axios.post(
        "https://thentic.tech/api/nfts/mint",
        {
            "key": "Tok8mndFDF4hd4Wlx2XmUWs9atR0gze5",
            "chain_id": 97,
            "contract": "0xf9f98608f3d7096a90a5d1c751c4c6754e45ed70",
            "nft_id": newNftId,
            "nft_data": JSON.stringify({ name: request.body.name, image: request.body.image }),
            "redirect_url": request.body.redirectUri,
            "to": "0x17b135575639A9B55F7EBb74FbED5f727eD08E8a"
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    // logger.info();
    await setNFTID(newNftId);
    response.json(thenticAPIResponse.data);
}

export const view = async (request: Request, response: Response) => {
    let thenticAPIResponse = await axios.get(
        "https://thentic.tech/api/nfts?key=Tok8mndFDF4hd4Wlx2XmUWs9atR0gze5&chain_id=97",
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    response.json(thenticAPIResponse.data);
}