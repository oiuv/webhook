@echo off
echo --- Git-Bash ---
C:
chdir C:\Program Files\Git\bin
bash --login -i ~/webhook/sh/webhook.sh
::pause