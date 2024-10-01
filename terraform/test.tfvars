# terraform.tfvars
# 変数を外出しする変数一覧
# 「tfvars」は「terraform.tfvars」を自動で読み込む。別名を利用する場合、「-var-fileオプション」を利用する。
# terraform apply -var-file="staging.tfvars"

aws_region = "ap-northeast-1"

# 共通タグ
common_tags = {
  Environment = "terraform-test"
  Owner       = "ore"
}

# 各リソースの名前
vpc_name                         = "terraform-test-vpc"
internet_gateway_name            = "terraform-test-igw"
public_subnet_name_1             = "terraform-test-public-subnet-1"
public_subnet_name_2             = "terraform-test-public-subnet-2"
availability_zone_1              = "ap-northeast-1a"
availability_zone_2              = "ap-northeast-1c"
route_table_name_1               = "terraform-test-public-rt-1"
route_table_name_2               = "terraform-test-public-rt-2"
security_group_name              = "terraform-test-alb-sg"
alb_name                         = "terraform-test-ecs-nginx-alb"
target_group_name                = "terraform-test-ecs-nginx-tg"
listener_name                    = "terraform-test-listener"
iam_role_name_ecs_role           = "terraformEcsTaskRole"
iam_role_name_ecs_execution_role = "terraformEcsTaskExecutionRole"
ecs_task_definition_family       = "terraform-test-nginx-task"
ecs_cluster_name                 = "terraform-test-ecs-cluster"
ecs_service_name                 = "terraform-test-nginx-service"

# リソースグループの設定
resource_group_name = "terraform-test-resource-group"

resource_group_tags = {
  Environment = "terraform-test"
}
