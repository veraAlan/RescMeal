@ECHO OFF
wt -M -p "Command Prompt" --title="Spring Boot" -d "%~dp0Backend" cmd /k ".\gradlew bootRun"; nt -p "Command Prompt" -d "%~dp0Frontend" cmd /k "npm run dev"