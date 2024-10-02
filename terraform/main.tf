###########################################################
# Terraform Main Configuration
# このファイルはTerraformプロジェクトの主要なリソースを定義します。
###########################################################

# 変数の利用: 各リソースブロック内でvar.<変数名>を使用して、変数を参照
# 「resource "aws_vpc" "リソース名" {]」リソース名: Terraform内でそのリソースを参照するためのローカル名
###########################################################
# プロバイダー設定
###########################################################

provider "aws" {
  region = var.aws_region
}

###########################################################
# ネットワークリソース設定
###########################################################

# VPCの作成
resource "aws_vpc" "vpc" {
  cidr_block           = "10.0.0.0/16" # VPCのIPアドレス範囲を指定
  enable_dns_support   = true          # DNSサポートを有効化
  enable_dns_hostnames = true          # DNSホスト名を有効化

  tags = merge(var.common_tags, {
    Name = var.vpc_name
  })
}

# インターネットゲートウェイの作成
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id # 作成したVPCに関連付け

  tags = merge(var.common_tags, {
    Name = var.internet_gateway_name
  })
}

# パブリックサブネットの作成（1つ目）
resource "aws_subnet" "subnet_1" {
  vpc_id            = aws_vpc.vpc.id          # 作成したVPCに関連付け
  cidr_block        = "10.0.1.0/24"           # サブネットのIPアドレス範囲
  availability_zone = var.availability_zone_1 # アベイラビリティゾーンを指定

  tags = merge(var.common_tags, {
    Name = var.public_subnet_name_1
  })
}

# パブリックサブネットの作成（2つ目）
resource "aws_subnet" "subnet_2" {
  vpc_id            = aws_vpc.vpc.id          # 作成したVPCに関連付け
  cidr_block        = "10.0.2.0/24"           # サブネットのIPアドレス範囲（適宜調整）
  availability_zone = var.availability_zone_2 # 2つ目のアベイラビリティゾーンを指定

  tags = merge(var.common_tags, {
    Name = var.public_subnet_name_2
  })
}

# ルートテーブルの作成（1つ目）
resource "aws_route_table" "public_rt_1" {
  vpc_id = aws_vpc.vpc.id # 作成したVPCに関連付け

  # 0.0.0.0/0（全てのIPv4アドレス）へのルートをインターネットゲートウェイに設定
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = merge(var.common_tags, {
    Name = var.route_table_name_1
  })
}

# ルートテーブルの作成（2つ目）
resource "aws_route_table" "public_rt_2" {
  vpc_id = aws_vpc.vpc.id # 作成したVPCに関連付け

  # 0.0.0.0/0（全てのIPv4アドレス）へのルートをインターネットゲートウェイに設定
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = merge(var.common_tags, {
    Name = var.route_table_name_2
  })
}

# サブネットとルートテーブルの関連付け（1つ目）
resource "aws_route_table_association" "public_association_1" {
  subnet_id      = aws_subnet.subnet_1.id         # 作成したパブリックサブネットに関連付け
  route_table_id = aws_route_table.public_rt_1.id # 作成したルートテーブルに関連付け
}

# サブネットとルートテーブルの関連付け（2つ目）
resource "aws_route_table_association" "public_association_2" {
  subnet_id      = aws_subnet.subnet_2.id         # 作成した2つ目のパブリックサブネットに関連付け
  route_table_id = aws_route_table.public_rt_2.id # 作成した2つ目のルートテーブルに関連付け
}

###########################################################
# ECSクラスター設定
###########################################################

# ECSクラスターの作成
resource "aws_ecs_cluster" "ecs_cluster" {
  name = var.ecs_cluster_name # クラスターの名前

  tags = merge(var.common_tags, {
    Name = var.ecs_cluster_name
  })
}

###########################################################
# IAMロール設定
###########################################################

