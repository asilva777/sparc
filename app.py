from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import requests
import os

app = Flask(__name__)
CORS(app)

# Email Config (replace with real credentials or use SendGrid)
app.config['MAIL_SERVER'] = 'smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = 'your-username'
app.config['MAIL_PASSWORD'] = 'your-password'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

AI_API_URL = 'http://localhost:5001/generate-advice'  # SPARC-AI endpoint

@app.route('/submit-assessment', methods=['POST'])
def submit_assessment():
    data = request.json

    def avg(arr): return sum(arr) / len(arr)

    c_avg = avg(data['coping'])
    a_avg = avg(data['adaptability'])
    s_avg = avg(data['sensitivity'])
    e_avg = avg(data['exposure'])

    total_score = (c_avg + a_avg) - (s_avg + e_avg)

    ai_payload = {
        "coping": c_avg,
        "adaptability": a_avg,
        "sensitivity": s_avg,
        "exposure": e_avg
    }

    ai_response = requests.post(AI_API_URL, json=ai_payload)
    ai_advice = ai_response.json().get("recommendation", "No advice returned.")

    # Send Email
    msg = Message(
        subject="SPARC Resilience Assessment Result",
        sender="noreply@sparc.ai",
        recipients=[data['email'], "admin@asilvainnovations.com"]
    )
    msg.body = f"""
Hello {data['firstName']} {data['lastName']},

Your SPARC Resilience Score: {round(total_score, 2)}

Personalized Recommendation:
{ai_advice}

Thank you,
SPARC Team
"""
    mail.send(msg)

    return jsonify({
        "status": "success",
        "score": round(total_score, 2),
        "advice": ai_advice
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
