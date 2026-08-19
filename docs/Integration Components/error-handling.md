---
title: Error Handling
sidebar_position: 9
---

# Error Handling

## For Device Partner requests to VPP endpoints

For the following error codes, please retry using exponential backoff:
* 429
* 502
* 503
* 504

All other requests that receive an error should be discarded.