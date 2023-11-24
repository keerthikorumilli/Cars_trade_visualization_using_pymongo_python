from flask import Flask, request, jsonify
from pymongo import MongoClient
import numpy as np
import pandas as pd
import statistics
import logging 
import math
import re  
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


client = MongoClient('mongodb://localhost:27017')
db = client['carsdata']
collection = db['carsdata']  
app = Flask(__name__)
 
def calculate_iqr(values):
    values_sorted = sorted(values)
    n = len(values_sorted)
    q1_index = int(n * 0.25)  
    q3_index = int(n * 0.75)  
    q1 = values_sorted[q1_index]
    q3 = values_sorted[q3_index]
    iqr = q3 - q1
    return iqr

@app.route('/')
def hi():
    return "Homepage"
@app.route('/api/carsdata/<statistic>', methods=['GET'])
def get_carsdata(statistic):
    try:
        valid_statistics = ['MEAN', 'MEDIAN', 'MODE', 'MINIMUM', 'MAXIMUM', 'COUNT', 'STANDARD_DEVIATION', 'VARIANCE', 'INTERQUARTILERANGE']

        if statistic not in valid_statistics:
            return jsonify({'message': 'Invalid statistic type'})

        data = list(collection.find({}, {'Width': 1, 'Height': 1,'Length':1,'_id':0}))
        attributes = ['Width', 'Height','Length' ]

        result = {}

        for attribute in attributes:
            values = [item[attribute] for item in data if isinstance(item[attribute], (int, float)) and not math.isnan(item[attribute])]
            
            if values:
                if statistic == 'MEAN':
                    result[attribute] = round(statistics.mean(values), 4)
                elif statistic == 'MEDIAN':
                    result[attribute] = round(statistics.median(values), 4)
                elif statistic == 'MODE':
                    try:
                        result[attribute] = statistics.mode(values)
                    except statistics.StatisticsError:
                        result[attribute] = None
                elif statistic == 'MINIMUM':
                    result[attribute] = round(min(values), 4)
                elif statistic == 'MAXIMUM':
                    result[attribute] = round(max(values), 4)
                elif statistic == 'COUNT':
                    result[attribute] = len(values)
                elif statistic == 'STANDARD_DEVIATION':
                    result[attribute] = round(statistics.stdev(values), 4)
                elif statistic == 'VARIANCE':
                    result[attribute] = round(statistics.variance(values), 4)
                elif statistic == 'INTERQUARTILERANGE':
                    result[attribute] = round(calculate_iqr(values), 4)  
            else:
                result[attribute] = None

        response = jsonify(result)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response

    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)})
if __name__ == '__main__':
    app.run(debug=True)



