// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Test {
  mapping(address => bool) public approved;

  constructor() {}

  function addAddies(address[] memory newAddy) public {
    for (uint256 i = 0; i <= newAddy.length; i++) {
      approved[newAddy[i]] = true;
    }
  }

  function getNewAddies(address addy) public view returns (bool) {
    return approved[addy];
  }
}
