# variables.tf
# Terraformプロジェクト内で使用する変数を定義
# 変数の宣言: 各変数をvariableブロックを用いて宣言
# 変数の属性設定: description、type、defaultなどの属性を設定し、変数の用途やデフォルト値を設定

# プロバイダー用のリージョン変数
variable "aws_region" {
  description = "AWSのリージョン"
  type        = string
  default     = "ap-northeast-1" # 東京リージョンをデフォルト値として設定
}

# 共通のタグ用変数
variable "common_tags" {
  description = "リソースに付与する共通タグ"
  type        = map(string)
  default = {
    Name = "terraform-test" # 共通のNameタグ
  }
}

# 各リソースの名前を変数化
variable "vpc_name" {
  description = "VPCの名前タグ"
  type        = string
  default     = "terraform-vpc"
}

variable "internet_gateway_name" {
  description = "インターネットゲートウェイの名前タグ"
  type        = string
  default     = "terraform-igw"
}

variable "public_subnet_name_1" {
  description = "パブリックサブネットの1つ目の名前タグ"
  type        = string
  default     = "terraform-public-subnet-1"
}

# パブリックサブネットの2つ目
variable "public_subnet_name_2" {
  description = "パブリックサブネットの2つ目の名前タグ"
  type        = string
  default     = "terraform-public-subnet-2"
}

# 使用するアベイラビリティゾーンの1つ目
variable "availability_zone_1" {
  description = "1つ目のアベイラビリティゾーン"
  type        = string
  default     = "ap-northeast-1a"
}

# 使用するアベイラビリティゾーンの2つ目
variable "availability_zone_2" {
  description = "2つ目のアベイラビリティゾーン"
  type        = string
  default     = "ap-northeast-1c"
}

variable "route_table_name_1" {
  description = "ルートテーブルの名前タグ1"
  type        = string
  default     = "terraform-public-rt-1"
}

variable "route_table_name_2" {
  description = "ルートテーブルの名前タグ2"
  type        = string
  default     = "terraform-public-rt-2"
}

variable "alb_name" {
  description = "Application Load Balancerの名前"
  type        = string
  default     = "ecs-nginx-alb"
}

variable "listener_name" {
  description = "ALBリスナーの名前"
  type        = string
  default     = "listener"
}

variable "target_group_name" {
  description = "ターゲットグループの名前"
  type        = string
  default     = "ecs-nginx-tg"
}

variable "security_group_name" {
  description = "セキュリティグループの名前"
  type        = string
  default     = "alb-sg"
}

variable "iam_role_name_ecs_execution_role" {
  description = "IAMロール(タスクロール)の名前"
  type        = string
  default     = "ecsTaskExecutionRole"
}

variable "iam_role_name_ecs_role" {
  description = "IAMロール(タスク実行ロール)の名前"
  type        = string
  default     = "ecsTaskRole"
}

variable "ecs_task_definition_family" {
  description = "ECSタスク定義のファミリー名"
  type        = string
  default     = "nginx-task"
}

variable "ecs_cluster_name" {
  description = "ECSクラスターの名前"
  type        = string
  default     = "terraform-cluster"
}

variable "ecs_service_name" {
  description = "ECSサービスの名前"
  type        = string
  default     = "nginx-service"
}

# リソースグループ用の変数
variable "resource_group_name" {
  description = "リソースグループの名前"
  type        = string
  default     = "prod-resource-group"
}

variable "resource_group_tags" {
  description = "リソースグループに含めるタグの条件"
  type        = map(string)
  default = {
    Environment = "Production"
  }
}
