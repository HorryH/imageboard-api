# Serverless Imageboard

## An imageboard server built with AWS Lambda

| Endpoint | Function |
| ------ | ------ |
| /create | Create post or add child |
| /get | Get a post or child |
| /fetch | Recursively fetches all content from post and children |
| /vote | Increases or decreases the score of a post |
| /rank | Recalculates and rank posts based on points |
| /list | Fetches all popular posts from start key |
