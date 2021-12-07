import numpy as np
import tensorflow as tf
import sys,json
import joblib
import json

RFC_model = joblib.load('models/random_forest.joblib')

data = json.loads(sys.argv[1])
data = np.array(list(data),dtype=float)
# print("Data : ",type(data))

data = data.reshape(1,-1)

# print("Data after reshaping is ",data)

result = RFC_model.predict(data)


print(json.dumps(result.item()))

sys.stdout.flush()
