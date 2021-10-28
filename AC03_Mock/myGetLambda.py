import json
import boto3
from boto3.dynamodb.conditions import Key


dynamodb = boto3.resource('dynamodb')

tabela = dynamodb.Table('devchat1') 


def lambda_handler(event, context):
    response = tabela.query(
        KeyConditionExpression = Key('origem').eq(event['from'])
    )

    for x in response['Items']:
        if x['destino'] == event['to']:
            return x

    return None
