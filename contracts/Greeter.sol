//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract Greeter {
    string private greeting;
    address[] contestents;
    uint noOfContestents;
    address manager;


    constructor(string memory _greeting) {
        greeting = _greeting;
        manager = msg.sender;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        
        greeting = _greeting;
    }

    function reverse(uint n) pure public returns(uint) {
        
        uint digit;
        uint rev;

        while(n != 0){
            digit = n % 10;
            rev = (rev * 10) + digit;
            n = n/10;
        }

        return rev;
    }

    function addContestent(address _addr) public{
        require(msg.sender == manager, "You are not the manager");
        contestents.push(_addr);
        noOfContestents++;
    }

    function num() view public returns(uint) {
        return noOfContestents;
    }
}