import { ethers } from "hardhat";
import { Test } from "../typechain-types/Test";

import "dotenv/config";
import addies from "../addies.json";

// const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY ?? "";
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function createBadge(badgeName: string, contractAddress: string) {
  const testFactory = await ethers.getContractFactory("Test");
  const test = (await testFactory.attach(contractAddress)) as Test;

  const allAddies = addies.data;

  const result = await test.addAddies(allAddies, {
    gasLimit: 10000000,
  });

  console.log(result);
}

createBadge("Generic Test", "0xE85Cfb929239ea964959B5dB018213686f92cC0B");
