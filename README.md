# Semester Project Proposal

I'm going to create a To Do application that keeps track of things I need to do. It will be very simple. I want it to track individual tasks. I can put due dates on tasks, but I won't make it so that you can create individual task lists because this is an in-class project and I want to keep it small. Each logged in user will have their own task list.

# DDD

## Events

- task added
- task completed
- task uncompleted
- task loaded
- task modified
- task deleted
- user logged in
- user logged out
- user account created
- user account deleted
- task due date added
- task due date modified
- task due date removed
- task passed due date w/o completion
- file uploaded
- file deleted

## Commands

- addTask
- markTaskComplete
- markTaskIncomplete
- modifyTask (used for updating title, description, due date, completion, etc.)
- deleteTask
- logInUser
- logOutUser
- createUserAccount
- deleteUserAccount
- runPastDueBatch
- uploadFile
- deleteFile

## Entities

**Account**

- user id (unique and defined by user)
- name (what the user wants to be called)
- password (encrypted password)
- sessionInfo (info about whether they are logged in)

**Task**

- task id (unique)
- title
- description
- due date (date or null)
- completed (date or null)

## Value Objects

**File**

- data (the file's raw data)
- task id

# REST Design

## Endpoints

| Description | URL Fragment | HTTP Method | Path Parameters | Representations |
| ----------- | ------------ | ----------- | --------------- | --------------- |
| create account | `/accounts` | POST | | Create Account |
| delete account | `/accounts/{accountId}` | DELETE | `accountId` | |
| log in | `/accounts/{accountId}/login` | PUT | `accountId` | Account Log In |
| log out | `/accounts/{accountId}/logout` | PUT | `accountId` | |
| get tasks | `/tasks` | GET | | Get Tasks |
| add task | `/tasks` | POST | | Set Task |
| edit task | `/tasks/{taskId}` | PUT | `taskId` | Set Task |
| delete task | `/tasks/{taskId}` | DELETE | `taskId` | |
| upload file to task | `/tasks/{taskId}/files` | POST | `taskId` | File |
| download file for task | `/tasks/{taskId}/files/{fileId}` | GET | `taskId`, `fileId` | File |
| delete file from task | `/tasks/{taskId}/files/{fileId}` | DELETE | `taskId`, `fileId` |

## Representations

### Account Log In

```json
{
    "password": "a-password"
}
```

### Create Account

```json
{
    "username": "username",
    "name": "First Name",
    "password": "a-password"
}
```

### File

```bin
00101010101001010100100100100100100101001010100101010010101001010
```

### Get Tasks

```json
[
    {
        "taskId": "123",
        "title": "Buy Milk",
        "description": "2 percent",
        "dueDate": "2022-02-01T00:00:00.000Z",
        "completed": null,
        "files": [
            "file1",
            "file2"
        ]
    },
    {
        "taskId": "342",
        "title": "Finish Homework",
        "description": "Math and Biology",
        "dueDate": "2022-02-01T00:00:00.000Z",
        "completed": null,
        "files": []
    },
    {
        "taskId": "895",
        "title": "Go on a date",
        "description": "With you know who... :D",
        "dueDate": "2022-02-01T00:00:00.000Z",
        "completed": "2022-01-08T00:00:00.000Z",
        "files": []
    }
]
```

### Set Task

```json
{
    "title": "Buy Milk",
    "description": "2 percent",
    "dueDate": "2022-02-01T00:00:00.000Z",
    "completed": null
}
```

