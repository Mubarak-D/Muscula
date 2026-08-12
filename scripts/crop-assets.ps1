# Crops the usable, text-free regions out of the Instagram pulls into public/images.
# Instagram burns marketing copy into most posts; these boxes isolate the photography.
# Re-run after dropping better source files into assets-raw/.
Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$src  = Join-Path $root "assets-raw\instagram"
$dst  = Join-Path $root "public\images"
New-Item -ItemType Directory -Force -Path $dst | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 92)

function Crop($file, $out, $x, $y, $w, $h) {
  $inPath = Join-Path $src $file
  if (-not (Test-Path $inPath)) { Write-Host "SKIP  $file (missing)"; return }
  $img = [System.Drawing.Bitmap]::FromFile($inPath)
  # Clamp so a bad box can never throw at build time.
  $x = [Math]::Max(0, [Math]::Min($x, $img.Width - 1))
  $y = [Math]::Max(0, [Math]::Min($y, $img.Height - 1))
  $w = [Math]::Min($w, $img.Width - $x)
  $h = [Math]::Min($h, $img.Height - $y)
  $rect = New-Object System.Drawing.Rectangle $x, $y, $w, $h
  $crop = $img.Clone($rect, $img.PixelFormat)
  $outPath = Join-Path $dst $out
  $crop.Save($outPath, $jpeg, $params)
  Write-Host ("OK    {0,-26} {1}x{2}" -f $out, $w, $h)
  $crop.Dispose(); $img.Dispose()
}

#      source                                  output                  x    y    w    h
Crop "05-HERO-bar-cross-section-cashews.jpg" "bar-hero.jpg"            8  182  470  248
Crop "12-ambassador-bar-in-hand.jpg"         "ambassador.jpg"        142  246  362  362
Crop "04-gym-floor-training.jpg"             "gym-floor.jpg"           0    0  480  470
Crop "07-gym-punching-bags-tire.jpg"         "gym-bags.jpg"            0    0  640  520
# Both partnership shots are 9:16 reel covers with the brand logo burnt into the
# top band, so each crop starts below it and keeps the handover in frame.
Crop "02-tranzformers-event.jpg"             "partner-tranzformers.jpg" 0  205  360  395
Crop "06-vaaj-collab.jpg"                    "partner-vaaj.jpg"         0  235  360  365
