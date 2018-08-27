import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  let limit = 50;

  const pid = event.pathParameters.pid;
  const initial = await imageboardDB.getMain(pid, context, callback);

  let retList = [];
  const traverse = async children => {
    if (limit === 0) return;
    const keys = children.map(child => {
      return {pid: child}
    });
    const results = await imageboardDB.batchGetMain(keys);
    retList = retList.concat(results.Responses["imageboard-main"]);

    const allChildren = results.Responses["imageboard-main"].reduce((a, post) => {
      return a.concat(post.children)
    }, []);
    limit-= allChildren.length;
    if (allChildren.length > 0) {
      await traverse(allChildren)
    }
  };
  await traverse(initial.children);
  const retMap = retList.reduce((map, item) => {
    map[item.pid] = item;
    return map;
  }, {});
  callback(null, successOrNull(retMap));
}
