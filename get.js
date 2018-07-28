import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  const pid = event.pathParameters.id;
  const results = await imageboardDB.getMain(pid, context, callback);
  callback(null, successOrNull(results));
}
