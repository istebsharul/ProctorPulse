from pymongo import MongoClient
from bson import ObjectId  # Import ObjectId from bson module

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Choose database and collection
db = client['ProctorPulse']
collection = db['tests']

# Define the document to insert
document = {
    "name": "Sample Test",
    "subject": "Mathematics",
    "date": None,
    "duration": 60,
    "questions": [
        ObjectId('65e376eda85ea20a99965669') 
    ],
    "users": [
        ObjectId('65e31b3d79a1f873583d3f38')  # Use ObjectId constructor to create ObjectId values
    ],
    "createdBy": ObjectId('65e375efa85ea20a99965664')  # Use ObjectId constructor to create ObjectId values
}

# Insert the document into the collection
result = collection.insert_one(document)

# Print the inserted document's ID
print("Inserted document ID:", result.inserted_id)
