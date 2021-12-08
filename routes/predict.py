import numpy as np
import pandas as pd
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

cols = ["gender","city","branch_code","days_since_last_transaction","occupation_company","occupation_retired","occupation_salaried","occupation_self_employed","occupation_student","customer_nw_category","current_balance","previous_month_end_balance","average_monthly_balance_prevQ2","average_monthly_balance_prevQ","current_month_credit","previous_month_credit","current_month_debit","previous_month_debit",	"current_month_balance","previous_month_balance","vintage","age","dependents"
]

df = pd.DataFrame(data,columns=cols)

# print(json.dumps(df.columns.tolist()))

all_cols = ['customer_nw_category', 'current_balance',
            'previous_month_end_balance', 'average_monthly_balance_prevQ2', 'average_monthly_balance_prevQ',
            'current_month_credit','previous_month_credit', 'current_month_debit', 
            'previous_month_debit','current_month_balance', 'previous_month_balance','vintage','age','dependents']

num_cols = ['customer_nw_category', 'current_balance',
            'previous_month_end_balance', 'average_monthly_balance_prevQ2', 'average_monthly_balance_prevQ',
            'current_month_credit','previous_month_credit', 'current_month_debit', 
            'previous_month_debit','current_month_balance', 'previous_month_balance']

for i in num_cols:
    df[i] = np.log(df[i] + 17000)
# print(json.dumps(df.values.tolist()))


# scaled = scaler.transform(df[all_cols])
# print(json.dumps(scaled.tolist()))

result = RFC_model.predict(df)

print(json.dumps(result.item()))


sys.stdout.flush()
