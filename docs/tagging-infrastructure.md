### Overview

Netsil AOC uses infrastructure tags to arbitrarily group VM instances and containers. Using tags you can customize topology maps (to show services, applications, regions and so on), slice-and-dice metrics and events using analytics queries. Well thought-out tagging regimen can vastly speed up incidence response and help define meaningful alerts.

### Assign Infrastructure Tags on collectors

You can either assign infrastructure tags on a collector by providing environment options during collector [installation](collectors.md#infrastructure-tags) or configure tags post installation by editing this file: `/etc/netsil-collectors/tags.yml`

Example:
```
--- # define instance tags here
- tag
- tag_key:tag_value
```

After making changes to the infrastructure tags configuration file, make sure to restart the `metadata-collector` service:

For linux collectors:
```bash
/opt/netsil/collectors/bin/supervisorctl -c /etc/netsil-collectors/netsil-collectors.conf restart netsil-collectors:metadata-collector
```
For containerized collectors:
```bash
/opt/netsil/collectors/bin/supervisorctl -c /etc/netsil-collectors/netsil-collectors-standalone.conf restart netsil-collectors:metadata-collector
```

### AWS EC2 Instance Tags Collection

The collectors can automatically collect the AWS EC2 instance tags of the instances they are running on.

To enable AWS EC2 instance tags capture, first create an IAM role for your instance using the documentation [here](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html).

For the policy section, specify the permissions:

`ec2:Describe*`, `ec2:Get*`


### Containerized Environments

Netsil AOC automatically collects tags from these environments:

* Docker
* Kubernetes
* AWS ECS
