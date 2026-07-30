import subprocess
import os
import sys
import threading
import signal

def run_process(command, cwd, name):
    print(f"[{name}] Starting...")
    # shell=True allows npm.cmd to be resolved on Windows easily
    process = subprocess.Popen(
        command,
        cwd=cwd,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )
    
    # Read output line by line and print with prefix
    try:
        for line in iter(process.stdout.readline, ''):
            print(f"[{name}] {line.strip()}")
    except Exception as e:
        print(f"[{name}] Error reading output: {e}")
        
    process.stdout.close()
    process.wait()
    print(f"[{name}] Exited with code {process.returncode}")

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    frontend_dir = os.path.join(base_dir, "frontend")
    
    # Check for backend virtual environment
    venv_scripts = os.path.join(backend_dir, ".venv", "Scripts")
    
    # We will run the backend using the python executable inside the .venv
    # so that it uses the installed packages like fastapi, uvicorn etc.
    python_exe = os.path.join(venv_scripts, "python.exe")
    
    if os.path.exists(python_exe):
        backend_cmd = f'"{python_exe}" -m uvicorn main:app --reload --port 8000'
    else:
        # Fallback to system python/uvicorn if venv is missing
        print("[WARNING] Virtual environment not found at backend/.venv/Scripts/python.exe")
        print("[WARNING] Falling back to global python")
        backend_cmd = "python -m uvicorn main:app --reload --port 8000"

    frontend_cmd = "npm run dev"
    
    print("=" * 60)
    print("🚀 Starting AIO CRM - Fullstack Development Environment")
    print("=" * 60)
    
    # Create threads for concurrent execution
    backend_thread = threading.Thread(
        target=run_process, 
        args=(backend_cmd, backend_dir, "BACKEND"),
        daemon=True
    )
    frontend_thread = threading.Thread(
        target=run_process, 
        args=(frontend_cmd, frontend_dir, "FRONTEND"),
        daemon=True
    )
    
    try:
        backend_thread.start()
        frontend_thread.start()
        
        # Keep the main thread alive to catch KeyboardInterrupt (Ctrl+C)
        backend_thread.join()
        frontend_thread.join()
    except KeyboardInterrupt:
        print("\nStopping services...")
        sys.exit(0)

if __name__ == "__main__":
    main()