# IAMロールの作成（タスクロール）
resource "aws_iam_role" "ecs_task_role" {
  name = var.iam_role_name_ecs_role # ロールの名前

  # ロールの信頼ポリシーを設定
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com" # ECSタスクサービスがこのロールを引き受けることを許可
      }
    }]
  })

  # 管理ポリシーをアタッチ（タスク実行に必要な権限）
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  ]

  tags = merge(var.common_tags, {
    Name = var.iam_role_name_ecs_role
  })
}

# IAMロールの作成（タスク実行ロール）
resource "aws_iam_role" "ecs_task_execution_role" {
  name = var.iam_role_name_ecs_execution_role # ロールの名前

  # ロールの信頼ポリシーを設定
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com" # ECSタスクサービスがこのロールを引き受けることを許可
      }
    }]
  })

  # 管理ポリシーをアタッチ（タスク実行に必要な権限）
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  ]

  tags = merge(var.common_tags, {
    Name = var.iam_role_name_ecs_execution_role
  })
}

###########################################################
# セキュリティグループ設定
###########################################################

# セキュリティグループの作成（ALB用）
resource "aws_security_group" "alb_sg" {
  name        = var.security_group_name      # セキュリティグループの名前
  description = "Allow HTTP inbound traffic" # 説明
  vpc_id      = aws_vpc.vpc.id               # 作成したVPCに関連付け

  # インバウンドルールの設定
  ingress {
    description = "HTTP from anywhere" # ルールの説明
    from_port   = 80                   # 許可するポート範囲の開始
    to_port     = 80                   # 許可するポート範囲の終了
    protocol    = "tcp"                # プロトコルをTCPに設定
    cidr_blocks = ["0.0.0.0/0"]        # 全世界からのアクセスを許可
  }

  # アウトバウンドルールの設定
  egress {
    from_port   = 0             # 許可するポート範囲の開始
    to_port     = 0             # 許可するポート範囲の終了
    protocol    = "-1"          # 全てのプロトコルを許可
    cidr_blocks = ["0.0.0.0/0"] # 全世界へのアクセスを許可
  }

  tags = merge(var.common_tags, {
    Name = var.security_group_name
  })
}

###########################################################
# ALB設定
###########################################################

# Application Load Balancer（ALB）の作成
resource "aws_lb" "alb" {
  name               = var.alb_name                   # ALBの名前
  internal           = false                          # インターネット向けALBを指定
  load_balancer_type = "application"                  # ALBのタイプを指定
  security_groups    = [aws_security_group.alb_sg.id] # ALBに関連付けるセキュリティグループ
  subnets = [
    aws_subnet.subnet_1.id, # 1つ目のサブネット
    aws_subnet.subnet_2.id  # 2つ目のサブネット
  ]
  enable_deletion_protection = false # 削除保護を無効化

  tags = merge(var.common_tags, {
    Name = var.alb_name
  })
}

# ターゲットグループの作成
resource "aws_lb_target_group" "tg" {
  # awsvpc ネットワークモードでは、ターゲットグループの target_type を ip に設定する必要がある（タスク定義で指定されているネットワークモードが awsvpc）
  name        = var.target_group_name # ターゲットグループの名前
  port        = 80                    # ターゲットグループがリッスンするポート
  protocol    = "HTTP"                # プロトコルをHTTPに設定
  vpc_id      = aws_vpc.vpc.id        # 作成したVPCに関連付け
  target_type = "ip"                  # ターゲットタイプをIPに設定

  # ヘルスチェックの設定
  health_check {
    path                = "/"       # ヘルスチェックに使用するパス
    interval            = 30        # ヘルスチェックの間隔（秒）
    timeout             = 5         # ヘルスチェックのタイムアウト（秒）
    healthy_threshold   = 2         # ヘルシーと見なす連続成功回数
    unhealthy_threshold = 2         # アンヘルシーと見なす連続失敗回数
    matcher             = "200-299" # 正常と見なすHTTPステータスコードの範囲
  }

  tags = merge(var.common_tags, {
    Name = var.target_group_name
  })
}

###########################################################
# ALBリスナー設定
###########################################################

