import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const results = await imageboardDB.listByScore(50, data.startKey, callback);
  const postList = await imageboardDB.batchGetMain(results.Items, context, callback);
  postList.list = results.Items;
  callback(null, successOrNull(postList));
}
