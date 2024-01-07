#!/bin/bash

# Function to recursively rename .jsx files to .tsx
rename_files() {
  for file in "$1"/*; do
    if [[ -d "$file" ]]; then
      rename_files "$file"
    elif [[ "${file##*.}" == "js" ]]; then
      new_file="${file%.*}.ts"
      mv "$file" "$new_file"
      echo "Renamed: $file -> $new_file"
    fi
  done
}

# Replace 'your/project/directory' with the actual path to your project directory
project_directory="./src/"

rename_files "$project_directory"
