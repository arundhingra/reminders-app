# [forgetfulness.io](https://reminders-335.herokuapp.com/)

![home page](https://github.com/arundhingra/reminders-app/blob/master/img/home_page.png?raw=true)

## About
`forgetfulness.io` is an application created for the forgetfull people of the world. This is essentially a reminders app, but instead of push notifications or emails that get lost in the sea of spam, forgetfulness relies on SMS. Additionally, forgetfulness features very customizeable reminders that other apps fail to provide.

![reminders list](https://github.com/arundhingra/reminders-app/blob/master/img/list_ex.png?raw=true)

You can use the default reminder type, which texts you weekly at a user-specified time until the week of the event, in which it will transform to a daily reminder up until the event date. The custom reminder type provides completely free range of choosing unlimited reminders at any time you wish!

![text message example](https://github.com/arundhingra/reminders-app/blob/master/img/text_ex.jpg?raw=true)

## How it Works

`forgetfulness.io` makes use of AWS EventBus rules to trigger a Lambda function for processing and kicking off an SNS notification to your chosen phone number. Currently, the name of the event is the uniquely identifying information for the reminder, so all reminders must have unique names.

![event bus rule](https://github.com/arundhingra/reminders-app/blob/master/img/rule_ex.png?raw=true)
On trigger, the lambda function evaluates whether or not a rule should be changed from weekly to daily or deleted.
# How to Start
Documentation will later be provided regarding the AWS-side of things, but to start off with the web app, all that needs to be done is a quick `npm i` to install related packages (node & express, http(s), dotenv, and ejs) and `node reminders.js`!


[Demo] (https://www.youtube.com/watch?v=zFtKwKp-OVM)