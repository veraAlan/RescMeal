@ECHO OFF
ECHO Press Enter to initialize backend and frontend of the app.

PAUSE
CLS

cd "%~dp0Backend"
start cmd /t:8 /k "%~dp0Backend\gradlew bootRun"

cd "%~dp0Frontend"
start cmd /t:3 /k "npm run dev"