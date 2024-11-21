import os
from utils import known_layers, build_dir_path

if __name__ == "__main__":
    for layer in known_layers:
        os.system("cd \"" + layer + "\" && packwiz refresh && packwiz update --all")
