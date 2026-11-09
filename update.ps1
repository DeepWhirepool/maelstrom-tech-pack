$ErrorActionPreference = 'Stop'
$packRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
& git -C $packRoot pull --ff-only -q
if ($LASTEXITCODE -ne 0) { throw 'Pack update: git pull failed' }
if (-not $env:INST_MC_DIR -or -not $env:INST_JAVA) { throw 'Run from Prism pre-launch command' }
$personal = @('config/jei','config/inventoryprofilesnext','config/iris.properties','config/iris-excluded.json','config/sodium-options.json','config/dynamic_fps.json','config/xaero')
$backupRoot = Join-Path ([IO.Path]::GetTempPath()) ('maelstrom-personal-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $backupRoot | Out-Null
foreach ($relative in $personal) {
    $sourcePath = Join-Path $env:INST_MC_DIR $relative
    if (Test-Path -LiteralPath $sourcePath) {
        $backupPath = Join-Path $backupRoot $relative
        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $backupPath) | Out-Null
        Copy-Item -LiteralPath $sourcePath -Destination $backupPath -Recurse -Force
    }
}
$installExit = 1
try {
    Set-Location -LiteralPath $env:INST_MC_DIR
    $manifest = ([uri](Join-Path $packRoot 'pack.toml')).AbsoluteUri
    & $env:INST_JAVA -jar (Join-Path $packRoot 'packwiz-installer-bootstrap.jar') $manifest
    $installExit = $LASTEXITCODE
} finally {
    foreach ($relative in $personal) {
        $backupPath = Join-Path $backupRoot $relative
        if (Test-Path -LiteralPath $backupPath) {
            $targetPath = Join-Path $env:INST_MC_DIR $relative
            if (Test-Path -LiteralPath $backupPath -PathType Container) {
                New-Item -ItemType Directory -Force -Path $targetPath | Out-Null
                Get-ChildItem -LiteralPath $backupPath -Force | Copy-Item -Destination $targetPath -Recurse -Force
            } else {
                New-Item -ItemType Directory -Force -Path (Split-Path -Parent $targetPath) | Out-Null
                Copy-Item -LiteralPath $backupPath -Destination $targetPath -Force
            }
        }
    }
    # Only remove our freshly-created backup under the OS temporary directory.
    $resolvedBackup = [IO.Path]::GetFullPath($backupRoot)
    $tempPrefix = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
    if ($resolvedBackup.StartsWith($tempPrefix, [StringComparison]::OrdinalIgnoreCase) -and (Split-Path -Leaf $resolvedBackup).StartsWith('maelstrom-personal-')) {
        Remove-Item -LiteralPath $resolvedBackup -Recurse -Force
    }
}
exit $installExit
