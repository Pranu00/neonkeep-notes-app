from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Simple in-memory storage (resets when server restarts)
notes = []
note_id_counter = 1

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/notes", methods=["GET"])
def get_notes():
    return jsonify(notes)

@app.route("/api/notes", methods=["POST"])
def add_note():
    global note_id_counter
    data = request.get_json()
    note = {
        "id": note_id_counter,
        "title": data.get("title", ""),
        "content": data.get("content", ""),
        "color": data.get("color", "#1e1e1e")
    }
    notes.append(note)
    note_id_counter += 1
    return jsonify(note), 201

@app.route("/api/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    global notes
    notes = [n for n in notes if n["id"] != note_id]
    return jsonify({"status": "deleted"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
