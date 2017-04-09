## Launch Netsil AOC instance(s)

Get the Netsil AOC distributables from [download page](http://www.netsil.com/download).

|  |**Recommended**|**Minimum**|
|:---:|:---:|:---:|
|vCPUs| 8 (or more) | 4 |
|Memory| 32 GiB (or more) | 16 GiB |
|Disk| 1 TB (or more) | 500 GiB |

Note: Netsil AOC instance may take a few minutes to spin-up and become reachable.

> *Looking to scale up existing Netsil AOC installation? Follow the instructions to add a Netsil AOC worker instance in the [administration](administration.md) section.*

> *Looking to launch single container version of Netsil AOC? Follow the instructions in the [single container images](single-container-images.md) section.*

## Open Required Inbound Ports

Inbound traffic from public subnet:

- `443 (TCP)` and/or `80 (TCP)` for `Web UI access over HTTPS and/or HTTP (optional)`.

- `22 (TCP)` for `SSH` access (optional).

Inbound traffic from your cloud application VPC subnet:

- `2001 (TCP)` for collectors metrics channel.

- `2003 (TCP)` for collectors control channel.

- `2003 (UDP)` for collectors data channel.

- `5005 (TCP)` for collectors load balancer channel.

Inbound and Outbound traffic to/from Netsil AOC cluster VPC subnet:

- Entire TCP Port Range - `[0-65535]` for Netsil AOC cluster operation.

- Entire UDP Port Range - `[0-65535]` for Netsil AOC cluster operation.

At the basic level, ensure that your Netsil AOC instance is reacheable from the network where you're installing collectors.

*Note: If you are deploying Netsil AOC behind a load balancer, make sure to use layer 4 load balancing instead of layer 7 to properly proxy WebSocket connections.*

## Outbound traffic

Netsil requires an open channel to a license site for verifying your license key.

Ensure that the domain `lm.netsil.com` on port `443` is reacheable while you are running Netsil.

## Install Collectors

Follow the instructions in the [collectors](collectors.md) section to install the collectors package on your cloud application's instances.

## Start Using Netsil AOC!

Access the Web UI of Netsil AOC installation to view the live topology and KPIs of your cloud application. Point your web browser to:
```
https://<hostname-or-IP-address>
or
http://<hostname-or-IP-address>
```

*Need help? You can always reach out to us at support@netsil.com or at our public Slack (http://slack.netsil.com).*
