import subprocess
result = subprocess.run(["git", "show", "HEAD:frontend/src/components/common/CustomDataTable.jsx"], cwd=r"d:\hk digiverse\NEW-CRM", capture_output=True, text=True)
with open(r"d:\hk digiverse\NEW-CRM\scratch_git.txt", "w") as f:
    f.write(result.stdout)
