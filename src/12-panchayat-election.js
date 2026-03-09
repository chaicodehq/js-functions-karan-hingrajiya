/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Your code here
  const votersIdArr = [];
  const registeredVotersSet = new Set();
  const isVoted = [];
  const voteCount = new Map();
  function registerVoter(voter) {
    if (
      typeof voter !== "object" ||
      voter === null ||
      Object.keys(voter).length === 0 ||
      voter.age < 18
    )
      return false;
    if (votersIdArr.includes(voter.id)) {
      return false;
    } else {
      votersIdArr.push(voter.id);
      registeredVotersSet.add(voter);
      return true;
    }
  }

  function castVote(voterId, candidateId, onSuccess, onError) {
    let isCandidateValid = false;
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].id === candidateId) {
        isCandidateValid = true;
        break;
      }
    }

    let isVoterValid = votersIdArr.includes(voterId);
    if (isVoterValid && isCandidateValid && !isVoted.includes(voterId)) {
      isVoted.push(voterId);
      let currVoteObj = candidates.find((elem) => elem.id === candidateId);
      voteCount.set(
        currVoteObj.party,
        (voteCount.get(currVoteObj.party) || 0) + 1,
      );
      return onSuccess({ voterId, candidateId });
    } else {
      return onError("reason String");
    }
  }

  function getResults(sortFn) {
    let res = [];

    candidates.forEach((elem) => {
      let votes = voteCount.get(elem.party) || 0;
      let obj = {
        id: elem.id,
        name: elem.name,
        party: elem.party,
        votes,
      };
      res.push(obj);
    });
    if (sortFn !== undefined) {
      return res.sort(sortFn);
    } else {
      return res.sort((a, b) => {
        return b.votes - a.votes;
      });
    }
  }

  function getWinner() {
    if (registeredVotersSet.size === 0 || voteCount.size === 0) return null;

    let sortedVotes = [...voteCount].sort((a, b) => b[1] - a[1]);
    return candidates.find((elem) => {
      return elem.party === sortedVotes[0][0];
    });
  }

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner,
  };
}

export function createVoteValidator(rules) {
  // Your code here
  return function (obj) {
    let valid = true;
    let reason = "";
    let fields = rules.requiredFields;
    let objfields = Object.keys(obj);
    for (let i = 0; i < fields.length; i++) {
      if (!objfields.includes(fields[i])) {
        valid = false;
        reason = "fields are not sufficient";
        break;
      }
    }

    if (obj.age < rules.minAge) {
      valid = false;
      reason = "age must be valid";
    }
    // valid = true;
    return {
      valid,
      reason,
    };
  };
}

export function countVotesInRegions(regionTree) {
  // Your code here
  if (typeof regionTree !== "object" || regionTree === null) return 0;

  let countVote = regionTree.votes;
  for (let i = 0; i < regionTree.subRegions.length; i++) {
    let currObj = regionTree.subRegions[i];
    countVote += countVotesInRegions(currObj);
  }

  return countVote;
}

export function tallyPure(currentTally, candidateId) {
  // Your code here
  let resObj = { ...currentTally };
  resObj[candidateId] = (resObj[candidateId] || 0) + 1;
  return resObj;
}
