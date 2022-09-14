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
            "key": process.env.THENTIC_API_KEY,
            "chain_id": 97,
            "contract": process.env.THNETIC_NFT_CONTRACT,
            "nft_id": newNftId,
            "nft_data": JSON.stringify({ name: request.body.name, image: request.body.image }),
            "redirect_url": request.body.redirectUri,
            "to": request.body.address
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
        "https://thentic.tech/api/nfts?key=dQMY0vghEGcL612pW1cg5ZlJPeBHQI6H&chain_id=97",
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    response.json(thenticAPIResponse.data);
}