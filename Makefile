# Build and run containers
build:
	sudo docker compose -f local.yml up --build --remove-orphans

build-d:
	sudo docker compose -f local.yml up --build -d --remove-orphans

up:
	sudo docker compose -f local.yml up

up-d:
	sudo docker compose -f local.yml up -d

down:
	sudo docker compose -f local.yml down

down-v: 
	sudo docker compose -f local.yml down -v

# Logs
show-logs:
	sudo docker compose -f local.yml logs -f

show-logs-api:
	sudo docker compose -f local.yml logs -f api

# Django management
makemigrations:
	sudo docker compose -f local.yml run --rm api python manage.py makemigrations

migrate:
	sudo docker compose -f local.yml run --rm api python manage.py migrate

collectstatic:
	sudo docker compose -f local.yml run --rm api python manage.py collectstatic --no-input --clear

superuser:
	sudo docker compose -f local.yml run --rm api python manage.py createsuperuser

django_shell:
	sudo docker compose -f local.yml run --rm api python manage.py shell

backend_shell: 
	sudo docker compose -f local.yml exec api sh

# Volumes inspection
db-volume:
	sudo docker volume inspect jobbee_postgres_data

mailpit-volume:
	sudo docker volume inspect jobbee__mailpit

# Postgres CLI
psql: 
	sudo docker compose -f local.yml exec postgres psql -U jobbee_user -d jobbee_db

# Remove data completely
rm-data:
	sudo docker volume rm jobbee_postgres_data
# Misc
generate_token:
	python -c "import secrets; print(secrets.token_urlsafe(38))"

# Setup shortcut
setup: makemigrations migrate collectstatic

docker_machine:
	sudo docker compose -f local.yml exec api bash