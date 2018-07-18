import * as dynamoDbLib from "./dynamodb";

export function getMain(pid, context, callback) {
  const params = {
    TableName: "imageboard-main",
    Key: {
      pid: pid
    }
  };
  return dynamoDbLib.handledGet(params, context, callback)
}