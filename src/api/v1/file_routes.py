from fastapi import APIRouter
import subprocess

router = APIRouter()

@router.get("/inspect-file/{file_path}")
def inspect_file_details(file_path: str):
    """
    An admin endpoint to get metadata about a file on the server.
    """
    command_string = f"ls -l /data/uploads/{file_path}"

    result = subprocess.run(
        command_string, 
        shell=True,
        capture_output=True, 
        text=True
    )

    return {"file_details": result.stdout}