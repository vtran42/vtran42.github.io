# Terraform Deep Dive Course

## Course Content

---

- Import Existing Resources
- Managing state data
- Workspaces and collaboration
- Data sources and templates
- Adding a CI/CD pipeline
- Integrate with config managers

## Importing Existing Resources

---

>Command line
>>terraform plan -out filename.tfplan
Create plan and store in the filename.tfplan
>>terraform apply "filename.tfplan" to apply the plan

## Import command

- No automatic import
- Update configuration to include resources
- Identifiers from provider and configuration
- Adds new resources to the state.

``` ruby
# Command syntax
terraform import [options] ADDR ID
# ADDR - Configuration resource identifier
# Ex. module.vpc.aws_subnet.public[2]

# ID - provider specific resource identifier
# Ex. - subnet-ad536afg9

# Importing a subnet into a configuration
terraform import -var-file="terraform.tfvars" \ module.vpc.aws_subnet.public[2] subnet-ad536afg9
```

## Shell Tab-Completion

```ruby
# Shell Tab-Completion
terraform -install-autocomplete
# Uninstalled
terraform -unistall-autocomplete
```

## Initilizing Working Directories

---

> Directory must be initialized before TF can perform any operations.

- A TF configuration describing resources TF should manage and changing over time.
- A hidden .terraform directory
  - Manage cached provider plugins
  - Record which workspace is currently active
  - Record last known backend configuration in case it needs to migrage state on the next run.
  - Automanaged by TF, and is created during initialization.
- State data
- terraform init
  - Initialize a working directory.
  - Accessing state in the configured backend
  - Downloading and installing provider plugins, modules.

## Provisioning Infrastructure with Terraform

---

- Create, modify and destroy infrastructure resources.
- Work only on currently selected workspace.
- terraform plan
  - Configuration to determine the desired state of all the resources it declares.
  - Compare that designed state to the real infrastructure objects being managed with the current working directory and workspace.
  - Present a description of the changes necessary to achieve the desired state.
  - use to run validate configuration changes and confirm that the resulting actions are as expected.
- terraform apply
  - Perform the fresh plan right before applying changes
  - Display the plan to the user when asking for confirmation.
- terraform destroy
  - Destroy all of the resources being managed b the current working directory nad workspace.
- Writing and modifying terrafrom code
  - terraform fmt
    - Rewrite TF configuration files to a canonical format and style
  - terraform validate
    - Validates the syntax and argument of the TF configuration files in a directory.
  - TF upgrade <https://www.terraform.io/upgrade-guides/index.html>
    - Automatically modify the configuration files in TF module to help deal with major syntax changes that occurred.

## Inspecting Infrastructure

---

- terraform graph command create a visual representation of a configuration or a set of planned changes.

``` ruby
terraform graph | dot -Tsvg > graph.svg

```

- terraform output command can get values to the top-level output value of a configuration.
  - Helpful when making use of the infrastructure TF has provisioned.

``` ruby
output "instance_ips" {
  value = aws_instance.web.*.public_ip
}

output "lb_address" {
  value = aws_alb.web.public_dns
}
```

- terraform show generated human readble versions of a state file.
- terraform state list command
  - List the resources being managed by the current working directory and worksapce.
- terraform state show command
  - Print all of the attributes of a given resource being managed by the current working directory and worksapce, including generated read-only attributes like the unique ID assigned by the cloud provider.
- terraform import command <https://www.terraform.io/docs/cli/commands/import.html>

## Manipulating Terraform State

---

- <https://www.terraform.io/docs/cli/state/index.html>

