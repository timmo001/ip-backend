ARG BUILD_FROM=ghcr.io/timmo001/container-base/amd64:stable
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Copy root filesystem
COPY rootfs /

# Copy application
COPY . /opt/ip-backend

# Set shell
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

WORKDIR /opt/ip-backend

# Install system
# hadolint ignore=DL3003,DL3018
RUN \
    set -o pipefail \
    \
    && apk add --no-cache --virtual .build-dependencies \
        make=4.3-r0 \
        python3-dev=3.9.5-r1 \
    \
    && apk add --no-cache \
        nginx=1.20.1-r3 \
        nodejs-current=16.6.0-r0 \
        yarn=1.22.10-r0 \
    \
    && yarn install \
    \
    && apk del --no-cache --purge .build-dependencies \
    && rm -fr /tmp/*

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_REF
ARG BUILD_REPOSITORY
ARG BUILD_VERSION

# Labels
LABEL \
    maintainer="Aidan Timson <contact@timmo.xyz>" \
    org.opencontainers.image.title="${BUILD_NAME}" \
    org.opencontainers.image.description="${BUILD_DESCRIPTION}" \
    org.opencontainers.image.vendor="Timmo" \
    org.opencontainers.image.authors="Aidan Timson <contact@timmo.xyz>" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.url="https://timmo.dev" \
    org.opencontainers.image.source="https://github.com/${BUILD_REPOSITORY}" \
    org.opencontainers.image.documentation="https://github.com/${BUILD_REPOSITORY}/blob/main/README.md" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}
