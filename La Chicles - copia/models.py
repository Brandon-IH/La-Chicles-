from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Instancia global de SQLAlchemy

class Producto(db.Model):
    __tablename__ = 'productos'  # Define el nombre de la tabla

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    precio = db.Column(db.Float, nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    prenda = db.Column(db.String(50))
    talla = db.Column(db.String(50), nullable=True)
    imagen_url = db.Column(db.String(255), nullable=True)
    whatsapp_link = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Producto {self.nombre}>'


