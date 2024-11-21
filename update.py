import os
from utils import known_layers, build_dir_path, yes_no
import build

if __name__ == "__main__":
    for layer in known_layers:
        os.system("cd \"" + layer + "\" && packwiz refresh && packwiz update --all")
    if yes_no("Should we also rebuild?"):
       build.main() 
