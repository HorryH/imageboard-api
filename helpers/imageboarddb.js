import * as dynamoDbLib from "./dynamodb";

const imageboard = "imageboard-main";
const imageboardRank = "imageboard-rank";
const imageboardVotes = "imageboard-votes";
const scoreIndex = "dummy-score-index";

export function getMain(pid, ...args) {
  const params = {
    TableName: imageboard,
    Key: {
      pid: pid
    }
  };
  return dynamoDbLib.handledGet(params, ...args);
}

export function createMain(item, ...args) {
  const params = {
    TableName: imageboard,
    Item: item
  };
  return dynamoDbLib.handledPut(params, ...args);
}

export function updateMain(pid, updateExpression, updateValues, ...args) {
  const params = {
    TableName: imageboard,
    Key: {
      pid: pid
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: updateValues
  };
  return dynamoDbLib.handledUpdate(params, ...args);
}

export function batchGetMain(keys, ...args) {
  const params = {
    RequestItems: {}
  };
  params.RequestItems[imageboard] = {
    Keys: keys
  };
  return dynamoDbLib.handledBatchGet(params, ...args);
}

export function listByScore(number, exclusiveStartKey, ...args) {
  const params = {
    TableName: imageboardRank,
    IndexName: scoreIndex,
    KeyConditionExpression: "dummy = :dummy",
    ExpressionAttributeValues: {
      ":dummy": 0
    },
    ProjectionExpression: "pid",
    Limit: number,
    ScanIndexForward: false
  };
  if (exclusiveStartKey)
    params.ExclusiveStartKey = exclusiveStartKey;
  return dynamoDbLib.handledQuery(params, ...args);
}

export function createRank(item, ...args) {
  const params = {
    TableName: imageboardRank,
    Item: item
  };
  return dynamoDbLib.handledPut(params, ...args);
}

export function getRanks(exclusiveStartKey, ...args) {
  const params = {
    TableName: imageboardRank,
    AttributesToGet: [
      "pid"
    ],
    Limit: 1000
  };
  if (exclusiveStartKey)
    params.ExclusiveStartKey = exclusiveStartKey;
  return dynamoDbLib.handledScan(params, ...args)
}

export function updateRank(pid, updateExpression, updateValues, ...args) {
  const params = {
    TableName: imageboardRank,
    Key: {
      pid: pid
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: updateValues
  };
  return dynamoDbLib.handledUpdate(params, ...args);
}

export function getVote(uid, pid, ...args) {
  const params = {
    TableName: imageboardVotes,
    Key: {
      uid: uid,
      pid: pid
    },
    ProjectionExpression: "vote"
  };
  return dynamoDbLib.handledGet(params, ...args);
}

export function createVote(item, ...args) {
  const params = {
    TableName: imageboardVotes,
    Item: item
  };
  return dynamoDbLib.handledPut(params, ...args);
}

export function updateVote(uid, pid, updateExpression, updateValues, ...args) {
  const params = {
    TableName: imageboardVotes,
    Key: {
      uid: uid,
      pid: pid
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: updateValues
  };
  return dynamoDbLib.handledUpdate(params, ...args);
}

export function deleteVote(uid, pid, ...args) {
  const params = {
    TableName: imageboardVotes,
    Key: {
      uid: uid,
      pid: pid
    }
  };
  return dynamoDbLib.handledDelete(params, ...args)
}