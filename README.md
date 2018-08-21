# Serverless Imageboard

## An imageboard server built with AWS Lambda

| Function | Description |
| ------ | ------ |
| create | Create post or add child |
| get | Get a post or child |
| fetch | Recursively fetches content from post |
| vote | Increases or decreases the score of a post and children |
| rank | Recalculates and rank posts based on points |
| list | Fetches all popular posts from start key |