from flask import Flask, render_template, redirect, url_for, json, jsonify
import json
import html

from flask import Flask, request
from flask_json import FlaskJSON, JsonError, json_response, as_json

from flask_pymongo import PyMongo
# import scrape_mars
from flask_cors import CORS

# import pymongo
from bson import json_util
# from bson.json_util import dumps
# from bson.json_util import loads

from flask_cors import CORS
#Create an instance of Flask
app=Flask(__name__)
CORS(app)
# # Use flast_pymongo to set up mongo connection
app.config["MONGO_URI"] = 'mongodb+srv://dalberghini:Jjaxxpass2@project2.7h3eu.mongodb.net/FullData'# ?retryWrites=true&w=majority'

mongo=PyMongo(app)
# json = FlaskJSON(app)

@app.route("/")
def outside():
	return render_template('index.html', title="page")

@app.route("/beer")
def breweries():
	return render_template('breweries.html', title="page")

@app.route("/fourteeners")
def fourteeners():
	return render_template('mountains.html', title="page")

@app.route("/camping")
def camping():
	return render_template('camping.html', title="page")

@app.route('/getmountains')
def getmountains():
	data=[]
	# data=json.dumps(mongo.db.mountains_db)
	# return jsonify(data)
	# connection = pymongo.Connection("localhost", 27017)
	
	# def get():
	results = list(mongo.db.mountains_db.find())
	for each_doc in results:
		new_doc={}
		for each_key in each_doc.keys():
			if not each_key =='_id': 
				new_doc[each_key]=each_doc[each_key]
		data.append(new_doc)
	# return json.loads(json_util.dumps(data, indent=2))
	# return json_util.loads(json_util.dumps(data, indent=2))
	# return loads(dumps(cursor))
	return jsonify(data)

# @app.route('/getspecificmountain/<mountain_name>')
# def getNearby(mountain_name){
	
# }

@app.route('/get14ers')
def get14ers():
	data=[]
	# data=json.dumps(mongo.db.mountains_db)
	# return jsonify(data)
	# connection = pymongo.Connection("localhost", 27017)
	
	# def get():
	results = list(mongo.db.everything_14ers_db.find())
	for each_doc in results:
		new_doc={}
		for each_key in each_doc.keys():
			if not each_key =='_id': 
				new_doc[each_key]=each_doc[each_key]
		data.append(new_doc)
	# return json.loads(json_util.dumps(data, indent=2))
	# return json_util.loads(json_util.dumps(data, indent=2))
	# return loads(dumps(cursor))
	return jsonify(data)
	
if __name__=='__main__':
	app.run(debug=True)