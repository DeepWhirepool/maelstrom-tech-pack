@echo off
rem Existing Prism pre-launch update: Git + packwiz, preserving personal settings.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0update.ps1"
exit /b %errorlevel%
