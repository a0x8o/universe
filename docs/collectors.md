# Collectors

Collectors are lightweight agents which get deployed on your cloud application's instances. Collectors are available for various platforms and you may use your existing configuration management tools to deploy them automatically. Collectors establish data channels back to the **Netsil AOC** installation. Please follow the instructions in the [installation guide](installation.md) to open the required ports.

Choose your platform and follow the instructions to install the collectors on the target instance.

## Installing Collectors

### Installing on Linux (64-bit) <i class="fa fa-linux"></i>

#### Quickstart
Collectors are available for 64-bit Linux systems that use DEB or RPM package managers. To install the collectors, run the below command as a root user on the target instance:

```bash
wget --no-check-certificate --header="userport: ${port}" \
     -O /usr/bin/install-netsil-collectors.sh ${host}/install_netsil_collectors?access_token=${token} \
     && chmod +x /usr/bin/install-netsil-collectors.sh \
     && INTERFACE=any MTUSIZE=1432 \
     && /usr/bin/install-netsil-collectors.sh \
     && /etc/init.d/netsil-collectors restart
```

> Notes:
>
> * If you are running behind a load balancer you need to use the **private IP address** instead of the hostname `${host}`
> * For the actual values of these variables go to `Settings > Collection > APIs and Keys` on Netsil AOC.

