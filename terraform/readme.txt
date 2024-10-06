【使い方】
・このフォルダ内でcmd
・前提
　Amazon CLIが利用できること
・以下の手順で実行
　「terraform validate」バリデーションチェック
　「terraform plan -var-file="test.tfvars"」標準出力に内容が表示されるので実行内容をチェック
　「terraform apply -var-file="test.tfvars" -auto-approve」実行内容をAWSへ適用