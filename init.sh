git submodule update --init --recursive
cd test
sed -i '9c const SourceCodeFile = "../src/index.js"' testflow.js
cp ../testDialogs.txt dialogs/
