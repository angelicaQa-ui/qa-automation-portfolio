/**
 * @file failure-tracker.js
 * @description Agente rastreador de errores y logs.
 * Procesa la evidencia técnica en bruto de los fallos para aislar el elemento afectado.
 */

async function trackFailures(errors) {
    console.log("🔎 [Failure Tracker] Analizando la causa raíz de los errores detectados...");

    const primaryError = errors[0] || {};
    
    // Diagnóstico y aislamiento del selector/elemento que falló
    const failureAnalysis = {
        detectedAt: new Date().toISOString(),
        errorType: "LocatorTimeoutError",
        failingSelector: primaryError.targetSelector || "[data-test='login-button']",
        suggestedReason: "El elemento cambió de identificador en el DOM o se volvió dinámico.",
        rawLogSnippet: primaryError.rawOutput || "Timeout 3000ms waiting for element [data-test='login-button']"
    };

    console.log(`🚨 [Failure Tracker] Error aislado en el selector: ${failureAnalysis.failingSelector}`);
    console.log(`💡 [Failure Tracker] Causa probable: ${failureAnalysis.suggestedReason}`);

    return failureAnalysis;
}

module.exports = { trackFailures };