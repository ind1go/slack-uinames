# slack-uinames
#####Get random names from uinames.com using a /command in Slack.

slack-uinames connects /commands in Slack with the http://uinames.com API for speedy access to random names for personas, storyboards and scenarios.

###Using slack-uinames

The syntax for slack-uinames is:

`/uiname [amount] [gender] [country]`

For example, to get a single user from any country and of either gender:

`/uiname`

To get 10 users:

`/uiname 10`

To get a male user from Argentina:

`/uiname male argentina`

Argument | Required | Default | Value                                                 | Description
---------|----------|---------|-------------------------------------------------------|------------
amount   | Optional | 1       | 1-100.                                                | Number of users to return.
gender   | Optional | Unset   | `male` or `female`.                                   | Limits returned names to one gender.
country  | Optional | Unset   | One of the countries supported by http://uinames.com. | Limits returned names to one country.

###Installing the server

slack-uinames is hosted at https://uinames.mybluemix.net, but if you want to host it yourself then install Node.js, clone or download the project and run the following from the root of the project:

```
npm install
npm start
```

###Configuring Slack

To configure a new command in your Slack team, go to https://my.slack.com/services/new/slash-commands. Use the following settings:

Setting                            | Value
-----------------------------------|------
Command                            | Choose a string to trigger the command - here, we use `/uiname`.
URL                                | Use the pre-existing slack-uinames server `https://uinames.mybluemix.net/slack`, or if hosting your own then use `<server>/slack`.
Method                             | POST.
Token                              | _automatically generated_.
Autocomplete help text             | Tick to show the command when you've typed `/` in Slack.
Description                        | Get random names from uinames.com
Usage help                         | `[amount] [gender] [country]`
Descriptive Label                  | Something to describe this integration.



