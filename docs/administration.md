## SSH access to your Netsil AOC instance(s)

To access Netsil AOC instance(s) over `ssh`, you will need the private key of the keypair that you specified at launchtime. 

For users of the generic machine images (qcow2/vdi/vhd/vmdk), you may configure ssh access by creating a config-drive. Follow these instructions to do so:

```bash
wget https://raw.github.com/coreos/scripts/master/contrib/create-basic-configdrive
chmod +x create-basic-configdrive
./create-basic-configdrive -H netsil -S ~/.ssh/<your-key>.pub
```

This will create an ISO file named `netsil.iso`.  When you are creating your virtual machine for Netsil AOC, attach `netsil.iso` as an extra drive. After Netsil AOC boots up, you should be able to SSH into the instance with the command below.

Run the following command to ssh:
```bash
ssh -l core -i <your-key>.pem <instance-ip-address>
```

## Upgrading Netsil AOC

### **Single-container versions** ###

Since our single-container distributable of Netsil has a variety of installation methods (including docker-compose, DCOS, and Kubernetes), the upgrade process for this version will also vary.

Regardless of method, first obtain the updated installation [manifests](https://github.com/netsil/manifests). Instructions follow for each method:

#### docker-compose ####

* In the directory where you downloaded your current `docker-compose.yml` installation manifest for Netsil, run `docker-compose stop`. 

* Then, in the directory where you downloaded the updated `docker-compose.yml` manifest, run `docker-compose up -d`. Your Netsil instance is now updated.

#### DCOS ####

* From the Marathon UI, click on the Netsil app and *suspend* your current instance of Netsil.

* Next, go to the JSON edit mode of the Netsil app. You can arrive here by clicking on Configuration --> Edit --> Toggle "JSON".

* Copy the contents of the updated `netsil-dcos.json` installation manifest you downloaded into the edit box.

* "Scale" the application back to a single instance. Your Netsil instance is now updated.

* You may also execute the above steps entirely from the DCOS CLI, if desired.

#### Kubernetes ####

* First, stop your existing instance of Netsil AOC.

* Next, re-run the installation instructions [here](https://github.com/netsil/manifests/tree/instructions/kubernetes) with your new manifest.


### **Clustered version** ###

**Note:** Ensure you have at least 5 GB of free space on your Netsil instance before beginning the upgrade process.

To upgrade the clustered version of Netsil, look for the green "!" sign in the upper right-hand corner.

Click on it and follow the directions to begin the upgrade process. It should take between 10 - 15 minutes for the upgrade to complete.

If you are not redirected to a status page, you can go to `https://<your.netsil.io>/#/upgrading` to see the status of your upgrade.


## Upgrading your collectors

When Netsil AOC is upgraded, the collectors -- whether running on plain Linux or as a container -- are automatically upgraded.


## Horizontally Scaling Netsil AOC installation

If you are running the clustering ready version of Netsil AOC, then you can scale up your installation by adding another worker instance.

To do so, first launch another instance of **Netsil AOC** by following the instructions in [installation](installation) section. Please make sure to open the required ports on the newly launched instance.

Make sure you have SSH access to that instance, and then, as user `core`, run the command:

```bash
sudo /opt/netsil/latest/bin/setup-node.sh worker <netsil-aoc-master-ip>
```

`<netsil-aoc-master-ip>` is the IP address of your first **Netsil AOC** instance in the cluster.

Please let this script run to completion until the apps are done scaling.

Note: Refrain from exiting the script prematurely, or re-running the script on an already joined worker.

## Backup and Restoration

Netsil supports backup and restoration from S3-compatible storage endpoints.

The default storage setting is "local", which does not provide any sort of backup/restore facilities.

Valid AWS S3 endpoints for the "S3" storage type include urls such as *s3.amazonaws.com*, *s3-us-west-1.amazonaws.com*, etc. If you are using an s3-compatible endpoint, simply enter its domain name.

Retroactive restorations are not supported. When you perform a restoration, the AOC version you are restoring *to* must be greater than or equal to the AOC version you are restoring *from*.
