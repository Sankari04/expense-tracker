@echo off
title Expense Tracker - Backend (Spring Boot)
echo ===================================================
echo Starting Expense Tracker Backend on Port 8080...
echo ===================================================
cd /d "%~dp0"
call "%~dp0apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
pause
