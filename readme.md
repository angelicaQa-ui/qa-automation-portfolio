# QA Automation Portfolio - Reto Final & CI/CD (Día 5)

Repositorio de automatización correspondiente al reto final de la **Ruta Automatizadores 2026** de **María Angélica Pérez Polanias**.

---

## Stack Tecnológico
* **Lenguaje:** TypeScript / Node.js (v20)
* **Framework:** Playwright (con Page Object Model)
* **CI/CD:** GitHub Actions (`playwright.yml` en verde / *Succeeded*)
* **Control de Versiones:** Git & GitHub

---

## Contenido del Repositorio
* **`e2e/`**: Suite completa de pruebas automatizadas sobre SauceDemo (Happy Path, casos negativos y validaciones con selectores optimizados).
* **`.github/workflows/`**: Pipeline de integración continua configurado con ejecución automática, gestión segura de variables y reportes en la nube.
* **`Informe_IA_Dia5.pdf`**: Reporte ejecutivo detallado con las métricas de optimización, prompts y experiencia con IA del reto final.
* **Ejercicio Opcional (Parseur):** Integración de procesamiento de documentos con IA para extracción de datos en formato JSON orientados a pruebas dinámicas.

---
*Desarrollado por María Angélica Pérez Polanias*


QA Automation Portfolio - Arquitectura Multi-Agente & Self-Healing (Dia 2 reto QA-IA)

Este repositorio contiene una prueba de concepto avanzada para automatización de pruebas E2E utilizando Playwright y una Arquitectura Multi-Agente basada en IA para la ejecución, diagnóstico y auto-curación (Self-Healing).

Objetivo del Proyecto (Día 2)

Demostrar cómo la Inteligencia Artificial puede integrarse de forma modular dentro de un pipeline de CI/CD (GitHub Actions) no como un prompt monolítico, sino como un ecosistema de agentes con responsabilidades únicas (Single Responsibility Principle).

Arquitectura de Agentes

El ciclo de vida de la prueba se divide en los siguientes submódulos dentro de src/agents/:

agent-orchestrator.js: Coordinador central del pipeline de pruebas.

qa-planner.js: Analiza requerimientos y diseña la matriz de escenarios y precondiciones.

qa-executor.js: Ejecuta la automatización web interactuando con Playwright.

failure-tracker.js: Si una prueba se rompe, intercepta logs, errores y aísla el selector fallido.

qa-healer.js: Aplica el mecanismo de Self-Healing sugiriendo localizadores semánticos alternativos para reparar la prueba dinámicamente.

qa-reporter.js: Consolida los resultados en un reporte final listo para auditoría de calidad.

Configuración y Ejecución Local

Para ejecutar esta suite agéntica en tu entorno local:

Instalar las dependencias de Node y Playwright:

npm install
npx playwright install --with-deps


Ejecutar el orquestador de Inteligencia Artificial:

npm run agent:run


Integración Continua (CI/CD)

El pipeline completo está configurado en .github/workflows/playwright.yml.
Ante cualquier push o pull_request a la rama main, GitHub Actions ejecutará los tests de Playwright. Gracias a la configuración if: always(), si ocurre una falla por un cambio en la interfaz, el agente orquestador se activará automáticamente para realizar el diagnóstico de causa raíz y la curación de la prueba.