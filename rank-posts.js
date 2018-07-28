import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  const results = await imageboardDB.getRanks(null, context, callback);
  console.log(results);
  callback(null, successOrNull(results));
}
