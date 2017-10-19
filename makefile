all: pre-build js icons manifest zipup clean
debug: pre-build js icons manifest debug2dist clean
debug2dist:
	cp -r tmp/* dist/;
js:
	cp -r src/js/* tmp/
icons:
	cp src/icons/icon-*.png tmp;
	cp src/icons/icon.png tmp
manifest:
	cp src/manifest.json tmp
zipup:
	cd tmp && zip -r ../dist/dist.zip *
clean:
	find tmp -type f -not -name '.gitignore' -exec rm -rf {} \;
pre-build:
	mkdir -p dist
	mkdir -p tmp
	cd dist && rm -rf *;
