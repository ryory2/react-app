#!/bin/bash

# スクリプトをエラーがあれば停止する設定
set -e

# ログファイルのパスを設定
LOG_FILE="docker_execution_log_in_linux.local.log"

# ログファイルが存在する場合は削除
if [ -f "$LOG_FILE" ]; then
    rm "$LOG_FILE"
fi

# 実行開始時刻をログに記録
echo "----------------------------------------------------------------------------------------------------" >> "$LOG_FILE"
echo "Execution started at $(date)" >> "$LOG_FILE"

# Docker開始
echo "-------------------------docker command start-------------------------" >> "$LOG_FILE"

# ドッカーバージョンを確認
# echo "■Running docker -v..." | tee -a "$LOG_FILE"
# docker -v >> "$LOG_FILE" 2>&1

# Docker-compose状態を確認
echo "■Running docker compose config..." | tee -a "$LOG_FILE"
docker compose --env-file .env.local config >> "$LOG_FILE" 2>&1

# Docker Composeを停止
# echo "■Running docker compose down..." | tee -a "$LOG_FILE"
# docker compose down >> "$LOG_FILE" 2>&1

# ビルド
echo "■Running docker build..." | tee -a "$LOG_FILE"
# docker build --progress plain  --no-cache -t test-get-variable:latest . >> "$LOG_FILE" 2>&1
docker compose --env-file .env.local build --no-cache >> "$LOG_FILE" 2>&1

# 起動
echo "■Running docker compose up..." | tee -a "$LOG_FILE"
docker compose --env-file .env.local up -d >> "$LOG_FILE" 2>&1

# Docker完了
echo "-------------------------docker command end-------------------------" >> "$LOG_FILE"

# 実行完了時刻をログに記録
echo "Execution finished at $(date)" >> "$LOG_FILE"
echo "----------------------------------------------------------------------------------------------------" >> "$LOG_FILE"
