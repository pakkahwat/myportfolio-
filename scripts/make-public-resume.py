"""Build the public résumé PDFs served from public/resume/.

The private CV (kept outside this repo) has a birth date, home address, phone
and LINE ID. This script strips those, adds the newer personal projects, folds
the early projects into one compact card so it stays at 2 A4 pages, and prints
the result to PDF with headless Edge/Chrome.

    python scripts/make-public-resume.py "<private cv-en.html>" en
    python scripts/make-public-resume.py "<private resume-th.html>" th

Never commit the private HTML.
"""
import os
import re
import shutil
import subprocess
import sys
import tempfile

SVG = '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">{}</svg>'
PIN = SVG.format('<circle cx="12" cy="10" r="3"/><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/>')
MAIL = SVG.format('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>')
GLOBE = SVG.format('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>')
CODE = SVG.format('<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>')
LINKEDIN = SVG.format('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>')

PDF_TAGS = ['Next.js 16', 'TypeScript', 'WebAssembly', 'Pyodide', 'mupdf.js', 'Web Workers', 'Playwright', 'GitHub Actions']
RENTAL_TAGS = ['Next.js 16', 'TypeScript', 'PostgreSQL (Neon)', 'Drizzle ORM', 'Tesseract.js', 'ONNX Runtime Web', 'LINE Messaging API', 'Playwright']

TEXT = {
    'en': {
        'contact_head': '// contact</div>',
        'languages_head': '<div class="lbl mono">// languages',
        'location': 'Ayutthaya, Thailand &middot; open to remote / hybrid',
        'outcome': '// outcome',
        'check_stock': 'Check Stock System',
        'education': 'EDUCATION',
        'pundit_outcome_start': 'Prediction deadline',
        'pundit_outcome': 'Deadline checked against Postgres <code>now()</code> in the same statement as the write; '
                          'idempotent scoring keyed on <code>result_version</code>; <code>FORCE ROW LEVEL SECURITY</code> hides picks until lock; '
                          'football API cached with stale-data fallback to stay in the free tier.',
        'pdf': ('PDF Tools &mdash; Browser-Only PDF Toolkit', 'Live &middot; pdf.devda.fyi',
                '12 PDF tools (merge, split, compress, protect, PDF&rarr;Word, &hellip;) that run entirely in the browser &mdash; files never leave the user&rsquo;s device, so there is no server cost and nothing to leak.',
                'Thai PDF&rarr;Word conversion scores <code class="hl">99.0</code> visual fidelity against the original, using pdf2docx on Pyodide plus <code>Intl.Segmenter</code> word breaks so Word wraps Thai lines exactly like the PDF.'),
        'rental': ('Community Equipment Lending System', 'Live &middot; in daily use',
                   'Multi-tenant lending system for community groups: staff roles, inventory, printable A4 loan documents, and QR self-service borrowing with no login, built for low-tech users on mobile.',
                   'Thai ID cards are read <b>on-device</b> (Tesseract + PaddleOCR) so the image never leaves the phone; ID images and signatures are deleted automatically once every item is returned (PDPA).'),
        'early': ('Earlier Work', '2019 &ndash; 2021', [
            '<b>Allreview.th</b> &mdash; full-stack product review platform with admin panel &middot; PHP, CodeIgniter, MySQL',
            '<b>Smart PetFeeder</b> (senior project) &mdash; IoT feeder run from an Android app &amp; web &middot; Arduino, PHP',
            '<b>Stock &amp; Barcode App</b> &mdash; Android inventory app with barcode scanning &middot; Java, SQLite',
        ]),
    },
    'th': {
        'contact_head': '// ติดต่อ</div>',
        'languages_head': '<div class="lbl mono">// ภาษา',
        'location': 'พระนครศรีอยุธยา &middot; ทำงาน Remote / Hybrid ได้',
        'outcome': '// ผลลัพธ์',
        'check_stock': 'ระบบ Check Stock',
        'education': 'การศึกษา',
        'pundit_outcome_start': 'ปิดรับคำทาย',
        'pundit_outcome': 'ปิดรับคำทายด้วย <code>now()</code> ของ Postgres ใน statement เดียวกับการเขียน; คิดคะแนนแบบ idempotent อิง '
                          '<code>result_version</code>; <code>FORCE ROW LEVEL SECURITY</code> กันเห็นคำทายก่อนปิดรับ; แคช API ฟุตบอลพร้อม fallback เพื่ออยู่ในโควตาฟรี',
        'pdf': ('PDF Tools &mdash; เครื่องมือ PDF ในเบราว์เซอร์', 'ใช้งานจริง &middot; pdf.devda.fyi',
                'เครื่องมือ PDF 12 อย่าง (รวม แยก บีบอัด ใส่รหัส PDF&rarr;Word &hellip;) ทำงานในเบราว์เซอร์ทั้งหมด ไฟล์ไม่ออกจากเครื่องผู้ใช้ จึงไม่มีค่าเซิร์ฟเวอร์และไม่มีข้อมูลให้รั่ว',
                'แปลง PDF&rarr;Word ภาษาไทยได้คะแนนความเหมือนต้นฉบับ <code class="hl">99.0</code> ด้วย pdf2docx บน Pyodide และแทรกจุดตัดคำด้วย <code>Intl.Segmenter</code> ให้ Word ตัดบรรทัดไทยตรงกับ PDF'),
        'rental': ('ระบบยืม-คืนอุปกรณ์ชุมชน', 'ใช้งานจริง &middot; ชุมชนใช้ทุกวัน',
                   'ระบบยืม-คืนโต๊ะ เก้าอี้ เต็นท์ สำหรับหลายชุมชน มีสิทธิ์เจ้าหน้าที่ คลังอุปกรณ์ เอกสารยืม A4 และยืมเองผ่าน QR โดยไม่ต้องล็อกอิน ออกแบบให้คนที่ไม่ถนัดเทคโนโลยีใช้บนมือถือได้',
                   'อ่านบัตรประชาชน<b>ในเครื่อง</b> (Tesseract + PaddleOCR) ภาพไม่ออกจากมือถือ; ลบภาพบัตรและลายเซ็นผู้ยืมอัตโนมัติเมื่อคืนครบ (PDPA)'),
        'early': ('งานยุคแรก', '2562 &ndash; 2564', [
            '<b>Allreview.th</b> &mdash; เว็บรีวิวสินค้า full-stack พร้อมหลังบ้านแอดมิน &middot; PHP, CodeIgniter, MySQL',
            '<b>Smart PetFeeder</b> (โปรเจกต์จบ) &mdash; เครื่องให้อาหารสัตว์ IoT สั่งผ่านแอป Android และเว็บ &middot; Arduino, PHP',
            '<b>Stock &amp; Barcode App</b> &mdash; แอป Android จัดการสต็อกพร้อมสแกนบาร์โค้ด &middot; Java, SQLite',
        ]),
    },
}

