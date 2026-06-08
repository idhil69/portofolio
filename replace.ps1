Get-ChildItem -Path components -Recurse -Include *.tsx | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file
    $modified = $false
    for ($i=0; $i -lt $content.Length; $i++) {
        if ($content[$i] -match '(?i)#E04343' -or $content[$i] -match '(?i)#e14343') {
            $content[$i] = $content[$i] -replace '(?i)#E04343', '#bf4b4b' -replace '(?i)#e14343', '#bf4b4b'
            $modified = $true
        }
    }
    if ($modified) {
        Set-Content -Path $file -Value $content
    }
}
Write-Output "Done"
