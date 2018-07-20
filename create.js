import uuid from "uuid";
import * as imageboardDB from "./helpers/imageboarddb";
import { successOrNull } from "./helpers/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const item = {
    pid: uuid.v1(),
    uid: event.requestContext.identity.cognitoIdentityId,
    content: data.content,
    media: data.media,
    createdAt: Date.now(),
    points: 0,
    parent: data.parent,
    children: data.children
  };

  await imageboardDB.createMain(item, context, callback);
  callback(null, successOrNull(item));
}