`INTERFACE` and `MTUSIZE` are optional parameters.
Other optional parameters can also be passed in a similar way.
Collectors will automatically start upon installation.
Please see the [configuration](#configuring-collectors) section to learn about optional parameters.

Collectors can be started and stopped with the help of bundled `init` scripts:

```bash
# Start the collectors
/etc/init.d/netsil-collectors start
# Stop the collectors
/etc/init.d/netsil-collectors stop
```

#### Manual Installation
This section provides instructions for manual installation of the collectors. Please run these commands as a root user.

Replace `${pkg_type}` with `deb` or `rpm` and replace `${your.netsil.ip}` with the IP address of your netsil instance.

1. Download the collectors with the command

        wget --no-check-certificate -q -O \
            netsil-collectors.${pkg_type} \
            https://${your.netsil.ip}/netsil-collectors-64bit-${versionNumber}.${pkg_type}

2. Install the collectors with the command below.

        # Debian-based systems
        dpkg -i --force-overwrite netsil-collectors.deb

        # RHEL-based systems
        rpm -i -U --replacefiles --replacepkgs netsil-collectors.rpm

3. Now we will configure the collectors. At minimum, you must include the `NETSIL_SP_HOST` variable when running the configure script.

        NETSIL_SP_HOST=${your.netsil.ip} /opt/netsil/collectors/configure.sh

     > **Note**:  To reconfigure the collectors, re-run the `configure.sh` script with the variable `DO_OVERWRITE=yes` and restart the collectors.
     Reconfiguration will overwrite your current configuration or revert variables to their default settings.
     For instance, you must set `NETSIL_SP_HOST` on successive reconfigurations, otherwise it will get reverted to its default of localhost.
     This applies to any other variables you may have set.

4. Finally, start the collectors with your init scripts

        /etc/init.d/netsil-collectors start

Refer to the [configuration](#manual-installation-configuration) section for a list of the other parameters you can configure.

### Installing as a Docker Container

1. Pull the image `${uriNamespace}/collectors:${version}` from Docker Hub:

        docker pull ${uriNamespace}/collectors:${version}

2. Run collectors using this image, with the following command:

        docker run -td \
               --name=netsil_collectors \
               --net=host \
               -v /var/run/docker.sock:/var/run/docker.sock:ro \
               -v /proc/:/host/proc/:ro \
               -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
               --cap-add=NET_RAW \
               --cap-add=NET_ADMIN \
               -e NETSIL_SP_HOST=${hostname} \
               -e NETSIL_TRAFFIC_PORT=2003 \
               -e NETSIL_INFRA_PORT=2001 \
               -e DEPLOY_ENV="docker" \
               ${uriNamespace}/collectors:${version}

  > Note: If you are running behind a load balancer you need to use the **private IP address** instead of the hostname `${hostname}`

### Installing on Mesosphere DC/OS

Collectors can also be installed on DC/OS using a marathon JSON spec.

1. Download the `Marathon` spec using the following command:

        wget -O netsil-collectors-dcos.json downloads.netsil.io/specs/${buildBranch}/netsil-dcos-collectors-${version}.json

2. After downloading the JSON file, you may modify the "instances" field to reflect the number of nodes in your `DC/OS` cluster.

    If you are not installing **Netsil AOC** in `marathon/DCOS`, you may need to change the `NETSIL_SP_HOST` field to reflect the address of your instance of **Netsil AOC**.

3. After configuration, install the collectors with the command:

        dcos marathon app add netsil-collectors-dcos.json

### Installing on Kubernetes

You can install the collectors on kubernetes as a DaemonSet, which will install the collectors on all the nodes in your cluster. Refer to [these](https://github.com/netsil/manifests/tree/master/kubernetes#installing-collectors) instructions to install the collectors on kubernetes.

### Installing on Amazon Elastic Beanstalk

You can install the collectors on Amazon Elastic Beanstalk with the deploy script [here](https://s3.amazonaws.com/downloads.netsil.io/specs/stable/collectors-elasticbeanstalk.txt).

## Configuring Collectors

The following sections cover various configuration parameters that collectors can accept.

Be sure to include the `DO_OVERWRITE=yes` parameter if you are reconfiguring via the `configure.sh` script.

Note: After making any changes to the configuration, restart the collectors using the bundled `init` scripts to apply the changes:
```bash
/etc/init.d/netsil-collectors stop
/etc/init.d/netsil-collectors start
```

> *Note: Collectors are not necessarily required to be configured to run, as these come with configuration which should work in most normal usage scenarios.*


### Infrastructure Tags

You can [assign Infrastructure Tags](tagging-infrastructure.md#assign-infrastructure-tags-on-collectors) during the collector installation process by passing the environment variable:

  `TAGS = "tag,tag_key:tag_value"`

Different infrastructure tags (either single or key:value pairs) are separated by commas.

Please read more about configuring automatic infrastructure tag collection [here](tagging-infrastructure.md).

### Remote Packet Capture Configuration

To configure the collector's remote packet capture parameters, edit the file:

`/etc/netsil-collectors/rpcapd.ini` *(for Linux collectors)*

Each parameter is separated by a newline. Parameters are as follows:

You may also pass these variables as environment variables if you are reconfiguring via the `configure.sh` script.

* Sets MTU size. This should be equal or less than the MTU size supported by the network minus 28:
> `MTUSIZE = <integer>`

* Set interface to capture traffic on:
> `INTERFACE = <name>`

* Set BPF filter. To properly configure the filter, you may look at the [BPF documentation](http://biot.com/capstats/bpf.html)
> `BPFFILTER = <string>`

* Set sampling rate:
> `SAMPLINGRATE = <1-128, 0 implies no sampling>`

* Enable compression:
> `ENABLE_COMPRESSION = <yes, no>`

### Manual Installation Configuration
You may pass these variables as environment variables if you are reconfiguring via the `configure.sh` script.

They are as follows:

* Netsil host (typically your Netsil ip):
> `NETSIL_SP_HOST=<address>`

* Traffic-capture port:
> `NETSIL_TRAFFIC_PORT=<port number>`

* System-stats capture port:
> `NETSIL_INFRA_PORT=<port number>`

* Stream-processor load-balancer host (typically your Netsil ip):
> `NETSIL_SP_LOAD_BALANCER_HOST=<address>`

* Stream-processor load-balancer port:
> `NETSIL_SP_LOAD_BALANCER_PORT=<port number>`

* StatsD port. This port defaults to 8125. You may have to change this port if you have a statsd daemon running on the same machine as the collectors.
> `STATSD_PORT=<port number>`


### SSL Traffic Capture Configuration

Nestil AOC Collectors have the capability to intercept and observe SSL traffic by using a trusted man-in-the-middle proxy. The proxy uses instance's firewall rules (for instance, `iptables`) to intercept the SSL traffic. This feature is disabled by default.

> *Note: Currently, the collectors capture SSL traffic only on instances that initiate SSL connections.*


#### Enabling SSL Capture

Users of the containerized collectors may skip to step 3, since `sslsplit` is already installed inside the collector container.

However, if you intend to use sslsplit through the collector container, remember to expose port 10443 to the host in the container runtime parameters.

1. If you are running the collectors on a linux machine, use the following command to install sslsplit: 

        wget --no-check-certificate -q -O \
            netsil-sslsplit.${pkg_type} \
            https://${your.netsil.ip}/netsil-sslsplit-64bit-${versionNumber}.${pkg_type}

    The ${pkg_type} is `deb` or `rpm`, depending on your system, and ${your.netsil.ip} is the ip of your Netsil AOC.

2. Install `sslsplit` with the command:

        # Debian-based systems
        dpkg -i --force-overwrite netsil-sslsplit.deb

        # RHEL-based systems
        rpm -i -U --replacefiles --replacepkgs netsil-sslsplit.rpm

    Then, start `sslsplit` with the command:

        /etc/init.d/netsil-sslsplit start

    You may stop it with the command:

        /etc/init.d/netsil-sslsplit stop

3. SSL capture for the collectors is enabled by setting the `ENABLE_SSLCAPTURE=yes` in the environment of the collectors.
   We enable this by default, since it is harmless to open the SSL capture channel.
   If it is not enabled, follow the directions above for reconfiguring the collectors.

4. Copy sslsplit's self-signed certificate to the certificates directory:

    For Linux collectors:

        # deb
        sudo cp /opt/netsil/sslsplit/certs/netsil-ca.crt /usr/local/share/ca-certificates/

        # rhel
        sudo cp /opt/netsil/sslsplit/certs/netsil-ca.crt /etc/pki/tls/certs/

    For Docker Container collectors:

        docker cp netsil_collectors:/opt/netsil/sslsplit/certs/netsil-ca.crt \
                /usr/local/share/ca-certificates/

5. Set the proper permissions on the self-signed certficate:

        # deb
        sudo chmod 644 /usr/local/share/ca-certificates/netsil-ca.crt

        # rhel
        sudo chmod 644 /etc/pki/tls/certs/netsil-ca.crt

6. Update the CA store:

        # deb
        sudo update-ca-certificates

        # rhel
        sudo update-ca-trust

7. Run the following script to get instructions to add `iptables` rules for intercepting SSL traffic towards a destination port:

    For Linux collectors:

        $ /opt/netsil/sslsplit/bin/captureport-rule.sh --port <destination_port>

    For Docker Container collectors:

        $ docker exec netsil_collectors /opt/netsil/sslsplit/bin/captureport-rule.sh --port <destination_port>

    Example output:

        Use the following command to add iptables rules for destination port 443
        ===> iptables -t nat -A OUTPUT -p tcp -m owner ! --uid-owner nobody -m tcp --dport 443 -j REDIRECT --to-ports 10443

#### Disabling SSL Capture

1. Run the following script to get instructions to delete `iptables` rules:

    For Linux collectors:

        $ /opt/netsil/sslsplit/bin/releaseport-rule.sh --port <destination_port>

    For Docker Container collectors:

        $ docker exec netsil_collectors /opt/netsil/sslsplit/bin/releaseport-rule.sh --port <destination_port>

    Example output:

        Use the following command to remove iptables rules for destination port 443
        ===> iptables -t nat -D OUTPUT -p tcp -m owner ! --uid-owner nobody -m tcp --dport 443 -j REDIRECT --to-ports 10443

2. Stop sslsplit with

        sudo /etc/init.d/netsil-sslsplit stop

3. Restart the collectors

    For Linux: Use `init` scripts to stop/start collectors.

    For Docker Containers: Stop the collector container and restart without passing the `ENABLE_SSLCAPTURE` parameter.

4. Remove collector's self-signed certificate from the certificates directory:

        # deb
        sudo rm /usr/local/share/ca-certificates/netsil-ca.crt

        # rhel
        sudo rm /etc/pki/tls/certs/netsil-ca.crt

5. Update the CA store:

        # deb
        sudo update-ca-certificates

        # rhel
        sudo update-ca-trust

## Considerations for installation on bandwidth intensive instances

Netsil uses UDP to send traffic from collectors to AOC. In case of a network device congestion, the OS kernel drops UDP traffic in favor of critical application traffic. This limits the overall impact of running the collectors on network heavy instances. Here are a few points to consider regarding network bandwidth consumption on network intensive instances. By tweaking settings such as sampling rate and compression, one can strike a balance between fidelity, network overheads and local CPU overheads:

1. Enable [Sampling](#remote-packet-capture-configuration): We recommend that you enable collector sampling on network heavy instances. Even with sampling enabled, you will get a pretty good idea about Error Rates, Latency and Throughput trends. Sampling parameter is provided on a scale of 1-128 e.g. sampling rate of 64 would sample 50% of the flows. By default, the sampling is turned off. This parameter can be provided via an environment variable at installation.

2. Enable [Compression](#remote-packet-capture-configuration): The collectors can enable streaming compression (LZ4) on outbound traffic towards AOC. By default, compression is turned off. Compression helps reduce the outbound network bandwidth, though at the cost of local CPU overhead.

## Uninstalling Collectors

#### Linux <i class="fa fa-linux"></i>

```bash
# deb systems
sudo apt-get purge netsil-collectors

# rpm systems
sudo yum remove netsil-collectors
```

#### Docker Container

```bash
docker stop netsil_collectors
docker rm netsil_collectors
```

#### Mesosphere DC/OS

```bash
dcos marathon app stop netsil-collectors
dcos marathon app remove netsil-collectors
```

## Uninstalling SSLSplit
#### Linux <i class="fa fa-linux"></i>

```bash
# deb systems
sudo apt-get purge netsil-sslsplit

# rpm systems
sudo yum remove netsil-sslsplit
```

> ***Caution:*** When uninstalling **Netsil AOC** Collectors, if [SSL Capture](#enabling-ssl-capture) was enabled, please follow the instrutions to [disable SSL capture](#disabling-ssl-capture) first.
