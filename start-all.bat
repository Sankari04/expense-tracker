@echo off
title Expense Tracker - All-in-One Launcher
echo ===================================================
echo   Launching Expense Tracker Full-Stack App
echo ===================================================
echo 1. Launching Spring Boot Backend (Port 8080)...
start "Expense Tracker - Backend" cmd /k "cd /d "%~dp0backend" && run-backend.bat"

echo 2. Launching React Frontend (Port 5173)...
start "Expense Tracker - Frontend" cmd /k "cd /d "%~dp0frontend" && run-frontend.bat"

echo ===================================================
echo Both Backend and Frontend processes have started!
echo Frontend will be accessible at: http://localhost:5173
echo Backend REST APIs accessible at: http://localhost:8080/api/transactions
echo ===================================================
