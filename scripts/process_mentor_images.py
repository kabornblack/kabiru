from pathlib import Path
from rembg import remove, new_session
from PIL import Image

src_dir = Path(r"C:\Users\admin\Desktop\IT\kabiru\public\mentors")
session = new_session("u2net")

jobs = [
    ("jonas-schmedtmann-raw.jpg", "jonas-schmedtmann.png"),
    ("angela-yu.jpg", "angela-yu.png"),
    ("mosh-hamedani.jpg", "mosh-hamedani.png"),
    ("andrei-neagoie.jpg", "andrei-neagoie.png"),
    ("sonny-sangha.jpg", "sonny-sangha.png"),
]

for src_name, out_name in jobs:
    src = src_dir / src_name
    if not src.exists():
        print(f"missing {src_name}")
        continue
    print(f"processing {src_name}...")
    img = Image.open(src).convert("RGBA")
    out = remove(img, session=session)
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    w, h = out.size
    side = max(w, h)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(out, ((side - w) // 2, (side - h) // 2), out)
    dest = src_dir / out_name
    canvas.save(dest, "PNG")
    print(f"wrote {out_name} {canvas.size} {dest.stat().st_size}")

print("done")
