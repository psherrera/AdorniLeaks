# AdorniLeaks 🗃️

**Portal de memoria periodística sobre Manuel Adorni y su paso por el gobierno de Javier Milei.**

Todo lo que dijo, hizo, desairó y prometió. Para que no lo olvidemos.

---

## 📁 Estructura del Proyecto

```
adorni-leeks/
├── agent/           # Agente Python (indexador y redactor automático)
├── frontend/        # Portal Next.js (la cara visible)
├── sql/             # Schema de la base de datos
└── .github/         # GitHub Actions (automatización diaria)
```

---

## 🤖 El Agente

El agente corre todos los días a las 05:00 AM y hace 4 cosas:

1. **Fetcher** → Lee 12+ feeds RSS de medios argentinos y busca menciones de Adorni
2. **Evaluador** → Groq (Llama 3.3 70B, gratis) puntúa la relevancia del 1 al 10
3. **Redactor** → La IA reescribe el título y genera un resumen en tono periodístico rioplatense
4. **Indexador** → Guarda todo en Supabase

### Setup del agente

```bash
cd agent
pip install -r requirements.txt
cp .env.example .env
# Completar .env con las claves de Groq y Supabase
```

### Ejecutar localmente

```bash
cd agent
python main.py --dry-run        # Ver qué encontraría sin guardar nada
python main.py --limit 5        # Procesar 5 artículos de prueba
python main.py                  # Ejecución completa
```

---

## 🗄️ Base de Datos (Supabase)

1. Crear cuenta gratuita en [supabase.com](https://supabase.com)
2. Crear un proyecto nuevo
3. Ir a **SQL Editor** y ejecutar el contenido de `sql/schema.sql`
4. Copiar `SUPABASE_URL` y `SUPABASE_SERVICE_KEY` desde Settings → API

---

## 🔑 Credenciales Necesarias

| Variable | Dónde conseguirla |
|----------|-------------------|
| `GROQ_API_KEY` | [console.groq.com/keys](https://console.groq.com/keys) (gratis) |
| `SUPABASE_URL` | Supabase → Settings → API |
| `SUPABASE_SERVICE_KEY` | Supabase → Settings → API → service_role |

---

## ⚙️ GitHub Actions (Automatización)

1. Subir el repo a GitHub (puede ser público o privado)
2. Ir a **Settings → Secrets and variables → Actions**
3. Agregar los 3 secrets: `GROQ_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`
4. El workflow `.github/workflows/agente.yml` corre automáticamente todos los días a las 05:00 AM

---

## 🌐 Frontend (Vercel)

```bash
cd frontend
npm install
npm run dev     # Desarrollo local en http://localhost:3000
```

### Deploy en Vercel (gratis)

1. Conectar el repo en [vercel.com](https://vercel.com)
2. Agregar las variables de entorno `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automático en cada push a `main`

---

## 📊 Categorías del Archivo

| Categoría | Qué cubre |
|-----------|-----------|
| **Causas Judiciales** | Denuncias, expedientes, investigaciones |
| **Conferencias de Prensa** | Declaraciones oficiales en Casa Rosada |
| **Desaires** | Insultos y menosprecios a periodistas, discapacitados, etc. |
| **Dichos Polémicos** | Frases cuestionables, contradicciones, mentiras |
| **Gobierno** | Anuncios y acciones de gestión |

---

*AdorniLeaks — Porque la memoria es resistencia.*
