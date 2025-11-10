#!/bin/bash

# Script to update production Railway database
# This fixes the template issue for 2bitsofinsurance.com

echo "🔧 Updating Production Railway Database..."
echo ""

# Check if RAILWAY_DATABASE_URL exists
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not found in environment"
  exit 1
fi

# SQL commands to execute
SQL_COMMANDS="
-- Update template slugs to match actual filenames
UPDATE templates SET slug = 'Template13' WHERE id = 13;
UPDATE templates SET slug = 'Template14' WHERE id = 14;
UPDATE templates SET slug = 'Template15' WHERE id = 15;

-- Update 2bitsofinsurance.com to use Template 13
UPDATE websites 
SET template_id = 13
WHERE domain = '2bitsofinsurance.com';

-- Show the result
SELECT 
  w.id, 
  w.domain, 
  w.template_id, 
  t.name as template_name, 
  t.slug as template_slug 
FROM websites w
JOIN templates t ON w.template_id = t.id
WHERE w.domain = '2bitsofinsurance.com';
"

echo "Executing SQL commands..."
echo "$SQL_COMMANDS" | psql "$DATABASE_URL"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Production database updated successfully!"
  echo ""
  echo "Next steps:"
  echo "1. Wait 30 seconds for Railway to restart"
  echo "2. Visit https://2bitsofinsurance.com"
  echo "3. Template 13 should now load correctly"
else
  echo ""
  echo "❌ Error updating database"
  exit 1
fi
