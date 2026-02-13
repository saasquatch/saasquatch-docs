---
title: Short domain IP address migration
deadline: 2020-07-08
contentType: breakingChange
---

We are moving the service that powers custom domains for share links (e.g. `ssqt.co`). As part of this migration customers will be required to update their DNS settings to a CNAME instead of a static IP. This migration will enable the use of automatic SSL certificate management as well HTTPS for custom short domains.

__Migration Path__

Customers will be required to update their DNS settings by no later than __Wednesday, July 8th 2020__.

There are two different migration paths.

- __Subdomains__ (e.g. `referral.example.com`) will need to be migrated to point at a CNAME record at `ssqt.co`
- __Apex domains__ (e.g. `example.com`) will need to contact the support team for the new IP addresses.

For more details check out our updated [custom short domain guide](/customshortdomainguide/).


__Timeline of steps:__

- __Transition Window__ -- The existing shortener will be available to give everyone a chance to update their DNS settings.
- __Deadline__ --- All domains should have been migrated. The existing shortener will be shut down.