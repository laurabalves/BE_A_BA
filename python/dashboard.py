
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@localhost/mydatabase'
db = SQLAlchemy(app)

class Template(db.Model):
  
@app.route("/api/templates/alltemplates", methods=["GET"])
def get_all_templates():
    def get_all_templates():
    templates = Template.query.all()
    template_list = []

    for template in templates:
        template_data = {
            "idtemplate": template.idtemplate,
            "nome_template": template.nome_template,
            "usuario": {"nome": template.usuario.nome},
            "data_criacao": template.data_criacao,
        }
        template_list.append(template_data)

    return jsonify(template_list)
