# todo-fancy server
Todo fancy with Express, Mongose, Etc

## Route List Todo

URL | HTTP | Description
----|-----|-------
`/tasks/` |POST | createOne 
`/tasks/` |GET | getAllDo 
`/tasks/done` |GET | getAllDone 
`/tasks/:id` |GET | getOne 
`/tasks/:id/do` |PATCH | setDo 
`/tasks/:id/done` |PATCH | setDone 
`/tasks/:id/delete` |PATCH | softdelete 
`/tasks/:id/restore` |PATCH | unsoftdelete 
`/tasks/:id` |PUT | updateOne 
`/tasks/:id` |DELETE | deleteOne 
