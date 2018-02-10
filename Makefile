.PHONY: all

VERSION = 100

deploy: 
	gcloud app deploy --project a-know-home-194801 --version ${VERSION}
