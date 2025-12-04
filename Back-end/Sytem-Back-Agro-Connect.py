from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
import json
import os

app = Flask(__name__)
CORS(app)

DB_PATH = "database.json"

if not os.path.exists(DB_PATH):
    with open(DB_PATH, "w") as f:
        json.dump({"anuncios": [], "cotacoes": [], "noticias": []}, f)

def load_db():
    with open(DB_PATH, "r") as f:
        return json.load(f)

def save_db(data):
    with open(DB_PATH, "w") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

@app.route("/anuncios", methods=["GET"])
def listar_anuncios():
    db = load_db()
    return jsonify(db["anuncios"])

@app.route("/anuncios", methods=["POST"])
def criar_anuncio():
    db = load_db()
    body = request.json

    anuncio = {
        "id": str(uuid.uuid4()),
        "titulo": body.get("titulo"),
        "preco": body.get("preco"),
        "tipo": body.get("tipo"),
        "localizacao": body.get("localizacao"),
        "contato": body.get("contato")
    }

    db["anuncios"].append(anuncio)
    save_db(db)
    return jsonify({"message": "Anúncio criado com sucesso!", "anuncio": anuncio}), 201

@app.route("/anuncios/<id>", methods=["DELETE"])
def remover_anuncio(id):
    db = load_db()
    db["anuncios"] = [a for a in db["anuncios"] if a["id"] != id]
    save_db(db)
    return jsonify({"message": "Anúncio removido com sucesso!"})

@app.route("/cotacoes", methods=["GET"])
def listar_cotacoes():
    db = load_db()
    return jsonify(db["cotacoes"])

@app.route("/cotacoes", methods=["POST"])
def adicionar_cotacao():
    db = load_db()
    body = request.json

    cotacao = {
        "id": str(uuid.uuid4()),
        "produto": body.get("produto"),
        "preco_atual": body.get("preco_atual"),
        "variacao": body.get("variacao")
    }

    db["cotacoes"].append(cotacao)
    save_db(db)
    return jsonify({"message": "Cotação adicionada!", "cotacao": cotacao}), 201


@app.route("/noticias", methods=["GET"])
def listar_noticias():
    db = load_db()
    return jsonify(db["noticias"])

@app.route("/noticias", methods=["POST"])
def adicionar_noticia():
    db = load_db()
    body = request.json

    noticia = {
        "id": str(uuid.uuid4()),
        "titulo": body.get("titulo"),
        "conteudo": body.get("conteudo"),
        "data": body.get("data")
    }

    db["noticias"].append(noticia)
    save_db(db)
    return jsonify({"message": "Notícia adicionada!", "noticia": noticia}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)
