from google.cloud import bigquery
from google.oauth2 import service_account
from flask import Flask, url_for
from flask_cors import CORS, cross_origin
import time
import pandas as pd
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

credentials = service_account.Credentials.from_service_account_file('backend-service-account.json')
client = bigquery.Client(credentials=credentials)

# @app.route("/favicon.ico")
# def favicon():
#     return url_for('static', filename='static/favicon.ico')

@app.route("/report")
def report():
    sql_query = """
    SELECT ObjectId, Facility_Name, District, Latitude, Longitude, Website
    FROM `imposing-sentry-382613.learning.hk-museums`
    LIMIT 50
    """

    query_job = enqueue_query(sql_query)
    if query_job.error_result:
        return query_job.error_result
    
    # for row in query_job.result():
    #     print(row)

    df = query_job.to_dataframe()
    res = json.loads(df.to_json(orient='records'))
    return res

@app.route("/test")
# @cross_origin()
def test():
    return {"members": ["John", "Paul", "George", "Ringo"]}

def enqueue_query(sql_query):
    query_job = client.query(sql_query)

    while query_job.state != "DONE":
        query_job.reload()
        time.sleep(3)

    if query_job.error_result:
        print(query_job.error_result)
    
    return query_job


if __name__ == "__main__":
    app.run(debug=True)