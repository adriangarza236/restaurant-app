from flask import Flask, send_from_directory
from flask_cors import CORS
import os

#creates flask application
app = Flask(__name__)

#Configuration-works for local and production
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

#allows react to call flask
CORS(app)

#Route1 
@app.route('/api/health')
def health():
    return { 'status': 'healthy', 'message': 'Backend is working!' }

#Route2 test data endpoint 
@app.route('/api/data')
def get_data():
    return { 'items': ['Stuff', 'GOW', 'Kirby'] }

#serve react app in production 
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    staic_folder = os.path.join(os.path.dirname(__file__), '../client/dist')
    if path and os.path.exists(os.path.join(static_folder, path)):
        return send_from_directory(static_folder, path)
    return send_from_directory(static_folder, 'index.html')

#Run the app
if __name__ == '__main__':
    app.run(debug=True, port=5555)
