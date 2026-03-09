$files = Get-ChildItem -Path "backend" -Include *.js -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }
foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $cleaned = $content -replace '//.*$', '' | Where-Object { $_.Trim() -ne '' }
    $cleaned | Set-Content $file.FullName
}

$files = Get-ChildItem -Path "frontend\src" -Include *.js,*.jsx -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }
foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $cleaned = $content -replace '//.*$', '' | Where-Object { $_.Trim() -ne '' }
    $cleaned | Set-Content $file.FullName
}
Write-Host "Comments removed successfully"
