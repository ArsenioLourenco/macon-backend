
# declare variables
host=192.168.40.5
db=macon
user=sa
pass=google.2021
engine=mssql
port=1433
output=./src/models

echo "Generating database entities"
yarn typeorm-model-generator -h $host -d $db -u $user -x $pass -e $engine -p $port -o $output -s $schema

echo "Removing unnecessary files"
rm -rf $output/tsconfig.json $output/ormconfig.json

echo "Moving entities out directory"
mv $output/entities/*.ts $output/

echo "Removing entity directory"
rm -rf $output/entities