# 「tfvars」は「terraform.tfvars」を自動で読み込む。別名を利用する場合、「-var-fileオプション」を利用する。
# terraform apply -var-file="staging.tfvars"

###########################################################
# Terraform Variables File
# このファイルはTerraformプロジェクト内で使用する変数を定義します。
###########################################################

###########################################################
# 一般設定
###########################################################

# AWSリージョンの設定
aws_region = "ap-northeast-1" # 使用するAWSリージョンを東京リージョンに設定

###########################################################
# 共通タグ設定
###########################################################

common_tags = {               # 全てのリソースに共通して付与するタグの定義
  Environment = "Production"  # 環境を示すタグ（例: テスト環境）
  Owner       = "DevOps Team" # リソースの所有者を示すタグ
}

###########################################################
# リソース名設定
###########################################################

vpc_name                         = "prod-vpc-vpc"                   # VPCの名前を設定
internet_gateway_name            = "prod-igw"                       # インターネットゲートウェイの名前を設定
public_subnet_name_1             = "prod-public-subnet-1"           # 1つ目のパブリックサブネットの名前を設定
public_subnet_name_2             = "prod-public-subnet-2"           # 2つ目のパブリックサブネットの名前を設定
availability_zone_1              = "ap-northeast-1a"                # 使用する1つ目のアベイラビリティゾーンを設定
availability_zone_2              = "ap-northeast-1c"                # 使用する2つ目のアベイラビリティゾーンを設定
route_table_name_1               = "prod-public-rt-1"               # 1つ目のルートテーブルの名前を設定
route_table_name_2               = "prod-public-rt-2"               # 2つ目のルートテーブルの名前を設定
security_group_name_alb          = "terraform-test-alb-sg"          # セキュリティグループ（alb）の名前を設定
security_group_name_backend      = "terraform-test-backend-sg"      # セキュリティグループ（backend）の名前を設定
security_group_name_frontend     = "terraform-test-frontend-sg"     # セキュリティグループ（frontend）の名前を設定
alb_name                         = "terraformEcsTaskRole"           # ALBの名前を設定
target_group_name_frontend       = "terraform-test-ecs-frontend-tg" # ターゲットグループの名前を設定
target_group_name_backend        = "terraform-test-ecs-backend-tg"  # ターゲットグループの名前を設定
listener_name                    = "prod-nginx-task"                # ALBリスナーの名前を設定
iam_role_name_ecs_role           = "prod-alb-sg"                    # ECSタスク用IAMロールの名前を設定
iam_role_name_ecs_execution_role = "prod-ecs-nginx-alb"             # ECSタスク実行用IAMロールの名前を設定
ecs_task_definition_family       = "prod-ecs-nginx-tg"              # ECSタスク定義のファミリー名を設定
ecs_cluster_name                 = "prod-listener"                  # ECSクラスターの名前を設定
ecs_service_name                 = "prod-nginx-service"             # ECSサービスの名前を設定
domain_name                      = "impierrot.click"                # ホストゾーンの名前
acm_certificate_arn              = "arn:aws:acm:ap-northeast-1:990606419933:certificate/25144a76-2e9b-4b86-a32f-ebcbb330d81f"
route53_zone_id                  = "Z06442292XEXGMHMQLXK9" # 実際のホストゾーンIDに置き換えてください

###########################################################
# リソースグループ設定
###########################################################

resource_group_name = "prod-resource-group" # リソースグループの名前を設定

resource_group_tags = {      # リソースグループに含めるタグの条件を設定
  Environment = "Production" # 環境がterraform-testのリソースを含める
}

###########################################################
# コンテナ定義設定
###########################################################

container_definitions = [
  {
    name      = "nginx"        # コンテナの名前を設定
    image     = "nginx:latest" # コンテナイメージを設定
    essential = true           # このコンテナが必須かどうかを設定
    portMappings = [           # コンテナのポートマッピングを設定
      {
        containerPort = 80    # コンテナ内でリッスンするポート
        hostPort      = 80    # ホスト側のポート
        protocol      = "tcp" # プロトコルをTCPに設定
      }
    ]
    environment = [ # 環境変数を設定
      {
        name  = "ENV_VAR_1" # 環境変数の名前
        value = "value1"    # 環境変数の値
      },
      {
        name  = "ENV_VAR_2" # 別の環境変数の名前
        value = "value2"    # 別の環境変数の値
      }
    ]
    logConfiguration = {                           # ログ設定を定義
      logDriver = "awslogs"                        # ログドライバーをawslogsに設定
      options = {                                  # ログドライバーのオプションを設定
        "awslogs-group"         = "/ecs/nginx"     # CloudWatch Logsグループ名
        "awslogs-region"        = "ap-northeast-1" # AWSリージョン
        "awslogs-stream-prefix" = "ecs"            # ログストリームプレフィックス
      }
    }
  }
  # ,
  # {
  #   name             = "sidecar" # 2つ目のコンテナの名前を設定
  #   image            = "busybox" # コンテナイメージを設定
  #   essential        = false     # このコンテナが必須かどうかを設定
  #   portMappings     = []        # ポートマッピングを設定（必要に応じて）
  #   environment      = []        # 環境変数を設定（必要に応じて）
  #   logConfiguration = {}        # ログ設定を定義（必要に応じて）
  # }
]

###########################################################
# ロードバランサー設定
###########################################################

lb_container_name_frontend = "frontend-container" # ロードバランサーで使用するコンテナの名前（container_definitions.nameと同じにすること）
lb_container_port_frontend = 80                   # ロードバランサーで使用するコンテナのポート
lb_container_name_backend  = "backend-container"  # ロードバランサーで使用するコンテナの名前（container_definitions.nameと同じにすること）
lb_container_port_backend  = 8080                 # ロードバランサーで使用するコンテナのポート
