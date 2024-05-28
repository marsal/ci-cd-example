### Pipeline de CI/CD para un Proyecto con Husky, Prettier, ESLint, GitHub Actions y Docker

#### Objetivos:

El objetivo de este pipeline de CI/CD es automatizar y garantizar la calidad del código en un proyecto de software desde la integración hasta el despliegue, utilizando herramientas como Husky, Lint-staged, Prettier, ESLint y GitHub Actions. Además, se incluye Docker para facilitar la creación y despliegue de contenedores.

#### Pasos del Pipeline:

1. **Fase de Integración (CI):**

    - **Objetivo:** Asegurar que el código integrado cumpla con los estándares de calidad y formato definidos.
    - **Pasos:**
        - Husky y Lint-staged se configura para ejecutar automáticamente Prettier y ESLint antes de cada commit.
        - Prettier formatea automáticamente los archivos del proyecto según las reglas especificadas en la configuración.
        - ESLint realiza un análisis estático del código para identificar posibles errores y problemas de estilo.
        - Se ejecutan pruebas unitarias y de integración para validar el funcionamiento del código.
        - Usando GitHub Actions, al abrir una PR automaticamente revisamos los test y que el código compile
    - **Resultado Esperado:** Cada commit es revisado automáticamente para garantizar que cumpla con los estándares de calidad y formato antes de ser integrado en el repositorio principal.

2. **Fase de Entrega (CI/CD):**

    - **Objetivo:** Preparar el código para su despliegue en entornos de producción.
    - **Pasos:**
        - GitHub Actions se utiliza para automatizar el proceso de construcción del código y la creación de artefactos.
        - Se crea una imagen Docker mediante docker-compose que contiene la aplicación y sus dependencias.
        - Usando GitHub Actions se levanta la imagen Docker generada y se realizan las pruebas de sanidad
    - **Resultado Esperado:** Se genera una imagen Docker lista para su despliegue en un entorno de producción.

3. **Fase de Despliegue (CD):**
    - **Objetivo:** Desplegar la aplicación en un entorno de producción de manera automatizada y confiable.
    - **Pasos:**
        - Se configura GitHub Actions para desplegar automáticamente la imagen Docker en un entorno de producción.
        - Se ejecutan pruebas de humo en el entorno de producción para verificar el funcionamiento correcto de la aplicación desplegada.
    - **Resultado Esperado:** La aplicación se despliega automáticamente en un entorno de producción después de pasar las pruebas de integración, asegurando un despliegue rápido y confiable.

#### Conclusión:

Este pipeline de CI/CD proporciona una forma automatizada y eficiente de garantizar la calidad del código, desde la integración hasta el despliegue en entornos de producción. La combinación de herramientas como Husky, Prettier, ESLint, GitHub Actions y Docker facilita el proceso de desarrollo y despliegue de software, permitiendo entregas más rápidas y confiables.
