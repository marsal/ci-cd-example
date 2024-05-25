# PASOS A SEGUIR

## Husky

1. Instalación de la dependencia

    ```bash
    npm install --save-dev husky lint-staged
    ```

2. Inicialización, eso creará una carpeta `.husky` en la raíz del proyecto con el hook pre-commit donde podemos configurar que scripts deben ejecutarse antes de cada commit

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
    - Fichero de configuración, añadimos el fichero `.prettierrc` en la raíz del proyecto con el siguiente contenido
    ```prettier
        {
            "singleQuote": true, // Forzar uso de comillas simples
            "bracketSpacing": false, // Uso de espacio entre los {}
            "printWidth": 80, // Tamaño máximo de una liena de código
            "tabWidth": 4, // Ando de cada tabulación
        }
    ```
    - Fichero de ignores, añadimos el fichero `.prettieringnore` en la raíz del proyecto con el siguiente contenido (este fichero indica a prettier en que directorios no debe aplicar sus reglas)
    ```
    build
    coverage
    ```
3. Añadir prettier como parte del hook de pre-commit
    - Añadir el comando en la sección **lint-staged** del archivo `package.json`
    ```json
        "lint-staged": {
            "**/*": "prettier --write --ignore-unknown"
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
            "**/*": "prettier --write --ignore-unknown"
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
    npm run test
    ```

## Cucumber

1. Instalación de cucumber y sus dependencias
    ```bash
        npm install --save-dev @cucumber/cucumber tsconfig-paths eslint-plugin-cucumber
    ```
2. Añadimos el plugin de cucumber a la config de eslint

    ```
    {
        plugins: ["cucumber"],
    }
    ```

3. Configuración de cucumber, crear el fichero `cucumber.js` en la raíz del proyecto y añadir el siguiente contenido
    ```typescript
    module.exports = {
        default: {
            paths: ['test/**/*.feature'],
            requireModule: ['ts-node/register', 'tsconfig-paths/register'],
            require: ['test/features/**/*.ts'],
            format: ['progress'],
        },
    };
    ```
4. Añadir el script para lanzar los test de cucumber en el `package.json`
    ```json
    {
        "scripts": {
            "test:cucumber": "cucumber-js"
        }
    }
    ```
5. Añadir el script de test en el hook pre-commit de husky (`.husky/pre-commit`)
    ```bash
    npm run test:cucumber
    ```

## Github Actions

1. Creamos un el directorio `.github/workflows` en la raíz del proyecto
2. Creamos el fichero `ci-test.yml` y le añadimos el siguiente contenido

    ```yaml
    name: Tests CI

    on:
        pull_request:
            branches: ['master']

    jobs:
        build:
            runs-on: ubuntu-latest

            strategy:
                matrix:
                    node-version: [20.x]

            steps:
                - name: Checkout code
                uses: actions/checkout@v3

                - name: Set up Node.js ${{ matrix.node-version }}
                uses: actions/setup-node@v3
                with:
                    node-version: ${{ matrix.node-version }}
                    cache: 'npm'

                - name: Install dependencies from package.json
                run: npm ci

                - name: runs the build script
                run: npm run build --if-present

                - name: Run tests
                run: npm test && npm run test:cucumber
    ```
