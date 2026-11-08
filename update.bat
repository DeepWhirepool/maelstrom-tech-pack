@echo off
rem Prism pre-launch: pull pack from GitHub, then packwiz installs mods into the instance.
git -C C:\MaelstromPack pull --ff-only -q
cd /d "%INST_MC_DIR%"
"%INST_JAVA%" -jar packwiz-installer-bootstrap.jar file:///C:/MaelstromPack/pack.toml
