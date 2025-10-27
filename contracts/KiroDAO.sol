// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title KiroDAO
 * @dev Simplified DAO for KiroMusic platform governance
 */
contract KiroDAO is Ownable, ReentrancyGuard {
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        bool canceled;
        mapping(address => bool) hasVoted;
    }

    uint256 public proposalCount;
    uint256 public votingPeriod = 3 days;
    uint256 public proposalThreshold = 1000 * 10**18; // 1000 tokens
    
    mapping(uint256 => Proposal) public proposals;
    
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string description,
        uint256 startTime,
        uint256 endTime
    );
    
    event VoteCast(
        address indexed voter,
        uint256 indexed proposalId,
        uint8 support,
        uint256 weight
    );
    
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalCanceled(uint256 indexed proposalId);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Create a new proposal
     */
    function propose(string memory description) external returns (uint256) {
        proposalCount++;
        uint256 proposalId = proposalCount;
        
        Proposal storage newProposal = proposals[proposalId];
        newProposal.id = proposalId;
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.startTime = block.timestamp;
        newProposal.endTime = block.timestamp + votingPeriod;
        
        emit ProposalCreated(
            proposalId,
            msg.sender,
            description,
            newProposal.startTime,
            newProposal.endTime
        );
        
        return proposalId;
    }

    /**
     * @dev Cast a vote on a proposal
     * @param proposalId The ID of the proposal
     * @param support 0 = against, 1 = for, 2 = abstain
     */
    function castVote(uint256 proposalId, uint8 support) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(!proposal.executed, "Proposal executed");
        require(!proposal.canceled, "Proposal canceled");
        
        proposal.hasVoted[msg.sender] = true;
        uint256 weight = 1; // Simplified: 1 vote per address
        
        if (support == 0) {
            proposal.againstVotes += weight;
        } else if (support == 1) {
            proposal.forVotes += weight;
        } else if (support == 2) {
            proposal.abstainVotes += weight;
        } else {
            revert("Invalid support value");
        }
        
        emit VoteCast(msg.sender, proposalId, support, weight);
    }

    /**
     * @dev Execute a proposal
     */
    function execute(uint256 proposalId) external onlyOwner {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Already executed");
        require(!proposal.canceled, "Proposal canceled");
        require(proposal.forVotes > proposal.againstVotes, "Proposal defeated");
        
        proposal.executed = true;
        
        emit ProposalExecuted(proposalId);
    }

    /**
     * @dev Cancel a proposal
     */
    function cancel(uint256 proposalId) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        
        require(
            msg.sender == proposal.proposer || msg.sender == owner(),
            "Not authorized"
        );
        require(!proposal.executed, "Already executed");
        require(!proposal.canceled, "Already canceled");
        
        proposal.canceled = true;
        
        emit ProposalCanceled(proposalId);
    }

    /**
     * @dev Get proposal state
     */
    function state(uint256 proposalId) external view returns (uint8) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.canceled) return 2; // Canceled
        if (proposal.executed) return 7; // Executed
        if (block.timestamp < proposal.startTime) return 0; // Pending
        if (block.timestamp <= proposal.endTime) return 1; // Active
        if (proposal.forVotes <= proposal.againstVotes) return 3; // Defeated
        return 4; // Succeeded
    }

    /**
     * @dev Get proposal votes
     */
    function proposalVotes(uint256 proposalId) 
        external 
        view 
        returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) 
    {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        return (proposal.againstVotes, proposal.forVotes, proposal.abstainVotes);
    }

    /**
     * @dev Set voting period
     */
    function setVotingPeriod(uint256 newPeriod) external onlyOwner {
        votingPeriod = newPeriod;
    }

    /**
     * @dev Set proposal threshold
     */
    function setProposalThreshold(uint256 newThreshold) external onlyOwner {
        proposalThreshold = newThreshold;
    }
}
