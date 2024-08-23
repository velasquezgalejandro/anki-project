makemigrate() {
    echo "Ejecutando migraciones..."
    docker compose exec backend python manage.py makemigrations
}

migrate() {
    echo "Ejecutando migraciones..."
    docker-compose exec backend python manage.py migrate
}

superuser() {
    echo "Creando superuser..."
    docker-compose exec backend python manage.py createsuperuser
}

# Ejecutar migraciones
makemigrate

# Ejecutar migraciones
migrate

# crear superuser
superuser
