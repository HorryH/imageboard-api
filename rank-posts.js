import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";
import hot from "./helpers/rank";

export async function main(event, context, callback) {
  let results = await imageboardDB.getRanks(null, context, callback);
  while (results.LastEvaluatedKey) {
    results = await imageboardDB.getRanks(results.LastEvaluatedKey, context, callback);
    console.log(results);
    // TODO: handle additional pages
  }
  results.Items.forEach(async function (result) {
    const post = await imageboardDB.getMain(result.pid);
    const updateExpression = "set score = :score";
    await imageboardDB.updateRank(post.pid, updateExpression, {":score": hot(post.points, post.createdAt)},
        context, callback);
  });
  callback(null, successOrNull(results));
}
