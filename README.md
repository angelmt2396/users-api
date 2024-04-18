# users-api
API para usuarios, roles y permisos

## Preparar entorno de ejecución
Instalar Nodejs, versión 20.x.x o superior.

Instalar dependencias con comando:
```bash
  npm ci o npm i
```

## Documentación
- [NodeJs](https://nodejs.org/docs/latest/api/)
- [Express](https://devdocs.io/express/)
- [mongodb](https://www.mongodb.com/docs/)
- [GIT](https://git-scm.com/)
- [mongoose](https://mongoosejs.com/docs/)
- [Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

[Documentacion de postman agregada en la raíz.](user-roles-api.postman_collection.json)

Para inicializar el proyecto en entorno local, es indispensable configurar las siguientes variables dentro del archivo .env.

| Variable                          | Descripción                                |
| :-----------------------          | :------------------------------------------|
| `PORT`                            | `Puerto de ejecución de la app`            |
| `NODE_ENV`                        | `Bandera que indica entorno de ejecución`  |
| `HOST`                            | `URL de conexion para el cluster de mongo.`|
| `SECRET_LOGIN`                    | `Usuario para Basic Auth`                  |
| `SECRET_PWD`                      | `Password para Basic Auth`                 |
| `BASIC_AUTH_ACTIVE`               | `Configura si esta activo Basic Auth`      |
| `APPLICATION_NAME`                | `Nombre de la aplicación`                  |

## Deployment

#### Local

Para desplegar el proyecto en un entorno local:

```bash
  npm run debug
```