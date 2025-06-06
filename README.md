## 📁 `SPARC-Frontend/README.md`

````markdown
# SPARC-Frontend

This is the official frontend for the **SPARC (SME Disaster Preparedness and Resilience Check)** tool. It allows users to assess their resilience using the CASE Equation and receive personalized insights and recommendations.

## 🔍 Purpose

To deliver a user-friendly interface for SME users to input their disaster preparedness data and visualize their results.

## ✨ Features

- Full CASE Equation survey with detailed inputs
- Personal information collection with consent
- Responsive UI with styled form and results
- Result breakdown by Coping, Adaptability, Sensitivity, Exposure
- Hooks to backend for AI recommendations and score storage

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript (Vanilla)
- Chart.js (optional)
- Rasa Webchat (optional)

## 🚀 How to Use

```bash
# Clone repo
git clone https://github.com/YourOrg/SPARC-Frontend.git
````

Open `index.html` in a browser or deploy to GitHub Pages, Netlify, or your server.

## 📦 Deployment

```bash
# Static hosting suggestion
npm install -g serve
serve .
```

````

---

## 📁 `SPARC-Backend/README.md`

```markdown
# SPARC-Backend

The server-side logic for SPARC, responsible for processing assessments, calculating scores, storing results, sending emails, and interacting with the AI layer.

## 📌 Features

- API for receiving and processing submissions
- CASE Equation calculations and validation
- Email integration via SendGrid or Mailgun
- Calls SPARC-AI for tailored guidance
- Optional login/auth system for admins

## ⚙️ Tech Stack

- Python (Flask)
- PostgreSQL or MySQL
- SQLAlchemy
- SendGrid or SMTP
- CORS + REST API

## 🚀 Getting Started

```bash
git clone https://github.com/YourOrg/SPARC-Backend.git
cd SPARC-Backend
pip install -r requirements.txt
python app.py
````

Configure `.env` for DB and email credentials.

## 🔌 API Routes

* `POST /submit-assessment`
* `GET /results/:id` *(optional)*

````

---

## 📁 `SPARC-AI/README.md`

```markdown
# SPARC-AI

An AI microservice that uses a fine-tuned GPT-Neo (or similar) model to generate personalized resilience recommendations based on SPARC scoring inputs.

## 🤖 Features

- Predictive, context-aware disaster guidance
- Custom prompts aligned with CASE Equation
- API-first design, integrated with SPARC-Backend

## 💡 Model

- HuggingFace Transformers (GPT-Neo or GPT-2)
- Trained on SME disaster response best practices

## 🧠 Inputs

```json
{
  "coping": 3.8,
  "adaptability": 4.1,
  "sensitivity": 2.6,
  "exposure": 3.0
}
````

## ✉️ Output

Natural language paragraph with tailored suggestions.

## 🛠️ Setup

```bash
git clone https://github.com/YourOrg/SPARC-AI.git
cd SPARC-AI
pip install -r requirements.txt
python app.py
```

Use `ngrok` or deploy on HuggingFace Spaces, AWS, or Render.

````

---

## 📁 `SPARC-NLG/README.md`

```markdown
# SPARC-NLG

This repo contains training data, prompt templates, and scripts for fine-tuning a GPT-based model to produce resilience recommendations.

## 🧠 Purpose

To supply SPARC-AI with domain-specific data so it can generate high-quality, SME-tailored disaster preparedness advice.

## 📁 Structure

- `data/`: JSON, CSV with case studies & insights
- `prompts/`: Scoring prompt templates
- `fine_tune_config.json`: HuggingFace Trainer settings

## 🧪 Fine-Tuning

Use Google Colab, HuggingFace Trainer, or local GPU:

```bash
transformers-cli train \
  --model_name gpt2 \
  --train_file ./data/resilience_cases.json \
  --config ./fine_tune_config.json
````

## 🔍 Licensing

Use responsibly for non-commercial purposes unless fine-tuned model is publicly released.

````

---

## 📁 `SPARC-Chatbot/README.md`

```markdown
# SPARC-Chatbot

A conversational AI assistant built with Rasa to provide dynamic support to SME users during their resilience assessment.

## 💬 Capabilities

- Guide users through survey sections
- Answer disaster-related FAQs
- Expand on recommendations from SPARC-AI
- Multi-intent & context-aware support

## 🧠 Stack

- Rasa (NLU + Core)
- YAML stories
- Python custom actions (optional)

## 🚀 Setup

```bash
git clone https://github.com/YourOrg/SPARC-Chatbot.git
cd SPARC-Chatbot
pip install -r requirements.txt
rasa train
rasa run actions
rasa shell
````

Or deploy with [Rasa X](https://rasa.com/docs/rasa-x/).

## 📦 Integration

Embed Rasa Webchat into SPARC-Frontend using:

```html
<script src="https://cdn.jsdelivr.net/npm/rasa-webchat/lib/index.min.js"></script>
```

````

---

## 📁 `SPARC-Dashboard/README.md`

```markdown
# SPARC-Dashboard

This repo includes data visualization tools and components to graphically present SPARC resilience scores, trends, and improvements.

## 📊 Features

- Bar/Line charts for CASE component averages
- Comparative risk overlays (optional)
- Mobile-friendly dashboard layout
- Can connect live to SPARC-Backend API

## 🔧 Technologies

- Chart.js
- D3.js (optional)
- Bootstrap or Tailwind UI

## 🔌 Example Usage

```javascript
const ctx = document.getElementById("chart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: { ... },
  options: { responsive: true }
});
````

## 📦 Hosting

Can be embedded in `SPARC-Frontend` or hosted as a separate admin view.

```

---

Would you like ZIP-ready versions of these with starter code files next? Or GitHub-ready repo setup scripts? Let’s keep this momentum going! 🔧🤖📁
```
