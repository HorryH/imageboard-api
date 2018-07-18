import * as dynamoDbLib from "./dynamodb";
import uuid from "uuid";

export function getMain(pid, context, callback) {
  const params = {
    TableName: "imageboard-main",
    Key: {
      pid: pid
    }
  };
  return dynamoDbLib.handledGet(params, context, callback);
}

export function createMain(item, context, callback) {
  const params = {
    TableName: "imageboard-main",
    Item: item
  };
  return dynamoDbLib.handledPut(params, context, callback);
}