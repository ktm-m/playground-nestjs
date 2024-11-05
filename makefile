dev-up:
	docker compose -f docker-compose.dev.yml up -d

dev-down:
	docker compose -f docker-compose.dev.yml down

run-dev:
	yarn start:dev

build-image:
	docker build -t playground-nestjs .

run-image:
	docker run -d -p 3000:3000 --env-file .env.stage.build playground-nestjs

stop-image:
	docker stop $(shell docker ps -q --filter ancestor=playground-nestjs)

app-up:
	docker compose up -d

app-down:
	docker compose down