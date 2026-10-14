/**
 * @file qa-executor.js
 * @description Agente ejecutor de pruebas de Playwright.
 * Ejecuta la suite de pruebas automatizadas y captura los resultados de ejecución.
 */

const { execSync } = require('child_process');

async function executeTests(testPlan) {
    console.log(`⚡ [QA Executor] Iniciando ejecución de la suite en Playwright...`);

    let hasFailures = false;
    let errors = [];

    try {
        // Intenta ejecutar el comando de Playwright
        console.log("🏃 [QA Executor] Corriendo comando: npx playwright test");
        const stdout = execSync('npx playwright test --reporter=json', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
        console.log("✅ [QA Executor] Pruebas ejecutadas sin fallos directos.");
    } catch (error) {
        hasFailures = true;
        console.warn("⚠️ [QA Executor] Se detectaron aserciones o fallos durante la ejecución.");
        
        // Capturamos el log de error
        errors.push({
            timestamp: new Date().toISOString(),
            rawOutput: error.stdout || error.stderr || error.message,
            failingScenario: "TC-001 / TC-002",
            targetSelector: "[data-test='login-button']"
        });
    }

    return {
        status: hasFailures ? 'FAILED' : 'PASSED',
        hasFailures,
        errors,
        executedAt: new Date().toISOString()
    };
}

module.exports = { executeTests };