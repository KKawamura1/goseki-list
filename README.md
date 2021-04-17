Test
===

## Usage

```bash
$ yarn build && yarn start  # and go to `localhost:3000`
```

## Migration

なんだかんだで手元で作って push するのが一番楽

```
local:~/ $ prisma migrate dev --preview-feature
local:~/ $ heroku pg:reset --confirm mhrise-talisman-list
local:~/ $ heroku pg:push TalismanListDB DATABASE_URL
```
