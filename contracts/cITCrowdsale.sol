pragma solidity 0.4.24;
import  "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import  "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import  "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import  "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import  "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";

interface MintableERC20 {
    function finishMinting()  public returns (bool);

    }

contract cITCrowdsale  is Crowdsale, TimedCrowdsale, CappedCrowdsale, MintedCrowdsale, Ownable {
     bool public isFinalized = false;

     event Finalized();
    constructor 
    (
     uint256 _rate,
     address _wallet,
     ERC20 _token,
     uint256 _openingTime,
     uint256 _closingTime,
     uint256 _cap
     )
Crowdsale(_rate, _wallet, _token)
TimedCrowdsale(_openingTime, _closingTime)
CappedCrowdsale(_cap)
public
{
    
}
  /**
   * @dev Must be called after crowdsale ends, to do some extra finalization
   * work. Calls the contract's finalization function.
   */
  function finalize() public {
    require(!isFinalized);
    require(hasClosed() || capReached()) ;

    finalization();
    emit Finalized();

    isFinalized = true;
  }


function finalization() internal {
    MintableERC20 mintabelToken = MintableERC20(token);
    mintabelToken.finishMinting();
    
    
}

}