@echo off
echo Starting webserver
git checkout master
call "cmd /c start npm run dev"
echo Press Enter when the server has started
pause
echo.
echo Starting replay of commits, press enter to go to the next commit
echo.
FOR /L %%A IN (17,-1,0) DO (
  ECHO Check out step %%A
  git reset --hard HEAD
  git checkout vuexel~%%A
  pause
)

git checkout master