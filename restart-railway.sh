#!/bin/bash

echo "🔄 Restarting Railway Production Service..."

# GraphQL mutation to redeploy the service
MUTATION='mutation serviceInstanceRedeploy($environmentId: String!, $serviceId: String!) {
  serviceInstanceRedeploy(environmentId: $environmentId, serviceId: $serviceId)
}'

VARIABLES="{\"environmentId\":\"$RAILWAY_ENVIRONMENT_ID\",\"serviceId\":\"$RAILWAY_SERVICE_ID\"}"

curl -s -X POST https://backboard.railway.com/graphql/v2 \
  -H "Authorization: Bearer $RAILWAY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"query\":\"$MUTATION\",\"variables\":$VARIABLES}" | grep -q "true"

if [ $? -eq 0 ]; then
  echo "✅ Railway service redeployment triggered!"
  echo "⏳ Wait 30-60 seconds for deployment to complete..."
  echo "🌐 Then visit https://2bitsofinsurance.com to see Template 13"
else
  echo "❌ Failed to trigger redeployment"
  echo "💡 The database is updated - Railway will pick up changes on next automatic deployment"
fi
