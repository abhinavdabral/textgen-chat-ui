# TextGen-Chat-UI

An alternative front-end compatible with streaming APIs of [oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui) project.

# Why

While experimenting with `oobabooga/text-generation-webui`, when I finally found a model that was good enough for me, I tried to look for an alternative front-end that's super-basic without any bells and whistles and just works. Failing to find one that fits me needs, I decided to put together something quick and dirty that does the job.

This is good enough to be used internally (among friends and family) without any hassle, any logs, any APIs keys, or anything for the end-users.

# How to use?

### Pre-requisites

- Node
- Serve or any other static file server
- Proxy server (optional)

### 1. Clone the repository

```shell
git clone https://github.com/abhinavdabral/textgen-chat-ui.git
```

### 2. Setup ENV variable

```shell
cd textgen-chat-ui
cp .env.sample .env
```

Edit the `.env` file and put your Text-generation-WebUI's Stream API details there.

### 3. Build

```shell
yarn run build
```

### 4. Serve

From the project's root, you can run:

```shell
npx serve dist
```

Or you can copy files to wherever your static file web-server is.

### 5. (Optionally) Add proxy (if exposing to internet)

Assuming that we're doing this on Nginx Proxy Manager

**Pre-requisites**

- Nginx proxy server is already setup and running your other services

The process is standard if you're using this as proxy host (for direct subdomain like `chat.example.com`). However, if you're using this as a "Custom location" to an existing route **make sure to add a trailing slash** at the end of the `forward Hostname` IP. Example `10.10.10.40/`

# Contributing

- Pull requests, suggestions and issues are welcomed
- Idea is to keep this as bare-minimum so anything that adds value in a "barebones" project is welcomed.