PUBLIC_EMAIL = 'pakkahwat.contact@gmail.com'


def card(c, title, badge, desc, tags, outcome):
    chips = ''.join(f'<span class="chip mono">{t}</span>' for t in tags)
    return (f'<div class="card"><div class="card-b">\n  <div class="card-t">{title}<span class="badge mono">{badge}</span></div>'
            f'<div class="card-d">{desc}</div>\n  <div class="chips">{chips}</div></div>\n'
            f'  <div class="card-o"><span class="k mono">{c["outcome"]}</span> {outcome}</div></div>')


def build(s, c):
    # 1. Contact block: public channels only.
    rows = [(PIN, c['location']), (MAIL, PUBLIC_EMAIL), (GLOBE, 'devda.fyi'),
            (CODE, 'github.com/pakkahwat'), (LINKEDIN, 'linkedin.com/in/pakkahwat-chuesaard')]
    contact = ''.join(f'<div class="ct">{icon}<span>{text}</span></div>' for icon, text in rows)
    a = s.index(c['contact_head']) + len(c['contact_head'])
    b = s.index(c['languages_head'])
    # Everything the private block listed (except the email we keep) must be
    # gone from the output — checked at the end, without naming it here.
    private = [p for p in re.findall(r'<span>(.*?)</span>', s[a:b]) if PUBLIC_EMAIL not in p]
    s = s[:a] + contact + s[b:]

    # 2. New personal projects, right after Pundit.
    anchor = f'<div class="card"><div class="card-b">\n  <div class="card-t">{c["check_stock"]}'
    title, badge, desc, outcome = c['pdf']
    new = card(c, title, badge, desc, PDF_TAGS, outcome)
    title, badge, desc, outcome = c['rental']
    new += card(c, title, badge, desc, RENTAL_TAGS, outcome)
    s = s.replace(anchor, new + anchor, 1)

    # 3. Shorter Pundit outcome (same facts, fewer lines).
    a = s.index(f'<span class="k mono">{c["outcome"]}</span> {c["pundit_outcome_start"]}')
    b = s.index('</div>', a)
    s = s[:a] + f'<span class="k mono">{c["outcome"]}</span> {c["pundit_outcome"]}' + s[b:]

    # 4. Early projects folded into one compact card.
    title, badge, items = c['early']
    early = (f'<div class="card"><div class="card-b">\n  <div class="card-t">{title}<span class="badge mono">{badge}</span></div>'
             '<ul style="margin-top:3px">' + ''.join(f'<li>{i}</li>' for i in items) + '</ul></div></div>')
    a = s.index('<div class="card"><div class="card-b">\n  <div class="card-t">Allreview.th')
    b = s.index(f'<div class="sec"><span class="sq"></span><span class="t mono">{c["education"]}')
    s = s[:a] + early + s[b:]

    if not private or any(p in s for p in private):
        sys.exit('private contact details still present (or contact block not found) — not writing')
    return s


def find_browser():
    for p in [r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
              r'C:\Program Files\Google\Chrome\Application\chrome.exe']:
        if os.path.exists(p):
            return p
    return shutil.which('msedge') or shutil.which('chrome') or shutil.which('chromium')


def main():
    src, lang = sys.argv[1], sys.argv[2]
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_pdf = os.path.join(root, 'public', 'resume', f'pakkahwat-chuesaard-resume-{lang}.pdf')
    html = build(open(src, encoding='utf-8').read(), TEXT[lang])

    with tempfile.TemporaryDirectory() as tmp:
        page = os.path.join(tmp, 'resume.html')
        open(page, 'w', encoding='utf-8').write(html)
        os.makedirs(os.path.dirname(out_pdf), exist_ok=True)
        subprocess.run([find_browser(), '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                        f'--print-to-pdf={out_pdf}', 'file:///' + page.replace('\\', '/')],
                       check=True, capture_output=True)

    pages = len(re.findall(rb'/Type\s*/Page[^s]', open(out_pdf, 'rb').read()))
    print(f'{out_pdf}: {pages} page(s)')


if __name__ == '__main__':
    main()
