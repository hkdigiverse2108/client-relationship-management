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

def load_env_port_and_host(base_dir):
    env_path = os.path.join(base_dir, ".env")
    port = "8000"
    host = "0.0.0.0"
    if os.path.exists(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith("#"):
                        continue
                    if "=" in line:
                        key, val = line.split("=", 1)
                        key = key.strip()
                        val = val.strip()
                        # Remove quotes if present
                        if val.startswith('"') and val.endswith('"'):
                            val = val[1:-1]
                        elif val.startswith("'") and val.endswith("'"):
                            val = val[1:-1]
                        if key == "BACKEND_PORT":
                            port = val
                        elif key == "BACKEND_HOST":
                            host = val
        except Exception as e:
            print(f"[WARNING] Error reading .env file: {e}")
    return port, host

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    frontend_dir = os.path.join(base_dir, "frontend")
    
    # Load backend port and host dynamically from .env
    backend_port, backend_host = load_env_port_and_host(base_dir)
    print(f"[INFO] Loaded backend configuration from .env: Host={backend_host}, Port={backend_port}")
    
    # Check for backend virtual environment
    venv_scripts = os.path.join(backend_dir, ".venv", "Scripts")
    
    # We will run the backend using the python executable inside the .venv
    # so that it uses the installed packages like fastapi, uvicorn etc.
    python_exe = os.path.join(venv_scripts, "python.exe")
    
    if os.path.exists(python_exe):
        backend_cmd = f'"{python_exe}" -m uvicorn main:app --reload --host {backend_host} --port {backend_port}'
    else:
        # Fallback to system python/uvicorn if venv is missing
        print("[WARNING] Virtual environment not found at backend/.venv/Scripts/python.exe")
        print("[WARNING] Falling back to global python")
        backend_cmd = f"python -m uvicorn main:app --reload --host {backend_host} --port {backend_port}"

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
