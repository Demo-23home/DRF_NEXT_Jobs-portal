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

show-logs:
	sudo docker compose -f local.yml logs -f

show-logs-api:
	sudo docker compose -f local.yml logs -f api

makemigrations:
	sudo docker compose -f local.yml run --rm api python manage.py makemigrations

migrate:
	sudo docker compose -f local.yml run --rm api python manage.py migrate

collectstatic:
	sudo docker compose -f local.yml run --rm api python manage.py collectstatic --no-input --clear

superuser:
	sudo docker compose -f local.yml run --rm api python manage.py createsuperuser

db-volume:
	sudo docker volume inspect jobbee_prod_postgres_data

mailpit-volume:
	sudo docker volume inspect jobbee__mailpit

psql: 
	sudo docker exec -it jobbe_pr_postgres psql -U jobbee_user -d jobbee_db

django_shell:
	sudo docker compose -f local.yml run --rm api python manage.py shell

backend_shell: 
	sudo docker compose -f local.yml exec api sh

generate_token:
	python -c "import secrets; print(secrets.token_urlsafe(38))"

setup: makemigrations migrate collectstatic
