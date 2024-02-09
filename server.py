from flask import Flask, jsonify, render_template
import pandas as pd

df = pd.read_csv("Student_data.csv")
df2 = pd.read_csv("G_with_F.csv")
df3 = pd.read_csv("Finance.csv")
df4 = pd.read_csv("Rank.csv")


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get-datachart")
def get_datachart():
    classes = df["Faculty_Name"].value_counts().index
    values = df["Faculty_Name"].value_counts().values

    data = []

    for i in range(len(classes)):
        data.append({"class": classes[i], "value": int(values[i])})

    return jsonify(data)


@app.route("/get-datatable")
def get_datatable():
    Grade = df2["Grade"]
    Engineering = df2["Engineering"]
    CS = df2["CS"]
    Nano = df2["Nano"]
    Science = df2["Science"]

    datab = []

    for i in range(len(Grade)):
        datab.append(
            {
                "Grade": str(Grade[i]),
                "Engineering": int(Engineering[i]),
                "CS": int(CS[i]),
                "Nano": int(Nano[i]),
                "Science": int(Science[i]),
            }
        )

    return jsonify(datab)


@app.route("/get-databar")
def get_databar():
    year = df3["year"]
    income = df3["income"]
    expenses = df3["expenses"]

    datac = []

    for i in range(len(year)):
        datac.append(
            {"year": str(year[i]), "income": income[i], "expenses": expenses[i]}
        )

    return jsonify(datac)


@app.route("/get-dataline")
def get_dataline():
    year = df4["year"]
    value = df4["value"]

    data = []

    for i in range(len(year)):
        data.append({"year": str(year[i]), "value": int(value[i])})

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
