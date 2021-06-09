yarn build
cd build
echo 'www.kudopepe.ga' > CNAME
touch .nojekyll
git init
git add -A
git commit -m 'chore: deploy'
git push -f git@github.com:teclu/Kudo-Pepega.git master:gh-pages
cd ..