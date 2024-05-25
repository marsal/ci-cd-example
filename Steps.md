# PASOS A SEGUIR

### Instalar y configurar husky

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

### Instalar y configurar prettier

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
    - Añadir el comando en las sección **lint-staged** del archivo `package.json`
    ```json
        "lint-staged": {
            "**/*": "prettier --write --ignore-uknown"
        }
    ```
    - Añadir el comando para ejecutar lint-staged en el fichero `.husky/pre-commit`
    ```
        npx lint-staged
    ```
