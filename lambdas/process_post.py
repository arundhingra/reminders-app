import json
from datetime import datetime, timedelta
import calendar
import boto3

def send_event_db(event_name, event_date, alarm_time):
    client = boto3.client('dynamodb')
    resp = client.put_item(
        TableName='reminders',
        Item={
            'event_name': {
                "S": event_name
            },
            'event_date': {
                'S': event_date
            },
            'alarm_time': {
                'S': alarm_time
            }
        }
    )
    
    print(resp)
    

def lambda_handler(event, context):
    client = boto3.client('events')
    event_name = event['event_name'].replace(' ', 'q8t3n')
    freq = 'Daily'
    event_date = datetime.strptime(event['event_time'], '%Y-%m-%dT%H:%M')
    print(event_date)
    alarm_time = datetime.strptime(event['alarm_time'], '%H:%M')
    alarm_time += timedelta(hours=4)
    
    now = datetime.now()
    cron = 'cron('
    
    # every day
    if event_date - now <= timedelta(weeks=1):
        cron += '{} {} * * ? *'.format(alarm_time.minute, alarm_time.hour)
    else:
        freq = 'Weekly'
        day = calendar.day_name[event_date.weekday()][:3].upper()
        cron += '{} {} ? * {} *'.format(alarm_time.minute, alarm_time.hour, day)
        
    rule_name = event_name + freq
    
    cron += ')'
    print(cron)
    
    send_event_db(event_name, event['event_time'], event['alarm_time'])
    
    client.put_rule(Name=rule_name, ScheduleExpression=cron)
    client.put_targets(Rule=rule_name, Targets=[
        {
            'Id': rule_name,
            'Arn': 'arn:aws:lambda:us-east-1:123456789:function:trig-update'
        }
    ])
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
