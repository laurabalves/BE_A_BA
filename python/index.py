import json
import pandas as pd
from openpyxl.utils.dataframe import dataframe_to_rows
from flask import Flask, request, jsonify
import openpyxl
from datetime import datetime

app = Flask(__name__)


@app.route("/criar-template-2", methods=['POST'])
def criar_template_2():
    json_data = request.get_json()
    input_json = json_data
    output_format = input_json["extensao"]

    current_datetime = datetime.utcnow()
    current_timestamp = current_datetime.timestamp()

    file_name = f'C:/Users/980190/Documents/BE_A_BA/projetos/BE_A_BA/python/templates/{current_timestamp}-{input_json["nomeTemplate"]}.{output_format}'

    if output_format == "xlsx" or output_format == "xls":
        wb = openpyxl.Workbook()
        ws = wb.active

        headers = [col["nome_campo"] for col in input_json["colunas"]]
        print(headers)

        ws.append(headers)

        wb.save(file_name)

    # If CSV is requested
    elif output_format == "csv":
        data = input_json["colunas"]
        headers = [col["nome_campo"] for col in data]
        df = pd.DataFrame(columns=headers)

        df.to_csv(file_name, index=False)

    return file_name


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
