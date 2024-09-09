@echo off
REM バッチファイルが置かれているディレクトリを取得
set WSL_DIR=%~dp0

REM ログファイルのパスを指定
set LOG_FILE=%WSL_DIR%docker_execution_log_in_windows.prod.txt

REM ログファイルが存在する場合削除
if exist "%LOG_FILE%" del "%LOG_FILE%"

REM 実行開始時刻をログに記録
echo Execution started at %date% %time% >> "%LOG_FILE%"
echo -------------------------------------------------- >> "%LOG_FILE%"

REM 現在のディレクトリパスをログに出力
echo Batch file directory: %WSL_DIR% >> "%LOG_FILE%"

REM WindowsのパスをWSL用のパスに変換（バックスラッシュをスラッシュに置換）
set WSL_DIR=%WSL_DIR:C:=/mnt/c%
set WSL_DIR=%WSL_DIR:\=/%

REM 変換後のパスをログに出力
echo Converted WSL path: %WSL_DIR% >> "%LOG_FILE%"

REM WSL内でスクリプトを実行
wsl bash -c "cd '%WSL_DIR%' && bash run_docker_script_in_wsl.prod.sh"

REM 実行完了時刻をログに記録
echo Execution finished at %date% %time% >> "%LOG_FILE%"
echo -------------------------------------------------- >> "%LOG_FILE%"

REM 実行結果を表示
echo Docker control script executed in WSL

