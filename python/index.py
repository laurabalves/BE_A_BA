import requests
import logging
from datetime import datetime
import openpyxl
import json
from sqlalchemy import text
import pandas as pd
import os
from openpyxl.utils.dataframe import dataframe_to_rows
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/postgres'

db = SQLAlchemy(app)
CORS(app, origins="http://localhost:5173")


@app.route("/validate-upload", methods=["POST"])
def validate_file():
    try:
        data = request.json
        config = data.get("colunas")
        file_path = data.get("path")
        id_upload = data.get("idupload")
        error = 0
        message = "success"

        if not config or not file_path:
            error = 1
            message = "Missing 'config' or 'path' in the request body"
            # jsonify({"error": "Missing 'config' or 'path' in the request body"}), 400

        ext = file_path.split('.')[-1]

        if ext == 'xlsx' or ext == 'xls':
            df = pd.read_excel(file_path, engine='openpyxl')
        elif ext == 'csv':
            df = pd.read_csv(file_path)
        else:
            error = 1
            message = "Unsupported file format. Only CSV and XLSX are supported."
            print("Unsupported file format. Only CSV and XLSX are supported.")
            # return jsonify({"error": 1}), 400

        for column in config:
            print('inside for => ', column)
            col_name = column["nome_campo"]
            if col_name not in df.columns:
                print(f"Column '{col_name}' not found in the file.")
                error = 1
                message = f"Column '{col_name}' not found in the file.."
                # return jsonify({"error": 1}), 400

            data_type = column["tipo"]

            print('data_type => ', data_type)

            if data_type == "Number":
                # Validate using a regex for numbers
                if not df[col_name].astype(str).str.match(r'\d+(\.\d+)?').all():
                    print(f"Validation failed for '{col_name}' (Number).")
                    error = 1
                    message = f"Validation failed for '{col_name}' (Number)."
                    # return jsonify({"error": 1}), 400
            elif data_type == "Text":
                # Validate using a regex for text
                if not df[col_name].astype(str).str.match(r'[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~\-=\\| ]').all():
                    print(f"Validation failed for '{col_name}' (Text).")
                    error = 1
                    message = f"Validation failed for '{col_name}' (Text)."
                    # return jsonify({"error": 1}), 400
            elif data_type == "Date/Time":
                # Validate using a regex for dates
                if not df[col_name].astype(str).str.match(r'(\d{2}[/-]\d{2}[/-]\d{4}(?: \d{2}:\d{2}:\d{2})?|\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2})?)').all():
                    print(
                        f"Validation failed for '{col_name}' - {df[col_name]} (Date).")
                    error = 1
                    message = f"Validation failed for '{col_name}' (Date)."
                    # return jsonify({"error": 1}), 400

        print('file validated successfully')
        headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }

        body = json.dumps(
            {"error": error, "idupload": id_upload, "message": message})

        response = requests.post(
            'http://127.0.0.1:4000/api/upload/is-template-valid', data=body, headers=headers)

        print(response)
        print('on try')
        return jsonify({"error": 0})
    except:
        print('on exept')
        body = json.dumps(
            {"error": 1, "idupload": id_upload, "message": message})
        headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
        response = requests.post(
            'http://127.0.0.1:4000/api/upload/is-template-valid', data=body, headers=headers)
        return jsonify({"error": 1})


@app.route("/criar-template-2", methods=['POST'])
def criar_template_2():
    json_data = request.get_json()
    input_json = json_data
    output_format = input_json["extensao"]

    current_datetime = datetime.utcnow()
    current_timestamp = current_datetime.timestamp()

    # file_name = f'C:/Users/980190/Documents/BE_A_BA/projetos/BE_A_BA/python/templates/{current_timestamp}-{input_json["nomeTemplate"]}.{output_format}'
    file_name = f'{input_json["fullpath"]}/{current_timestamp}-{input_json["nomeTemplate"]}.{output_format}'

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


class Usuario(db.Model):
    __tablename__ = 'usuario'
    idusuario = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100),)
    matricula = db.Column(db.String(50), )
    isadm = db.Column(db.Boolean)
    email = db.Column(db.String(50), )
    senha = db.Column(db.String(50), )


class Upload (db.Model):
    __tablename__ = 'upload'
    idupload = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_arquivo = db.Column(db.String(100), nullable=False)
    path = db.Column(db.String(100), nullable=False)
    data = db.Column(db.TIMESTAMP, nullable=False)
    idtemplate = db.Column(db.Integer, nullable=False)
    idusuario = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), nullable=False)


@app.route('/users')
def get_users():
    sql = text('SELECT * FROM beaba.usuario')
    users = db.session.execute(sql).fetchall()

    user_list = []
    for row in users:
        user_dict = {
            "idusuario": row.idusuario,
            "nome": row.nome,
            "matricula": row.matricula,
            "isadm": row.isadm,
            "email": row.email,
            "senha": row.senha
        }
        user_list.append(user_dict)

    return jsonify(user_list)


@app.route('/uploads', methods=['GET'])
def get_uploads():
    sql = text('''
        SELECT u.idupload, u.nome_arquivo, u.path, u.data, u.idtemplate, u.idusuario, u.status, us.nome
        FROM beaba.upload u
        JOIN beaba.usuario us ON u.idusuario = us.idusuario
    ''')
    result = db.session.execute(sql)

    print(result)

    user_list = []
    for row in result:
        user_dict = {
            "idupload": row.idupload,
            "nome_arquivo": row.nome_arquivo,
            "path": row.path,
            "data": row.data,
            "idtemplate": row.idtemplate,
            "idusuario": row.idusuario,
            "status": row.status,
            "nome_usuario": row.nome
        }
        user_list.append(user_dict)

    return jsonify(user_list)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
