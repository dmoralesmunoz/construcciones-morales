# Morales Construcción y Remodelaciones

Landing page React + Vite para David Morales Carreño, orientada a captación de presupuestos en la Región Metropolitana.

## Desarrollo local

Instala Node.js LTS y luego ejecuta:

```powershell
npm install
npm run dev
```

El número de WhatsApp se configura en `src/main.jsx`, en la constante `WHATSAPP`.

## Producción

```powershell
npm run build
```

El proyecto queda listo para Vercel. El deploy automático se activa al conectar el repositorio de GitHub.

## Flujo GitHub + Vercel

1. Crea un repositorio vacío en GitHub (sin README).
2. En esta carpeta ejecuta:

```powershell
git init
git add .
git commit -m "feat: create initial website"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

Para enviar cambios posteriores:

```powershell
git add .
git commit -m "feat: update website"
git push origin main
```

En Vercel: `Add New > Project > Import Git Repository`, selecciona el repositorio y pulsa `Deploy`. Como es una página estática, deja el framework en `Other`, el build command vacío y el output directory vacío. Cada push a `main` desplegará automáticamente.
