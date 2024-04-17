terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4.2"
    }
  }

  required_version = "~> 1.8"
}

provider "aws" {
  region = var.aws_region
}

data "archive_file" "generate_code" {
  type          = "zip"

    source_dir  = "./${path.module}/"
    output_path = "./${path.module}/src.zip"
    excludes = [".terraform", "terraform.tfstate", "terraform.tfstate.backup", "terraform.tfvars", "variables.tf", ".terraform.lock.hcl", ".env", "src.zip"]
}

# data "archive_file" "node_modules" {
#     type = "zip"
#     source_dir = "${path.module}/node_modules"
#     output_path = "${path.module}/node_modules.zip"
# }

# resource "aws_lambda_layer_version" "generate_layer" {
#   filename = data.archive_file.node_modules.output_path
#   layer_name = var.LAYER_NAME
#   source_code_hash = data.archive_file.node_modules.output_base64sha256
#   compatible_runtimes = ["nodejs20.x"]
# }

resource "aws_lambda_function" "users_lambda" {
  function_name = var.LAMBDA_NAME
  filename = data.archive_file.generate_code.output_path
  runtime = "nodejs20.x"
  handler = "src/app.handler"
  timeout = 30
  source_code_hash = data.archive_file.generate_code.output_base64sha256
  # layers = [aws_lambda_layer_version.generate_layer.arn]
  role = var.ROLE_LAMBDA
  environment {
      variables = {
        # NODE_PATH = "/opt"yes

        PORT = var.PORT
        NODE_ENV = var.NODE_ENV
        APPLICATION_NAME = var.APPLICATION_NAME
        HOST = var.HOST
      }
  }
}

resource "aws_apigatewayv2_api" "api_gateway" {
  name          = var.API_GATEWAY_NAME
  protocol_type = "HTTP"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name              = "/aws/api_gw/${aws_apigatewayv2_api.api_gateway.name}"
  retention_in_days = 30
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id      = aws_apigatewayv2_api.api_gateway.id
  name        = var.stage
  auto_deploy = true
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      "requestId": "$context.requestId",
      "sourceIp": "$context.identity.sourceIp",
      "requestTime": "$context.requestTime",
      "protocol": "$context.protocol",
      "httpMethod": "$context.httpMethod",
      "resourcePath": "$context.resourcePath",
      "routeKey": "$context.routeKey",
      "responseLength": "$context.responseLength",
      "integrationErrorMessage": "$context.integrationErrorMessage",
      "userAgent": "$context.identity.userAgent",
      "error": "$context.error.message",
      "errorString": "$context.error.messageString",
      "errorType": "$context.error.responseType"

    })
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  integration_uri    = aws_lambda_function.users_lambda.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  request_parameters = {
    "overwrite:path" = "$request.path"
  }
}

resource "aws_apigatewayv2_route" "create_user_route" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  route_key          = "POST /user/api/v1/create"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "update_user_route" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  route_key          = "PATCH /user/api/v1/update"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "get_user_route" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  route_key          = "GET /user/api/v1/find-one"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "get_all_user_route" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  route_key          = "GET /user/api/v1/find-all"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "remove_user_route" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  route_key          = "DELETE /user/api/v1/delete"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.users_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gateway.execution_arn}//"
}
