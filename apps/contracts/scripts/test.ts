import { randomBytes } from "crypto";
import { keccak256 } from "ethers/lib/utils";
import { writeFileSync } from "fs";

const allAddies = [];

for (let i = 0; i < 100; i++) {
  allAddies.push("0x" + keccak256(randomBytes(64)).slice(-40));
}

writeFileSync("./addies.json", JSON.stringify({ data: allAddies }));
