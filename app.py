import webview
import os
import sys
from pathlib import Path

try:
    # Get the directory of this script
    if getattr(sys, 'frozen', False):
        script_dir = os.path.dirname(sys.executable)
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Path to index.html - use pathlib for better path handling
    html_file = str(Path(script_dir) / 'index.html')
    
    # Convert to proper file URL
    if os.name == 'nt':  # Windows
        file_url = 'file:///' + html_file.replace('\\', '/').lstrip('/')
    else:
        file_url = 'file://' + html_file
    
    print(f"Loading game from: {html_file}")
    print(f"File exists: {os.path.exists(html_file)}")
    
    # Create and open the window
    window = webview.create_window(
        'Lines and Boxes Game',
        file_url,
        width=1200,
        height=900,
        min_size=(600, 600)
    )
    
    webview.start(debug=False)
    
except ImportError:
    print("ERROR: pywebview is not installed!")
    print("Installing now...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pywebview"])
    print("Installation complete. Please run the script again.")
    input("Press Enter to close...")
    
except Exception as e:
    print(f"ERROR: {str(e)}")
    import traceback
    traceback.print_exc()
    input("Press Enter to close...")

