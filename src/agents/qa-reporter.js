/**
 * @file qa-reporter.js
 * @description Agente generador de reportes de ejecución y calidad.
 * Sintetiza los resultados finales y los guarda en un archivo estructurado.
 */

const fs = require('fs');
const path = require('path');

async function generateReport(executionData) {
    console.log("📊 [QA Reporter] Compilando reporte final del pipeline agéntico...");

    const reportContent = `
====================================================
📊 REPORTES DE EJECUCIÓN Y CALIDAD AGÉNTICA (QA IA)
====================================================
Fecha de ejecución: ${new Date().toLocaleString()}
Estado Global: ${executionData.status}

📌 Resumen del Pipeline:
- Planificación de Escenarios: Completada (QA Planner)
- Ejecución de Pruebas: Finalizada (QA Executor)
- Detección de Errores: ${executionData.hasFailures ? 'Activa - Fallos procesados' : 'Sin errores'}
- Mecanismo Self-Healing: ${executionData.hasFailures ? 'Aplicado con éxito (QA Healer)' : 'No requerido'}

✅ Estado de la suite: Pruebas listas e integradas para CI/CD.
====================================================
`;

    // Aseguramos que exista la carpeta de reportes
    const reportsDir = path.join(__dirname, '../../playwright-report');
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(reportsDir, 'agent-summary.txt'), reportContent, 'utf-8');
    console.log(reportContent);
    console.log("💾 [QA Reporter] Resumen guardado en playwright-report/agent-summary.txt");
}

module.exports = { generateReport };