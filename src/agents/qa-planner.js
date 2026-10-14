/**
 * @file qa-planner.js
 * @description Agente diseñador de escenarios de prueba.
 * Recibe requerimientos o historias de usuario y construye la matriz de casos de prueba.
 */

async function planTests(requirement) {
    console.log(`🧠 [QA Planner] Analizando requerimiento: "${requirement}"`);

    // Simulación del motor de análisis de escenarios/criterios de aceptación
    const testPlan = {
        requirement: requirement,
        generatedAt: new Date().toISOString(),
        scenarios: [
            {
                id: "TC-001",
                title: "Inicio de sesión exitoso con credenciales válidas",
                priority: "HIGH",
                preconditions: ["Usuario registrado en el sistema"],
                steps: [
                    "Navegar a la página de login",
                    "Ingresar usuario válido 'standard_user'",
                    "Ingresar contraseña válida 'secret_sauce'",
                    "Hacer clic en el botón de login"
                ],
                expectedResult: "Redirección a la pantalla principal de productos (/inventory.html)",
                targetSelector: "[data-test='login-button']"
            },
            {
                id: "TC-002",
                title: "Manejo de error al ingresar contraseña inválida",
                priority: "MEDIUM",
                preconditions: ["Usuario registrado en el sistema"],
                steps: [
                    "Navegar a la página de login",
                    "Ingresar usuario 'standard_user'",
                    "Ingresar contraseña incorrecta 'wrong_pass'",
                    "Hacer clic en el botón de login"
                ],
                expectedResult: "Mostrar mensaje de error 'Username and password do not match'",
                targetSelector: "[data-test='error']"
            }
        ]
    };

    console.log(`✅ [QA Planner] Plan de pruebas generado exitosamente con ${testPlan.scenarios.length} escenarios.`);
    return testPlan;
}

module.exports = { planTests };