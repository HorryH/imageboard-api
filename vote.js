import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const uid = event.requestContext.identity.cognitoIdentityId;
  const pid = event.pathParameters.pid;
  const vote = data.vote;
  const results = await imageboardDB.getVote(uid, pid, context, callback);
  const post = await imageboardDB.getMain(pid);

  const params = {
    uid: uid,
    pid: pid,
    vote: vote
  };
  const updateExpression = "set points = :points";
  const updateValues = {":points": post.points};

  if (Object.keys(results).length !== 0) {
    if (results.vote === vote) {
      params.vote = null;
      updateValues[":points"] = post.points + (vote ? -1 : 1);
    } else {
      params.vote = vote;
      updateValues[":points"] = post.points + (vote ? 2 : -2);
    }
  } else if (!results.vote) {
    params.vote = vote;
    updateValues[":points"] = post.points + (vote ? 1 : -1);
  }
  await imageboardDB.updateMain(pid, updateExpression, updateValues, context, callback);
  if (params.vote === null)
    await imageboardDB.deleteVote(params.uid, params.pid, context, callback);
  else
    await imageboardDB.createVote(params, context, callback);

  callback(null, successOrNull({newPoints: updateValues[":points"]}));
}
