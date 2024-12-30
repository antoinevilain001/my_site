from flask import Flask, render_template, request, jsonify
import os

# Create the Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
