Projekt bez frameworków. Bez pakietów node. 
Wystarczy uruchomić np przez lite-server.
Plik główny main.tsx jest tłumaczony do ./scripts/main.js
Uwaga 
Typescript ma problem z Canvas bo nie widzi typu ale podanie typu rozwala plik JS. 
Jeżeli uruchomisz watcher na plik ts i przestanie działać plik to wystarczy usunać w pliku main.js chart_js_1. z lini 44