import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const results = await imageboardDB.listByScore(50, data.startKey, callback);
  const list = results.Items.map(item => {
    return item["pid"];
  });

  callback(null, successOrNull(list));
}
