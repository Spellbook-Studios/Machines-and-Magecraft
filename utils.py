import os

class FoundFile:
    def __init__(self, name: str, path: str):
        self.name = name
        self.path = path

def list_files_in_dir(dir) -> list[FoundFile]:
    out = []

    for path, subdirs, files in os.walk(dir):
        for name in files:
            file_path = os.path.join(path, name)
            file_name = os.path.join(path[len(dir):], name)
            out.append(FoundFile(file_name, file_path))
    
    return out