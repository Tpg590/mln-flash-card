import sys
import re
import json
import zipfile
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

with zipfile.ZipFile('[MLN111] ĐỀ CƯƠNG ÔN TẬP.docx') as z:
    xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)

paras = []
for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    full_text = ''.join([t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]).strip()
    if not full_text:
        continue
    runs = []
    total_len = 0
    bold_runs = []
    for r in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}r'):
        t = ''.join([node.text for node in r.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text])
        if not t:
            continue
        total_len += len(t)
        rPr = r.find('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rPr')
        b = False
        if rPr is not None:
            b_elem = rPr.find('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}b')
            if b_elem is not None and b_elem.attrib.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val') != '0':
                b = True
                bold_runs.append(t)
        runs.append((t, b))
    bold_str = ''.join(bold_runs).strip()
    is_bold = len(bold_str) > 0 and (len(bold_str) / max(total_len, 1) > 0.40)
    paras.append({
        'text': full_text,
        'runs': runs,
        'bold_str': bold_str,
        'is_bold': is_bold,
        'raw_len': total_len,
        'bold_len': len(bold_str)
    })

current_chapter = "Chương 1: Triết học và Triết học Mác - Lênin"
current_chapter_id = "c1"
sep_pat = re.compile(r'^[=\-_]{3,}$')
q_pat = re.compile(r'^(Câu|C)\s*(\d+(\.\d+)?|\d+)\s*[:.]\s*(.*)', re.IGNORECASE)

items = []
current_q = None

for idx, p in enumerate(paras):
    txt = p['text']
    
    if sep_pat.match(txt):
        continue
    
    lower_txt = txt.lower()
    if 'chương 1' in lower_txt and ('nội dung' in lower_txt or 'triết học' in lower_txt):
        current_chapter = "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin"
        current_chapter_id = "c1"
        continue
    elif 'bổ sung: chương 1' in lower_txt:
        current_chapter = "Chương 1: Bổ sung kiến thức"
        current_chapter_id = "c1"
        continue
    elif 'chương 2' in lower_txt and 'chủ nghĩa duy vật biện chứng' in lower_txt:
        current_chapter = "Chương 2: Chủ nghĩa duy vật biện chứng"
        current_chapter_id = "c2"
        continue
    elif txt.strip() == "BỔ SUNG" and idx < 700:
        current_chapter = "Chương 2: Bổ sung kiến thức"
        current_chapter_id = "c2"
        continue
    elif 'chương 3' in lower_txt and 'chủ nghĩa duy vật lịch sử' in lower_txt and 'bổ sung thêm' not in lower_txt:
        current_chapter = "Chương 3: Chủ nghĩa duy vật lịch sử"
        current_chapter_id = "c3"
        continue
    elif txt.strip() == "BỔ SUNG" and idx >= 700 and idx < 1370:
        current_chapter = "Chương 3: Bổ sung kiến thức"
        current_chapter_id = "c3"
        continue
    elif 'bổ sung thêm chương 3' in lower_txt:
        current_chapter = "Chương 3: Hỏi - Đáp trọng tâm ôn thi"
        current_chapter_id = "c3"
        continue
    elif txt.startswith("Lưu ý:"):
        continue

    m = q_pat.match(txt)
    if m:
        if current_q:
            items.append(current_q)
        q_header = m.group(1).title() + " " + m.group(2)
        rest = m.group(4).strip()
        
        current_q = {
            'id': len(items) + 1,
            'chapterId': current_chapter_id,
            'chapter': current_chapter,
            'header': q_header,
            'raw_question': rest if rest else txt,
            'p_data': p,
            'options': []
        }
    else:
        if current_q:
            current_q['options'].append({
                'text': txt,
                'is_bold': p['is_bold'],
                'bold_str': p['bold_str']
            })

if current_q:
    items.append(current_q)

# Now resolve answers and clean questions
final_items = []
for q in items:
    opts = q['options']
    raw_q = q['raw_question']
    p_data = q['p_data']
    runs = p_data['runs']
    
    question_text = raw_q
    answer_text = ""
    
    if len(opts) >= 2:
        # Multiple choices! Answer is the bold option
        bold_opts = [o for o in opts if o['is_bold']]
        if bold_opts:
            answer_text = bold_opts[0]['text']
        else:
            partial_bold = [o for o in opts if len(o['bold_str']) > 5]
            if partial_bold:
                answer_text = partial_bold[0]['text']
            else:
                answer_text = opts[0]['text']
        options_list = [re.sub(r'\s+', ' ', o['text']).strip() for o in opts]
    elif len(opts) == 1:
        # Single option (Q&A)
        answer_text = opts[0]['text']
        options_list = [re.sub(r'\s+', ' ', opts[0]['text']).strip()]
    else:
        # Zero options: answer is inline inside the question paragraph!
        options_list = []
        if len(runs) >= 2 and runs[-1][1] and not runs[1][1]:
            q_part = ''.join([r[0] for r in runs[:-1] if not r[0].startswith(q['header'][:3])]).strip()
            # remove colon at start of q_part if any
            q_part = re.sub(r'^[:.]\s*', '', q_part).strip()
            answer_text = runs[-1][0].strip()
            if q_part:
                question_text = q_part
        elif '?' in raw_q and ('   ' in raw_q or '\t' in raw_q):
            parts = re.split(r'\?\s{2,}|\?\t+', raw_q, maxsplit=1)
            if len(parts) == 2 and parts[1].strip():
                question_text = parts[0].strip() + '?'
                answer_text = parts[1].strip()
        elif '  ' in raw_q:
            parts = re.split(r'\s{2,}', raw_q, maxsplit=1)
            if len(parts) == 2 and len(parts[1].strip()) > 1:
                question_text = parts[0].strip()
                answer_text = parts[1].strip()
        elif ': ' in raw_q:
            parts = raw_q.split(': ', 1)
            question_text = parts[0].strip() + ':'
            answer_text = parts[1].strip()
        else:
            answer_text = raw_q
    
    # Clean question text
    question_text = re.sub(r'\s+', ' ', question_text).strip()
    answer_text = re.sub(r'\s+', ' ', answer_text).strip()
    
    final_items.append({
        'id': q['id'],
        'chapterId': q['chapterId'],
        'chapter': q['chapter'],
        'header': q['header'],
        'question': question_text,
        'options': options_list,
        'answer': answer_text
    })

print(f"Total resolved items: {len(final_items)}")

# Check any anomalies
bad = [item for item in final_items if not item['answer'] or not item['question']]
print(f"Items with empty question or answer: {len(bad)}")

# Check options containing answer
multi_choice = [item for item in final_items if len(item['options']) >= 2]
not_in_opts = [item for item in multi_choice if item['answer'] not in item['options']]
print(f"Multi-choice questions: {len(multi_choice)}")
print(f"Multi-choice where answer not in options: {len(not_in_opts)}")

# Sample check
print("Sample item 2:")
print(json.dumps(final_items[1], ensure_ascii=False, indent=2))

js_content = "/**\n * Bộ câu hỏi ôn tập Triết học Mác - Lênin (MLN111)\n * Trích xuất từ tài liệu [MLN111] ĐỀ CƯƠNG ÔN TẬP.docx\n * Tổng số câu hỏi: " + str(len(final_items)) + "\n */\n\n"
js_content += "const FLASHCARD_DATA = " + json.dumps(final_items, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n    module.exports = FLASHCARD_DATA;\n}\n"

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Exported data.js successfully!")