# ALBリスナーの作成
resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.alb.arn # 作成したALBのARNを指定
  port              = "80"           # リスナーがリッスンするポート
  protocol          = "HTTP"         # プロトコルをHTTPに設定

  # デフォルトアクションとしてターゲットグループにフォワード
  default_action {
    type             = "forward"                  # アクションタイプをフォワードに設定
    target_group_arn = aws_lb_target_group.tg.arn # フォワード先のターゲットグループARNを指定
  }

  tags = merge(var.common_tags, {
    Name = var.listener_name
  })
}

###########################################################
# ECSタスク定義設定
###########################################################

# タスク定義の作成
resource "aws_ecs_task_definition" "nginx_task" {
  family                   = var.ecs_task_definition_family           # タスク定義のファミリー名
  network_mode             = "awsvpc"                                 # ネットワークモードをawsvpcに設定（Fargate必須）
  requires_compatibilities = ["FARGATE"]                              # Fargate互換性を指定
  cpu                      = "256"                                    # タスクに割り当てるCPUユニット
  memory                   = "512"                                    # タスクに割り当てるメモリ（MiB）
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn # タスク実行ロールのARN

  # コンテナ定義を変数から取得
  container_definitions = jsonencode(var.container_definitions)

  tags = merge(var.common_tags, {
    Name = var.ecs_task_definition_family
  })
}

###########################################################
# ECSサービス設定
###########################################################

# ECSサービスの作成
resource "aws_ecs_service" "nginx_service" {
  name            = var.ecs_service_name                   # サービスの名前
  cluster         = aws_ecs_cluster.ecs_cluster.id         # 作成したECSクラスターに関連付け
  task_definition = aws_ecs_task_definition.nginx_task.arn # 使用するタスク定義のARNを指定
  desired_count   = 1                                      # 起動するタスクの数
  launch_type     = "FARGATE"                              # Fargateランチタイプを指定

  # ネットワーク設定
  network_configuration {
    subnets          = [aws_subnet.subnet_1.id, aws_subnet.subnet_2.id] # サービスを配置するサブネット
    security_groups  = [aws_security_group.alb_sg.id]                   # セキュリティグループを指定
    assign_public_ip = true                                             # パブリックIPを割り当て
  }

  # ロードバランサー設定
  load_balancer {
    target_group_arn = aws_lb_target_group.tg.arn # 使用するターゲットグループのARNを指定
    container_name   = var.lb_container_name      # タスク内のコンテナ名を指定
    container_port   = var.lb_container_port      # コンテナがリッスンするポートを指定
  }

  tags = merge(var.common_tags, {
    Name = var.ecs_service_name
  })
}

###########################################################
# リソースグループ設定
###########################################################

# リソースグループの作成
resource "aws_resourcegroups_group" "resource_group" {
  name        = var.resource_group_name # リソースグループの名前
  description = "Resource group for Production environment"

  # リソースグループに含めるリソースのタグベースのルールを定義
  resource_query {
    query = jsonencode({
      ResourceTypeFilters = [
        # "AWS::Route53::HostedZone", # サポートされていないためコメントアウト
        # "AWS::IAM::Role",           # サポートされていないためコメントアウト
        "AWS::EC2::VPC",
        "AWS::EC2::InternetGateway",
        "AWS::EC2::Subnet",
        "AWS::EC2::RouteTable",
        "AWS::EC2::SecurityGroup",
        "AWS::ElasticLoadBalancingV2::LoadBalancer",
        "AWS::ElasticLoadBalancingV2::TargetGroup",
        "AWS::ElasticLoadBalancingV2::Listener",
        "AWS::ECS::TaskDefinition",
        "AWS::ECS::Cluster",
        "AWS::ECS::Service"
      ]
      TagFilters = [
        for key, value in var.resource_group_tags : {
          Key    = key
          Values = [value]
        }
      ]
    })
  }

  tags = merge(var.common_tags, {
    Name = var.resource_group_name
  })
}
