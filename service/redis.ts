import client from "../config/redis";

export const getNFTID = async () => {
    await client.connect();
    const value = await client.get("nftId");
    await client.disconnect();
    return value;
}

export const setNFTID = async (nftId: number) => {
    await client.connect();
    const value = await client.set("nftId", nftId.toString());
    await client.disconnect();
    return value;
}