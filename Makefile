# runtime
DENO := deno run --allow-net

# module
PKG := web

define package
$(shell node -p "require('./package.json').$(1)")
endef

# docker
DTAG := $(call package,version)
DIMG := web.ts:${DTAG}

# runtime
deno:
	@${DENO} tests/${PKG}.test.ts

all:
	@$(MAKE) -s deno

# docker
docker-build:
	@docker image inspect ${DIMG} > /dev/null 2>&1 || docker build -t ${DIMG} .

docker-remove:
	@docker rmi -f ${DIMG}

docker-run:
	@docker run -it --network host --init ${DIMG}

docker:
	@echo ${DIMG}
	@$(MAKE) docker-build docker-run

# misc
docker-delete-all:
	@docker system prune -a --volumes

