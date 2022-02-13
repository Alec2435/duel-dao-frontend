import { expect } from "chai";
import { ethers } from "hardhat";
import { Test } from "../typechain-types/Test";
import addies from "../addies.json";

const PUBLIC_KEY = process.env.PUBLIC_KEY ?? "";

describe("Test", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Test = await ethers.getContractFactory("Test");
    const test = (await Test.deploy()) as Test;
    await test.deployed();

    await test.addAddies(addies.data, { gasLimit: 10000000 });

    expect(await test.getNewAddies(addies.data[0])).equal(true);
  });
});
