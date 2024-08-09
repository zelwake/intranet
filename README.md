# Intranet

## `root`

Zde se nachází soubor `start_services.sh`, který je shell script a je zodpovědný za spuštění všech serverů. Pokud dojde k jeho změně, je třeba nechat stáhnout novou verzi do raspberry přes git a rebootnou ho. [<sup>1</sup>](https://github.com/zelwake/intranet#jak-nahr%C3%A1t-novou-verzi-k%C3%B3du-na-raspberry-a-spustit-ho)

Pokud budu přidávat nový server, je nutné aby se startoval pomocí příkazu `nohup příkaz-nutný-ke-spuštění-serveru &`.

Důležité je napsat na začátku `nohup` a na konci `&`. To zajistí, že se proces spustí na pozadí a nečeká se na jeho dokončení, což v případě serveru by nikdy nenastalo.

## Hlavní projekt `main`

Běží zde Node.js Express server, který funguje jako proxy.

V `server.js` souboru se nastavují routy a je tam příprava na proxy routování. K tomu slouží kód: 
```
app.use(
    "/cesta-kde-bude-běžet-jiný-server",
    createProxyMiddleware({ 
        target: `${httpAddress}:port-kde-poběží-server`,
        changeOrigin: true })
);
```
Do budoucna možná udělám objekt nebo array a bude se to dynamicky tahat z nich.

Po spuštění vypíše adresu na které běží spolu s portem, a to buď 8080 v případě dev serveru, nebo 80 v případě nasazení.

## Vedlejší projekty [<sup>2</sup>](https://github.com/zelwake/intranet#kam-p%C5%99id%C3%A1vat-nov%C3%A9-projekty)

### `kucharka`

Vytvořeno pomocí NextJs.

## FAQ

### Jak nahrát novou verzi kódu na raspberry a spustit ho?
Nejdříve se musíš přihlásit přes powershell/příkazovou řádku/bash pomocí příkazu `ssh admin@raspberrypi.local` a stisknout enter. Potom napsat heslo `admin` (nebude vidět ale píše se) a potvrdit enterem. Mělo by se vypsat několik řádků o tom, kam se připojuješ a řádek kam můžeš psát by se měl změnit na `admin@raspberrypi: ~ $`.

![Screenshot s připojením](/assets/pripojeni_ssh.png)

Nyní je třeba přejít do složky intranetu, což je jenom `cd intranet/`, odsud provést příkaz `git pull` a po jeho dokončení napsat `sudo shutdown -r +1 & logout` čímž dojde k odhlášení a restartu raspberry po minutě. Pak stačí chvíli počkat a všechno by mělo postupně naběhnout.

### Kam přidávat nové projekty?
Vytvořím si v gitu novou branch pomocí příkazu `git checkout -b muj-projekt`. V rootu projektu si vytvoř novou složku s názvem, který by se měl shodovat s názvem routy, pod kterou se najde. Například chci mít url `http://192.168.0.211/muj-projekt`, tak si vytvořím složku `muj-projekt` a uvnitř si inicializuji projekt v čem chci. Nezapomenout vytvořit i `.gitignore` soubor, ať se neposílají zbytečnosti na git.

Poslední krok je přidání proxy na projekt souboru `/main/server.js`, spolu s portem na kterém poběží. Pak už jenom pushnout změny na git pomocí `git add .`, `git commit -m "text-co-jsem-udělal"` a `git push`. Pak přejdu na git a vytvořím merge request do masteru/mainu a počkám na vyřešení.