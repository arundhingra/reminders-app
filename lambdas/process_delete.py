import json
from datetime import datetime, timedelta
import calendar
import boto3

def remove_event_db(event_name):
    client = boto3.client('dynamodb')
    resp = client.delete_item(
        TableName='reminders',
        Key={
            'event_name': {
                'S': event_name
            }
        }
    )
    
    print(resp)
    

def lambda_handler(event, context):
    client = boto3.client('events')
    event_name = event['event_name'].replace(' ', 'q8t3n')

    try:
        client.remove_targets(Rule=event_name + 'Daily', Ids = [event_name + 'Daily'])
        client.delete_rule(Name=event_name + 'Daily')
    except Exception:
        client.remove_targets(Rule=event_name + 'Weekly', Ids = [event_name + 'Weekly'])
        client.delete_rule(Name=event_name + 'Weekly')
    
    remove_event_db(event_name)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
