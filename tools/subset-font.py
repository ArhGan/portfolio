#!/usr/bin/env python3
"""
把 fonts/AlibabaFangYuanTi-VF.ttf 子集化为 fonts/AlibabaFangYuanTi-VF.woff2

用法：  python tools/subset-font.py
依赖：  pip install fonttools brotli

说明：子集字符 = 全站 html/js/css 中出现的所有字符 + ASCII + 常用中文标点。
新增文案后请重新运行本脚本，否则新字会回退到系统字体。
"""
import pathlib, sys
from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "fonts" / "AlibabaFangYuanTi-VF.ttf"
DST = ROOT / "fonts" / "AlibabaFangYuanTi-VF.woff2"

chars = set()
for pat in ("*.html", "*.js", "*.css"):
    for f in ROOT.glob(pat):
        chars |= set(f.read_text(encoding="utf-8", errors="ignore"))
# ASCII + 常用中文标点 + 常用符号
chars |= set("".join(chr(c) for c in range(0x20, 0x7F)))
chars |= set("　、。！？；：“”‘’（）【】《》〈〉—…·～￥％＋－×÷≤≥※→←↑↓↗↘✓✔●○■□◆◇★☆")
text = "".join(sorted(chars))

opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["*"]
opts.name_IDs = ["*"]
opts.notdef_outline = True
opts.recalc_bounds = True
opts.drop_tables += ["DSIG"]

font = subset.load_font(str(SRC), opts)
sub = subset.Subsetter(options=opts)
sub.populate(text=text)
sub.subset(font)
subset.save_font(font, str(DST), opts)

print(f"chars: {len(text)}")
print(f"{SRC.name}: {SRC.stat().st_size/1024/1024:.2f} MB")
print(f"{DST.name}: {DST.stat().st_size/1024:.1f} KB")
