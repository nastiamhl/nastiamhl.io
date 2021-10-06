# nastiamhl.github.io
## Opis
Statyczny szablon strony internetowej, który składa się z trzech części:
1. Formy rejestracji oraz logowania.
2. Sekcja wiadomości.
3. Sekcja technologii.

## Technologie i pakiety
Projekt został zrealizowany za pomocą następujących technologii i pakietów, załadowanych na podstawie npm. Wszystkie zależnośći dotyczą wersji dev, wersja produkcyjna projektu korzysta tylko z transpilowanego kodu.
```
    "@babel/core": "^7.15.5",
    "@babel/plugin-transform-runtime": "^7.15.0",
    "@babel/preset-env": "^7.15.6",
    "@popperjs/core": "^2.10.2",
    "babel-loader": "^8.2.2",
    "bootstrap": "^5.1.1",
    "css-loader": "^6.3.0",
    "html-loader": "^2.1.2",
    "html-webpack-plugin": "^5.3.2",
    "imagemin-cli": "^7.0.0",
    "mini-css-extract-plugin": "^2.3.0",
    "node-sass": "^6.0.1",
    "sass-loader": "^12.1.0",
    "webpack": "^5.56.0",
    "webpack-cli": "^4.8.0",
    "webpack-dev-server": "^4.3.0"
```

## Polecenia NPM
Za pomocą [npm](https://www.npmjs.com/) zostały wprowadzone nastepujące działania:

* instalacja pakietów
```
npm install
```
* uruchomienie projektu lokalnie z plików źródłowych
```
npm run dev
```
* kompilowanie transpilowanego kodu do foldera, z którego korzysta Github Pages (folder [docs](https://github.com/nastiamhl/nastiamhl.github.io/tree/main/docs))
```
npm run build
```

## Formy

### Validacja
Pola posiadają podstawową walidację (czy zostały uzupełnione), oraz wbudowaną walidacje typu wartości pola, np. email. Pole hasła również ma opcje przełączenia pomiędzy przedstawieniem tekstowym a ukrytym.

## Wiadomości

### Ładowanie
Załadowanie danych jest zrealizowane za pomocą fetch API po uruchomieniu strony.

### Wyświetlenie
Wyświetlenie i generowanie pojedynczych elementów wiadomości jest realizowane dynamicznie na dwa sposoby:
1. Po załadowaniu strony i danych zostaje wyświetlona wstępna ilość elementów (domyśłnie 5).
2. Po żądaniu wyświetlenia większej ilości elementów do kontenera zostają dodane kolejne wiadomości (domyślnie 2).
3. W przypadku 1 i 2, gdy ilość żądanych wiadomości do wyświetlenia jest większa od ilości elementów pozostałych do wyświetlenia, wyświetlają się wszystkie pozostałe elementy.

## Technologie
Sekcja zawiera informacje o czterech technologiach lub językach, które prowadzą na odpowiednie strony oficjalne.