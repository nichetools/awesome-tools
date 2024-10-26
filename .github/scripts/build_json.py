import yaml
import json
import os

# Get the directory of the script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the YAML file
yaml_path = os.path.join(script_dir, '..', '..', '_data', 'tools.yml')

# Construct the path for the output JSON file
json_path = os.path.join(script_dir, '..', '..', 'tools.json')

# Read the YAML file
with open(yaml_path, 'r') as yaml_file:
    tools = yaml.safe_load(yaml_file)

# Write the JSON file
with open(json_path, 'w') as json_file:
    json.dump(tools, json_file, indent=2)

print(f"JSON file created at: {json_path}")
