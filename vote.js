import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const uid = event.requestContext.identity.cognitoIdentityId;
  const pid = event.pathParameters.pid;
  const vote = data.vote;
  const results = await imageboardDB.getVote(uid, pid, context, callback);

  const params = {
    uid: uid,
    pid: pid,
    vote: vote
  };

  if (Object.keys(results).length !== 0) {
    if (results.vote === vote) {
      params.vote = null;
    } else {
      params.vote = !vote;
    }
  } else {
    params.vote = vote;
  }
  await imageboardDB.createVote(params, context, callback);

  callback(null, successOrNull(results));
}
