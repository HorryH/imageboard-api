import uuid from "uuid";
import * as imageboardDB from "./helpers/imageboarddb";
import hot from "./helpers/rank";
import { successOrNull, failure } from "./helpers/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const newPid = uuid.v1();
  const newScore = 0;
  const currentDate = Date.now();

  const item = {
    pid: newPid,
    uid: event.requestContext.identity.cognitoIdentityId,
    content: data.content,
    media: data.media,
    createdAt: currentDate,
    points: newScore,
    parentId: data.parentId,
    children: []
  };

  if (data.parentId) {
    const parent = await imageboardDB.getMain(data.parentId, context, callback);
    if (!parent) {
      callback(null, failure({status: "Parent does not exist"}))
    }

    const children = parent.children;
    children.push(newPid);

    const updateExpression = "set children = :children";
    await imageboardDB.updateMain(data.parentId, updateExpression,
      {":children": children}, context, callback)
  } else {
    const rankParams = {
      pid: newPid,
      score: hot(newScore, currentDate)
    };
    await imageboardDB.createRank(rankParams, context, callback);
  }

  await imageboardDB.createMain(item, context, callback);
  callback(null, successOrNull(item));
}