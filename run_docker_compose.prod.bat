@echo off
REM バッチファイルが置かれているディレクトリを取得
set WSL_DIR=%~dp0

REM WindowsのパスをWSL用のパスに変換（バックスラッシュをスラッシュに置換）
set WSL_DIR=%WSL_DIR:C:=/mnt/c%
set WSL_DIR=%WSL_DIR:\=/%

REM WSLでDocker Composeを実行
wsl -e bash -c "cd '%WSL_DIR%' && docker-compose up --build -d"

pause