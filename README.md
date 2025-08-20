# 🚀 Proyecto en React

Este es un proyecto base desarrollado con **React**.  
Sirve como punto de partida para aplicaciones frontend modernas, con componentes reutilizables, hooks y una arquitectura limpia.

---

## 📦 Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

Verifica las versiones instaladas:

node -v
npm -v
⚙️ Instalación
Clona el repositorio e instala las dependencias:
npm install
▶️ Ejecución en desarrollo
Para iniciar el servidor de desarrollo:

npm start
La aplicación estará disponible en:
👉 http://localhost:3000

🏗️ Construcción para producción
Para generar los archivos optimizados de producción:

npm run build
Esto generará la carpeta /build lista para desplegar.

🧪 Pruebas
Si configuraste pruebas, puedes ejecutarlas con:

npm test

En el proyecto puedes usar:

npm start → Inicia la app en modo desarrollo

npm run build → Genera la app para producción

npm test → Ejecuta pruebas unitarias

npm run eject → Expone la configuración de CRA (⚠️ irreversible)

🌐 Despliegue
Puedes desplegar la aplicación en plataformas como:

Vercel

Netlify

GitHub Pages

Ejemplo con Vercel:

npm run build
vercel deploy