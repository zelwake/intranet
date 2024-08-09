# Kuchařka

### Požadavky

- každý recept musí obsahovat:
  - název
  - ingredience
  - postup
  - skupiny/tagy
  - fotografie
  - cca doba přípravy (když to umíš, jinak přidat 50%)
  - možnost ho editovat nebo smazat
- stránka s receptem by měla mít dva módy
  - procházím
    - vybírám si podle názvu, skupiny, tagů, surovin?
  - vařím
    - z ingrediencí udělat odškrtávací seznam
    - postup možná ano, možná ne nebo nějak jinak možná zvýraznit aktuální krok
- stránka se seznamem receptů
  - vyhledávač podle názvu
  - případně zaškrtávací seznam skupiny a tagu
- stránka na vložení receptu
  - políčko na vše co má obsahovat recept

## Databáze

Běží přes docker pomocí docker-compose. Stačí napsat `docker-compose up -d`, všechno se stáhne a spustí. Proměnné pak napsat do `.env` souboru `DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"`
