FOR /F "delims=" %%i in ('netstat -aon ^| findstr 0.0:3000') do set NODEPORT=%%i
echo off
@REM 出力の最後がPORTを表しているので、末尾まで読んでいる
for %%a in (%NODEPORT%) do (
set TEMPB=%%a
)
echo %TEMPB%
taskkill /pid %TEMPB% /F
