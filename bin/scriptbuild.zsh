#!/bin/zsh
# Función para construir imágenes Docker
build() {
    echo "Construyendo las imágenes..."
    docker-compose build
}

start() {
    echo "Iniciando los contenedores..."
    docker-compose up
}

# Construir imágenes
build

# Iniciar contenedores
start

