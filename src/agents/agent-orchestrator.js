/**
 * @file agent-orchestrator.js
 * @description Orquestador principal del flujo agéntico de QA.
 * Coordina la planificación, ejecución, rastreo de fallas, auto-curación y reporte.
 */

const fs = require('fs');
const path = require('path');

// Importamos los submódulos de agentes
const { planTests } = require('./qa-planner');
const { executeTests } = require('./qa-executor');
const { trackFailures } = require('./failure-tracker');
const { healLocators } = require('./qa-healer');
const { generateReport } = require('./qa-reporter');

async function main() {
    console.log("====================================================");
    console.log("🤖 [AGENTE ORQUESTADOR] Iniciando Pipeline de QA IA");
    console.log("====================================================\n");

    const requirement = "Validar inicio de sesión exitoso y manejo de credenciales inválidas en la plataforma.";

    try {
        // 1. Planificación
        console.log("📌 Paso 1: Generando plan de pruebas con qa-planner...");
        const plan = await planTests(requirement);

        // 2. Ejecución
        console.log("\n🚀 Paso 2: Ejecutando pruebas con qa-executor...");
        const executionResult = await executeTests(plan);

        // 3. Verificación de fallas y Self-Healing
        if (executionResult.hasFailures) {
            console.log("\n⚠️ Paso 3: Se detectaron fallos. Activando failure-tracker...");
            const failureData = await trackFailures(executionResult.errors);

            console.log("\n🩹 Paso 4: Aplicando Self-Healing con qa-healer...");
            const healedFixes = await healLocators(failureData);

            console.log("🔄 Re-ejecutando pruebas corregidas...");
            await executeTests(healedFixes);
        } else {
            console.log("\n✅ Todas las pruebas pasaron correctamente a la primera.");
        }

        // 4. Reporte final
        console.log("\n📊 Paso 5: Generando reporte final con qa-reporter...");
        await generateReport(executionResult);

        console.log("\n====================================================");
        console.log("🎉 [AGENTE ORQUESTADOR] Proceso completado con éxito.");
        console.log("====================================================");

    } catch (error) {
        console.error("❌ Error en el orquestador:", error.message);
    }
}

// Permitir ejecución directa por CLI
if (require.main === module) {
    main();
}

module.exports = { main };