variable "aws_region" {
  description = "AWS region for all resources"
  default = "us-east-1"
  type = string
}

variable "NODE_ENV" {
  type = string
  default = "production"
}

variable "stage" {
  description = "Nombre de la referencia de implementación."
  default = "dev"
  type = string
}

variable "LAYER_NAME" {
  description = "Nombre de la capa donde se encuentran las librerías del código."
  type = string
}

variable "PORT" {
  description = "Puerto de conexión para la api."
  default = 3000
  type = number
}

variable "LAMBDA_NAME" {
  description = "Nombre para la lambda con el codigo."
  type = string
}

variable "ROLE_LAMBDA" {
  description = "Rol para ejecutar las lambdas."
  type = string
}

variable "APPLICATION_NAME" {
  description = "Nombre de la API"
  default = "users-roles-api"
  type = string
}
variable "HOST" {
  description = "URL para conectarse a la base de datos"
  default = "users-roles-api"
  type = string
}

variable "API_GATEWAY_NAME" {
  description = "URL para conectarse a la base de datos"
  default = "users-roles-api"
  type = string
}
