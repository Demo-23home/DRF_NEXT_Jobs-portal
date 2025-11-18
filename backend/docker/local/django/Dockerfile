FROM python:3.12.2-slim-bookworm AS python

# Stage 1: Build dependencies
FROM python AS python-build-stage

ARG BUILD_ENVIRONMENT=local

# Install build dependencies for wheels
RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    gdal-bin \
    libgdal-dev \
    libgeos-dev \
    && rm -rf /var/lib/apt/lists/*

COPY ./requirements .

RUN pip wheel --wheel-dir /usr/src/app/wheels -r ${BUILD_ENVIRONMENT}.txt

# Stage 2: Run stage
FROM python AS python-run-stage

ARG BUILD_ENVIRONMENT=local
ARG APP_HOME=/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV BUILD_ENV=${BUILD_ENVIRONMENT}

WORKDIR ${APP_HOME}

# Install runtime dependencies including GDAL and GEOS
RUN apt-get update && apt-get install --no-install-recommends -y \
    sudo \
    git \
    bash-completion \
    nano \
    ssh \
    gdal-bin \
    libgdal-dev \
    libgeos-dev \
    libpq-dev \
    gettext \
    && rm -rf /var/lib/apt/lists/*

# Optional: create symlinks so your .env paths are valid
RUN ln -s /usr/lib/x86_64-linux-gnu/libgdal.so /usr/lib/libgdal.so \
 && ln -s /usr/lib/x86_64-linux-gnu/libgeos_c.so /usr/lib/libgeos_c.so

# Create django user and staticfiles directory
RUN addgroup --system django && \
    adduser --system --ingroup django django && \
    mkdir -p ${APP_HOME}/staticfiles && \
    chown django:django ${APP_HOME}/staticfiles && \
    chmod 755 ${APP_HOME}/staticfiles

# Copy prebuilt wheels and install python packages
COPY --from=python-build-stage /usr/src/app/wheels /wheels/
RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
    && rm -rf /wheels/

# Entrypoint
COPY --chown=django:django ./docker/local/django/entrypoint.sh /entrypoint
RUN sed -i "s/\r$//g" /entrypoint && chmod +x /entrypoint

# Start script
COPY --chown=django:django ./docker/local/django/start.sh/ /start
RUN sed -i "s/\r$//g" /start && chmod +x /start

# Copy app code
COPY --chown=django:django . ${APP_HOME}
RUN chown -R django:django ${APP_HOME}

USER root

ENTRYPOINT ["/entrypoint"]
