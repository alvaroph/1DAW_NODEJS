````md
# API REST de Motocicletes (Express + JSON)

API REST senzilla feta amb **Node.js + Express** que gestiona un catàleg de motocicletes guardant les dades en un fitxer **JSON** (`./data/motocicletes.json`). Inclou operacions **CRUD**: crear, llegir, actualitzar i eliminar.

## Funcionalitats

- ✅ Llistar totes les motocicletes
- ✅ Consultar una motocicleta per `id`
- ✅ Afegir una motocicleta nova
- ✅ Actualitzar una motocicleta existent
- ✅ Eliminar una motocicleta
- 📁 Persistència en fitxer: `./data/motocicletes.json`

## Requisits

- Node.js (recomanat: 16+)
- npm

## Instal·lació

1. Clona el repositori i entra a la carpeta:
   ```bash
   git clone <repo-url>
   cd <nom-del-projecte>
````

2. Instal·la dependències:

   ```bash
   npm install express
   ```

3. Crea l’estructura de dades:

   ```bash
   mkdir -p data
   ```

4. Crea el fitxer `data/motocicletes.json` amb un array inicial:

   ```json
   []
   ```

## Execució

Si el fitxer es diu, per exemple, `index.js`:

```bash
node index.js
```

El servidor escoltarà a:

* `http://localhost:3000`

## Estructura de dades

Cada motocicleta té aquesta forma:

```json
{
  "id": 1,
  "marca": "Yamaha",
  "model": "MT-07",
  "any": 2022
}
```

## Endpoints

### 1) Crear una motocicleta

**POST** `/motocicletes`

Body (JSON):

```json
{
  "marca": "Honda",
  "model": "CB500F",
  "any": 2021
}
```

Resposta:

* `201 Created` + objecte creat

---

### 2) Llistar totes les motocicletes

**GET** `/motocicletes`

Resposta:

* `200 OK` + array de motocicletes

---

### 3) Consultar una motocicleta per id

**GET** `/motocicletes/:id`

Resposta:

* `200 OK` + objecte
* `404 Not Found` si no existeix

---

### 4) Actualitzar una motocicleta

**PUT** `/motocicletes/:id`

Body (JSON) (pots enviar només els camps a modificar):

```json
{
  "model": "CB500X"
}
```

Resposta:

* `200 OK` + objecte actualitzat
* `404 Not Found` si no existeix

---

### 5) Eliminar una motocicleta

**DELETE** `/motocicletes/:id`

Resposta:

* `200 OK` + missatge
* `404 Not Found` si no existeix

## Exemples amb curl

Crear:

```bash
curl -X POST http://localhost:3000/motocicletes \
  -H "Content-Type: application/json" \
  -d '{"marca":"Kawasaki","model":"Z650","any":2020}'
```

Llistar:

```bash
curl http://localhost:3000/motocicletes
```

Consultar per id:

```bash
curl http://localhost:3000/motocicletes/1
```

Actualitzar:

```bash
curl -X PUT http://localhost:3000/motocicletes/1 \
  -H "Content-Type: application/json" \
  -d '{"any":2023}'
```

Eliminar:

```bash
curl -X DELETE http://localhost:3000/motocicletes/1
```

## Notes importants

* L’`id` es genera com `dades.length + 1`. Si elimines elements, poden quedar **ids repetits** en altes futures. Si vols evitar-ho, una opció és calcular el màxim `id` existent i sumar 1, o usar UUID.
* El projecte fa servir `fs.readFileSync` i `fs.writeFileSync` (operacions síncrones). En projectes més grans convé fer servir versions asíncrones.

## Llicència

Afegeix la llicència que vulguis (MIT, GPL, etc.).

```
```
