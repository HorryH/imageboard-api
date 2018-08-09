import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  let limit = 250;

  const pid = event.pathParameters.pid;
  const initial = await imageboardDB.getMain(pid, context, callback);

  const map = {};
  const traverse = postResult => {
    if (limit === 0) return;
    const children = postResult.children;
    map[postResult.pid] = postResult;
    limit--;
    children.forEach(child => {traverse(child)})
  };

  traverse(initial);
  callback(null, successOrNull(map));
}
