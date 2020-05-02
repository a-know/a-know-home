.PHONY: all

run-dev:
	npm run dev

build:
	npm run build

deploy: build
	npm run deploy
