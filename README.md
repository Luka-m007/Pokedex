# Pokedex - Praca Zaliczeniowa Moduł 2

## Wymagania

- Node.js
- npm

## Instalacja oraz uruchomienie

```bash
git clone https://github.com/Luka-m007/Pokedex
cd Pokedex
git checkout pokedex-project-lukasz-marczuk
npm install
npm start
```
Uruchamiamy równologle dwie rzeczy:
- serwer Vite
- json-server

### Należy wykonać rejestrację użytkownika !

## Funkcjonalności

### Logowanie i rejestracja

- Rejestracja nowego użytkownika (imię, email, hasło + potwierdzeni hasła) z walidacją `zod`
- Logowanie na podstawie email i hasła zapisanych w `db.json`
- Stan logowania trzymany w kontekście i utrwalany w `localStorage`
- Linki do kart ulubione, arena, ranking, edycja dostępne tylko dla zalogowanych

### Strona główna (Home)

- Lista pierwszych 150 pokemonów pobieranych z PokeAPI, wyszukiwarka oraz paginacja wyświetlająca 10 pokemonów na stronie
- Każda karta pokemona przekierowuje do widoku szczegółów

### Ulubione

- Lista pokemonów oznaczonych jako ulubione przez zalogowanego uzytkownika

### Arena

- Możliwość dodania 2 pokemonów do slotów areny i stoczenie walki
- Wynik walki liczony jest na podstawie `base_experiance * weight`, wygrany pokemon otrzymuje 10pkt `base_experiance` oraz licznik wygranych +1, przegrany pokemon licznik przegranych +1

### Ranking

- Tabela wszystkich pokemonów z możliwością sortowania: `base_experiance`, `weight`, `height`, `win`

### Edycja

- Tworzenie nowego pokemona: przeglądanie grafik pokemonów od id 150+ za pomocą karuzeli (karuzela pobiera po 10 pokemonów z PokeApi), dane do wpisania przez użytkownika (nazwa, wzrost, waga, doświadczenie). Grafiki po wykorzystaniu są niedostępne do ponownego wykorzystania
- Edycja pokemona: korzysta z tego samego formularza co tworzenie, bez karuzeli i pola nazwa, pozwala zmienic atrybuty (wzrost, waga, doświadczenie)
- Po utworzeniu lub edycji pokemon dostepny jest automatycznie we wszystkich sekcjach

### Motyw jasny/ciemny

- Przełącznik w nagłówku, stan trzmany w kontekscie i utrwalany miedzy sesjami

### Mobile/desktop

- Aplikacja jest responsywna w zakresie 320px - 1920px. Breakpointy 768 mobile, 769-1014 tablet

## Architektura

### Stylowanie
- `styled-components` w całym projekcie
- Motyw jasny/ciemny zdefiniowany w `theme.js`
- Propsy sterujące stylem maja prefiks `$`
- Jednostki `rem` użyte domyślnie, `1rem = 10px`, `px` uzyte tylko dla obramowań i cieni

### Dane i stan
- `FetchDataContext` jedno żródło prawdy dla wszystkich danych o pokemonach w całej aplikacji. Łączy dane z PokeAPI z lokalnymi danymi z `customPokemons`, łącznikiem jest `fetchAndMergeLocal`
- Zmiany dodania do ulubionych, areny, statystyk po walce aktualizowane są od razu w lokalnym stanie kontekstu i równolegle zapisywane do serwera przez `updateCustomPokemonField`. PATCH jeśli rekord istnieje, POST jeśli nie
- `useActionAsync` uniwersalny hook opakowujący dowolną funkcję asynchroniczną, dający `isLoading`,`error`,`success`,`data`. Używany w hookach akcji oraz formularzach
- Formularze `react-hook-form` + `zod` jako standard walidacji we wszystkich formularzach

### Routing 
- `react-router-dom` wszystkie ścieżki zdefiniwoane w jednym miejscu `routes.js`

