//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        
        greeting = _greeting;
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
}
