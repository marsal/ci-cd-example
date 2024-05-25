# PASOS A SEGUIR

## Husky

1. Instalación de la dependencia

    ```bash
    npm install --save-dev husky lint-staged
    ```

2. Inicialización, eso creará una carpeta .husky en la raiz del proyecto con el hook pre-commit donde podemos configurar que scripts deben ejecutarse antes de cada commit

    ```bash
    npx husky init
    ```

3. Test it
    ```bash
    git commit -m "Keep calm and commit"
    ```

## Prettier

1. Instalación de la dependencia
    ```bash
    npm install --save-dev prettier
    ```
2. Ficheros necesarios
    - Fichero de configuración, añadimos el fichero `.prettierrc` en la raiz del proyecto con el siguiente contenido
    ```prettier
        {
            "singleQuote": true, // Forzar uso de comillas simples
            "bracketSpacing": false, // Uso de espacio entre los {}
            "printWidth": 80, // Tamaño máximo de una liena de código
            "tabWidth": 4, // Ando de cada tabulación
        }
    ```
    - Fichero de ignores, añadimos el fichero `.prettieringnore` en la raiz del proyecto con el siguiente contenido (este fichero indica a prettier en que directorios no debe aplicar sus reglas)
    ```
    build
    coverage
    ```
3. Añadir prettier como parte del hook de pre-commit
    - Añadir el comando en las sección **lint-staged** del archivo `package.json` (podeis ver una lista de options aplicables en: https://prettier.io/docs/en/cli#--check )
    ```json
        "lint-staged": {
            "**/*": "prettier --write --ignore-uknown"
        }
    ```
    - Añadir el comando para ejecutar lint-staged en el fichero `.husky/pre-commit`
    ```
        npx lint-staged
    ```

## Eslint

1. Instalación de la dependencia
    ```bash
        npm install --save-dev eslint@8.57.0
    ```
2. Instalación de los plugins de prettier y typescript para eslint
    ```bash
        npm install --save-dev eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
    ```
3. Configurar eslint, creamos el fichero `.eslintrc.cjs` en la carpeta raíz del proyecto y añadimos esto
    ```typescript
    module.exports = {
        parser: '@typescript-eslint/parser',
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
        ],
        plugins: ['@typescript-eslint', 'prettier'],
        rules: {
            // Aquí puedes agregar o modificar reglas específicas de ESLint si lo deseas
        },
    };
    ```
4. Añadir eslint a lint-staged, modificamos la sección **lint-staged** del fichero `package.json` para que ejecute eslint y prettier
    ```json
        "lint-staged": {
            "*.{js, jsx,ts,tsx}": [
                "eslint --quiet --fix"
            ],
            "**/*": "prettier --write --ignore-uknown"
        }
    ```

## Jest

1. Instalación de jest y sus dependencias
    ```bash
        npm install --save-dev jest ts-jest @types/jest ts-node
    ```
2. Configuración de jest, crear el fichero `jest.config.ts` y añadir el siguiente contenido
    ```typescript
    module.exports = {
        preset: 'ts-jest',
        testEnvironment: 'node',
        testRegex: '.*\\.spec\\.ts$',
        moduleFileExtensions: ['ts', 'js'],
        collectCoverage: true,
        coverageReporters: ['html', 'text-summary'],
    };
    ```
3. Añadir el script para lanzar los test en el `package.json`
    ```json
    {
        "scripts": {
            "test": "jest"
        }
    }
    ```
4. Añadir el script de test en el hook pre-commit de husky (`.husky/pre-commit`)
    ```bash
    npm test
    ```
