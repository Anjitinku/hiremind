@echo off
title HireMind Service Launcher
echo Starting HireMind Services...

start /b "" powershell -NoExit -WindowStyle Hidden -Command "cd 'd:\SDE-90 Bootcamp\PROJECTS\Hiremind\backend'; C:\maven\apache-maven-3.9.9\bin\mvn.cmd spring-boot:run"
start /b "" powershell -NoExit -WindowStyle Hidden -Command "cd 'd:\SDE-90 Bootcamp\PROJECTS\Hiremind\frontend'; npm run dev"

echo HireMind Backend and Frontend are running in the background!
exit
