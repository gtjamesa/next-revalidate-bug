# Next Revalidate Bug

Reproduction for `file-system-cache` revalidate not working when paired with `isrMemoryCacheSize: 0`. 

```bash
# 1. Start app
$ pnpm dev

# 2. (optional) Perform a first request to compile
$ curl -s http://127.0.0.1:3000

# 3. In another terminal, remove `fetch-cache` and watch files for date changes
$ rm -rf .next/cache/fetch-cache; watch -n1 stat .next/cache/fetch-cache/*

# 4. Send requests to server
$ while true; do curl -s http://127.0.0.1:3000 | grep -oP '<p>Server time: .*?</p>' --color=none; sleep 5; done
```

```bash
$ cat .next/cache/fetch-cache/*
```

**Cache file via `fetch()`:**

```json
{
  "kind": "FETCH",
  "data": {
    "headers": {
      "connection": "keep-alive",
      "content-encoding": "br",
      "content-type": "application/json; charset=utf-8",
      "date": "Wed, 15 Nov 2023 16:37:06 GMT",
      "server": "nginx/1.18.0 (Ubuntu)",
      "transfer-encoding": "chunked",
      "vary": "Accept-Encoding"
    },
    "body": "eyJ5ZWFyIjoyMDIzLCJtb250aCI6MTEsImRheSI6MTUsImhvdXIiOjE2LCJtaW51dGUiOjM3LCJzZWNvbmRzIjo2LCJtaWxsaVNlY29uZHMiOjI3MSwiZGF0ZVRpbWUiOiIyMDIzLTExLTE1VDE2OjM3OjA2LjI3MTgwMzUiLCJkYXRlIjoiMTEvMTUvMjAyMyIsInRpbWUiOiIxNjozNyIsInRpbWVab25lIjoiVVRDIiwiZGF5T2ZXZWVrIjoiV2VkbmVzZGF5IiwiZHN0QWN0aXZlIjpmYWxzZX0=",
    "status": 200,
    "url": "https://timeapi.io/api/Time/current/zone?timeZone=UTC"
  },
  "revalidate": 30,
  "tags": [
    "time-with-fetch"
  ]
}
```

**Cache file via `unstable_cache()`:**

```json
{
  "kind": "FETCH",
  "data": {
    "headers": {},
    "body": "{\"year\":2023,\"month\":11,\"day\":15,\"hour\":16,\"minute\":37,\"seconds\":6,\"milliSeconds\":301,\"dateTime\":\"2023-11-15T16:37:06.3014833\",\"date\":\"11/15/2023\",\"time\":\"16:37\",\"timeZone\":\"UTC\",\"dayOfWeek\":\"Wednesday\",\"dstActive\":false}",
    "status": 200,
    "url": ""
  },
  "revalidate": 30,
  "tags": [
    "time-with-unstable-cache"
  ]
}
```
