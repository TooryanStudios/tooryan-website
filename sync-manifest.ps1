# PowerShell script to sync manifest.json with images folder
# Usage: .\sync-manifest.ps1

$imagesDir = Join-Path $PSScriptRoot "images"
$manifestFile = Join-Path $imagesDir "manifest.json"
$imageExtensions = @('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif')

Write-Host "Syncing manifest.json..." -ForegroundColor Cyan

try {
    # Get all image files
    $images = Get-ChildItem -Path $imagesDir -File | 
        Where-Object { 
            $imageExtensions -contains $_.Extension.ToLower() -and 
            -not $_.Name.StartsWith('.') -and 
            $_.Name -ne 'manifest.json' 
        } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -ExpandProperty Name

    # Convert to JSON
    $json = $images | ConvertTo-Json -Depth 10
    
    # Ensure it's an array even with single item
    if ($images.Count -eq 1) {
        $json = "[$json]"
    }
    
    # Write to manifest.json with proper formatting
    $json | Out-File -FilePath $manifestFile -Encoding UTF8 -NoNewline
    Add-Content -Path $manifestFile -Value "`n" -NoNewline

    Write-Host "✓ Manifest synced: $($images.Count) images" -ForegroundColor Green
    
    # Display first few images
    if ($images.Count -gt 0) {
        Write-Host "`nLatest images:" -ForegroundColor Yellow
        $images | Select-Object -First 5 | ForEach-Object { Write-Host "  • $_" }
        if ($images.Count -gt 5) {
            Write-Host "  ... and $($images.Count - 5) more"
        }
    }
}
catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
    exit 1
}
