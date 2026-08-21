# ⚡ Volts Lab

A LeetCode-style practice platform for Electrical & Electronics Engineering (EEE) —
Theory and Numerical MCQs across 8 core subjects, with streaks, accuracy tracking,
subject mastery analytics, and a global leaderboard.

## Stack
- **Backend:** Django 4.2 + Django REST Framework + SimpleJWT + SQLite
- **Frontend:** React (Vite) + Tailwind CSS + Lucide Icons + React Router

## Design System
| Token | Hex |
|---|---|
| Obsidian background | `#0B0813` |
| Card surface | `#161224` |
| Neon Violet | `#9D4EDD` |
| Deep Purple | `#7B2CBF` |
| Cyberpunk Cyan | `#00F5FF` |

---

## 1. Backend Setup

```bash
cd volts_backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py makemigrations accounts problems submissions
python manage.py migrate
python manage.py seed_db        # loads sample MCQs for all 8 topics
python manage.py createsuperuser  # optional, for /admin
python manage.py runserver
```

API now runs at `http://127.0.0.1:8000/api/`.

### Key endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Create account, returns JWT pair |
| POST | `/api/auth/login/` | Login, returns JWT pair |
| GET/PATCH | `/api/auth/me/` | Current user profile |
| GET | `/api/problems/?topic=&problem_type=&difficulty=` | Filtered problem list |
| GET | `/api/problems/<id>/` | Problem detail (no answer key) |
| POST | `/api/submissions/submit/` | Submit `{question_id, selected_option}`, get evaluation |
| GET | `/api/analytics/dashboard/` | Logged-in user's stats + subject mastery |
| GET | `/api/analytics/leaderboard/` | Top 50 ranked users |

## 2. Frontend Setup

```bash
cd volts-frontend
npm install
cp .env.example .env      # points to http://127.0.0.1:8000/api by default
npm run dev
```

App runs at `http://localhost:5173`.

## 3. The 8 EEE Topics
Basic Electrical · Circuit Theory · Electronics and VLSI · Electrical Machines ·
Power Electronics · Renewable Energy · Control Systems · Embedded and IoT

## Notes
- JWT auth via `djangorestframework-simplejwt`; access token auto-refreshes on 401.
- Streak logic: a correct answer on a new calendar day increments `current_streak`;
  a missed day resets it to 1 on the next solve.
- `problems/management/commands/seed_db.py` ships with 24 sample MCQs (3 per topic:
  a mix of Theory/Numerical and Easy/Medium/Hard) — safe to re-run (idempotent).
