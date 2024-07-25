import os
import utils
import shutil

if __name__ == "__main__":
    known_layers = ["1. Base and Optimizations/", "9. Packwiz-Files/"]
    build_dir_path = "packwiz-build/"

    # Find all the files we want to add
    found_files: dict[str, utils.FoundFile] = {}
    for layer_path in known_layers:
        for file in utils.list_files_in_dir(layer_path):
            if not file.name in found_files.keys():
                print("Found new file: " + file.name + " (" + file.path + ")")
                found_files[file.name] = file
            else:
                print("Overwritting file: " + file.name + " (" + file.path + ")")
                found_files[file.name] = file
    
    # Read build cache
    build_cached_files = utils.list_files_in_dir(build_dir_path)
    build_cache: dict[utils.FoundFile] = {}
    for cached_file in build_cached_files:
        build_cache[cached_file.name] = cached_file

    # Now, replace / add the files
    print("Copying files to build directory")
    for file in found_files.values():
        if file.name in build_cache.keys():
            print("Updating file: " + file.name)
            os.remove(build_cache[file.name].path)
            shutil.copy(file.path, build_cache[file.name].path)
            build_cache.pop(file.name)
        else:
            print("Adding file: " + file.name)
            out_path = build_dir_path + file.name
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            shutil.copy(file.path, out_path)

    # Remove old cached files
    for old_cached_file in build_cache.values():
        print("Removing file: " + old_cached_file.name)
        os.remove(old_cached_file.path)

    os.system("cd packwiz-build && packwiz refresh")
    os.system("cd packwiz-build && packwiz list -v > modlist.txt")