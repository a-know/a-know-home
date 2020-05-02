.PHONY: all

VERSION = 100

run-dev:
	npm run dev

deploy: 
	gcloud app deploy --project a-know-home-194801 --version ${VERSION}
