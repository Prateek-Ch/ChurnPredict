import numpy as np
import tensorflow as tf
import sys,json
import joblib

RFC_model = joblib.load('models/random_forest.joblib')

data = json.loads(sys.argv[1])  
print(data)

# result = RFC_model.predict(data)
# result = np.argmax(result,axis = 1)
# print(result)

import json
print("\n The detected malware is: ")
print(json.dumps(data))

# Malware_model.input

sys.stdout.flush()
