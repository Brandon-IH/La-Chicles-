from flask import Flask, render_template, request, jsonify
from config import Config
from models import db, Producto  
import os
from psycopg2 import connect

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

# Conexión a la base de datos en Railway
DATABASE_URL = os.getenv("DATABASE_URL")  
conn = connect(DATABASE_URL)
cursor = conn.cursor()

def obtener_productos_destacados():
    productos = [
        {"id": 1, "nombre": "Sneakers Urban", "descripcion": "Comodidad y estilo.", "precio": 1200, "imagen_url": "https://ejemplo.com/sneakers.jpg", "whatsapp_link": "https://wa.me/+523334821147"},
        {"id": 2, "nombre": "Botines Clásicos", "descripcion": "Elegancia en cada paso.", "precio": 1800, "imagen_url": "https://ejemplo.com/botines.jpg", "whatsapp_link": "https://wa.me/+523334821147"},
        {"id": 3, "nombre": "Zapatillas Deportivas", "descripcion": "Para máximo rendimiento.", "precio": 1500, "imagen_url": "https://ejemplo.com/zapatillas.jpg", "whatsapp_link": "https://wa.me/+523334821147"},
    ]
    return productos

@app.route("/guardar-comentario", methods=["POST"])
def guardar_comentario():
    data = request.json
    comentario = data.get("comentario", "").strip()

    if not comentario:
        return jsonify({"error": "El comentario no puede estar vacío"}), 400

    cursor.execute("INSERT INTO comentarios (texto) VALUES (%s)", (comentario,))
    conn.commit()
    
    return jsonify({"message": "Comentario guardado"}), 200

@app.route('/wishlist')
def wishlist():
    return render_template('wishlist.html')

@app.route('/productos')
def mostrar_productos():
    productos = Producto.query.all()
    return render_template('productos.html', productos=productos)

@app.route('/')
def inicio():
    productos_destacados = obtener_productos_destacados()
    return render_template('index.html', productos_destacados=productos_destacados)

# Iniciar el servidor
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Toma el puerto desde Railway
    app.run(host="0.0.0.0", port=port, debug=True)

