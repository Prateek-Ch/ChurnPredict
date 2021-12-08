import numpy as np
import tensorflow as tf
import sys,json
import joblib
import json
import pickle

RFC_model = joblib.load('models/random_forest.joblib')
sc = open('models/scaler.pkl','rb')
scaler = pickle.load(sc)

data = json.loads(sys.argv[1])
data = np.array(list(data),dtype=float)
data = data.reshape(1,-1)

for i in range(9,20):
    data[0][i] = np.log(data[0][i] + 17000)

x = []
for i in range(9,23):
    x.append(data[0][i])
x = np.array(list(x),dtype=float)
x = x.reshape(1,-1)
print(json.dumps(x.tolist()))

xz = scaler.transform(x)

y = []

for i in range(0,9):
    y.append(data[0][i])

for i in range(9,23):
    y.append(xz[0][i-9])

print(json.dumps(y.tolist()))

# print("Data : ",data)

# print("Data after reshaping is ",data)

result = RFC_model.predict(data)

print(json.dumps(result.item()))


sys.stdout.flush()
