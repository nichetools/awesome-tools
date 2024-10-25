import yaml
import json

with open('_data/tools.yml', 'r') as yaml_file:
    tools = yaml.safe_load(yaml_file)

with open('tools.json', 'w') as json_file:
    json.dump(tools, json_file, indent=2)
