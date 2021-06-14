npm run build
cd dist
git init
git remote add origin https://github.com/pwa-features/pwa-features.github.io.git
git add -A
git commit -m "Build"
git push -f origin master
