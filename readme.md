# anki-project

## Scripts

### `scriptbuild.zsh`
Este script se encarga de construir las imágenes Docker e iniciar los contenedores
1. **Haz el script ejecutable**:

    ```sh
    chmod +x bin/scriptbuild.zsh
    ```

2. **Ejecuta el script**:

    ```sh
    ./bin/scriptbuild.sh
    ```

### `scriptmigrations.zsh`

Este script se encarga de ejecutar migraciones y crear superusuario. Está diseñado para ser utilizado después de iniciar los contenedores Docker.

1. **Haz el script ejecutable**:

    ```sh
    chmod +x bin/scriptmigrations.sh
    ```

2. **Ejecuta el script**:

    ```sh
    ./bin/scriptmigrations.sh
    ```

## IMPORTANTE:

Primero se debe correr `scriptbuild.zsh` y luego `scriptmigrations.zsh`
