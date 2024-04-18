output "api_gateway_url" {
  description = "url of the rest api"
  value = aws_apigatewayv2_stage.lambda.invoke_url
}
